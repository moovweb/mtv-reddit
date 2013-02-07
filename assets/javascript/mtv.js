/*
 * Title: mtv.js Moovweb's GoogleTV Library v1.0.0
 * Date: 1/28/2013
 *
 * Overview: The purpose of the mtv.js library is to provide
 * users with a framework to build GoogleTV web applications
 * using Moovweb technology.
 *
 * Directions: Simply setup the following HTML hierarchy in
 * the DOM and mtv will take care of the rest. Each zone will
 * automatically have keyboard and D-pad functionality and you
 * will be able to tab between zones. You will also be able to
 * press enter or click a content div to activate it's primary
 * link.
 *
 * Hierarchy:
 * <div class="mtv-zone">
 *   <div class="mtv-items-div">
 *     <div class="mtv-div">
 *       <div class="mtv-item">
 *       </div>
 *     </div>
 *     <div class="mtv-div">
 *       <div class="mtv-item">
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
*/

function mtv() {

  // Define keymappings
  var keyMappings = {
    13: mtvEnter
  };
  // Define actions
  var actions = {
    click: mtvClick,
    scrollIntoView: mtvScroll
  };
  // Define & start key controller
  var keyController = new gtv.jq.KeyController();
  keyController.start();

  function mtvScroll(selectedItem, newItem, getFinishedCallback) {
    // console.log(newItem.parents('.mtv-zone').attr('data-mtv-type'));
    if(newItem.parents('.mtv-zone').attr('data-mtv-type') === "carousel") {
      var name = newItem.parents('.mtv-zone').attr('data-ur-id');
      if(Ur.Widgets["carousel"]) {
        if(Ur.Widgets["carousel"][name]) {
          Ur.Widgets["carousel"][name].jumpToIndex(newItem.index());
          Ur.Widgets["carousel"][name].autoscrollStop();
        }
      }
    }
  }

  function mtvEnter(selectedItem, newSelected) {
    selectItem(selectedItem, newSelected, true);
  }

  function mtvClick(selectedItem, newSelected) {
    selectItem(selectedItem, newSelected, false);
  }

  // Define event triggered on selection
  function selectItem(selectedItem, newSelected, isEnter) {

    // detect setting on self
    var component = selectedItem.attr('data-mtv-component');
    var target = selectedItem.attr('data-mtv-target');
    var url = selectedItem.attr('href');

    // Set component
    if(!component) {
      component = selectedItem.find('[data-mtv-component]:first').attr('data-mtv-component');
    }

    // Set target
    if(!target) {
      target = selectedItem.find('[data-mtv-component]:first').attr('data-mtv-target');
      if(!target) {
        target = selectedItem.parents('.mtv-zone:first').attr('data-mtv-id');
      }
    }

    // Default to first child link
    if(!url) {
      url = selectedItem.find('[data-mtv-component]:first').attr('href');
      if(!url) {
        url = selectedItem.find('a').eq(0).attr('href');
      }
    }

    // Rewrite URL
    if(url) {
      url = mw.originURLToProxy(url);
    }

    // Logs for testing
    // console.log("Component: " + component);
    // console.log("Target: " + target);
    // console.log("URL: " + url);
    // alert(component + " target: " + target + " url: " + url);

    // Ajax
    if(component === 'ajax') {

      // Make request
      if(url) {
        // Mark target for ajaxed content if it exists
        if($("[data-mtv-id='" + target + "']")) {
          $("[data-mtv-id='" + target + "']").attr('data-mtv-transform', 'true');
        }
        else {
          console.log("mtv error: invalid target provided.");
        }
        // HISTORY.PUSHSTATE
        history.pushState('', 'New URL: '+url, url);
        window.onpopstate = function(event) {
          // console.log("pathname: "+location.pathname);
          // default to go home
          window.location = window.location.origin;
        };
        $.ajax({
          url: url,
          success: function(data, textStatus, xhr) {
            // console.log(data);
            // console.log(textStatus);
            // console.log(xhr);
          },
          error: function(xhr, textStatus, errorThrown) {
            // console.log(xhr);
            // console.log(textStatus);
            // console.log(errorThrown);
          },
          complete: function(data, textStatus) {
            // console.log(data);
            $("[data-mtv-transform]").html(data.responseText);
            $("[data-mtv-transform]").removeAttr('data-mtv-id');
            $("[data-mtv-transform]").removeAttr('data-mtv-transform');
            reinit();
          },
          dataType: "html",
          type:"GET",
          // set ajax in query param so it can be caught easily
          data: "mtv-ajax"
        }).done(function() {

        });
      }

        // program Tritium to catch request and modify properly so only the content you want is used.

        // ^ what's an easy way to do this?
        // ajax_sanitize function
        // ajax_inject function
        
        // write Tritium function to inject using jQuery the HTML that you've scrubbed into the data-mtv-component="target".
        // Tritium puts the content into a jQuery function that selects data-mtv-target puts the content in there and removes that attribute

        // Rather than using JS could you inject the content somewhere on the page? Is that possible? Select data-mtv-target and just inject what you have currently in? But you can't see data-mtv-target because you're not looking at the whole document just the new requested one making a pass right. So this won't work... Have to scrub and use JS.

    }
    
    // We want a keypress to trigger a click, double check what to fire on
    if(component === "click") {
      // console.log(isEnter);
      // console.log(selectedItem);
      if(isEnter) {
        if(selectedItem.attr('data-mtv-component')) {
          selectedItem.click();
        }
        else {
          selectedItem.find('[data-mtv-component]').click();
        }
      }
    }

    // Default to clicking link
    if(!component || component === "link") {
      if(url) {
        window.location = url;
      }
    }

    // If no links do nothing

    // Always return this at end for gtvcore
    return new gtv.jq.Selection('selected');
  }

  // Sets default parameters
  function makeParams(mtvID) {
    var mtvParams = {
      containerSelector: 'div[data-mtv-id="' + mtvID + '"]',
      navSelectors: {
        item: '.mtv-item',
        itemParent: '.mtv-div',
        itemRow: '.mtv-row',
        itemPage: '.mtv-page'
      },
      selectionClasses: {
        basic: 'mtv-hover',
        hasData: 'mtv-active'
      },
      keyMapping: keyMappings,
      actions: actions,
      navigableData:'',
      saveRowPosition:'',
      useGeometry:'true',
      selectHidden:''
    };
    return mtvParams;
  }

  // Initialize zones
  function init(){
    console.log("Initializing zones...");
    var mtvID;
    var mtvParams = {};
    var mtvZone;
    var idx;
    var type;

    // Check for existing zones so IDs are properly assigned
    idx = $('[data-mtv-id]').length ? $('[data-mtv-id]').length : 0;
    // console.log(idx);

    // Initialize new zones
    $('.mtv-zone:not([data-mtv-id]), [data-mtv-component="zone"]:not([data-mtv-id])').each(function(){
      // set type
      type = $(this).attr('data-mtv-type') ? $(this).attr('data-mtv-type') : "default";
      // Prevent default actions of links in zones
      $(this).find('a:not([data-mtv-component="default"])').click(function(e){
        e.preventDefault();
      });
      // Assign unique IDs
      $(this).attr('data-mtv-id', idx);
      mtvID = $(this).attr('data-mtv-id');
      mtvParams = makeParams(mtvID);
      mtvZone = new gtv.jq.KeyBehaviorZone(mtvParams);
      keyController.addBehaviorZone(mtvZone, true);
      idx += 1;
    });
  }

  function reinit() {
    // Re-init Uranium widgets
    Ur.setup('[data-ur-set="toggler"]');
    // Re-init carousel seems to break it: Cannot read property 'offsetWidth' of undefined
    Ur.setup('[data-ur-set="carousel"]');
    // Ur.initialize();
    
    // Initialize new zones again so content is D-Pad enabled
    init();
  }

  // Initialize on first call
  init();
}

/**
 * jQuery callback made when the page has been loaded and is ready.
 */
$(document).ready(function() {
  mtv();
});
