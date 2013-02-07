## Basics
This project works with the Moovweb SDK.

See detailed documentation for the MoovSDK at http://console.moovweb.com

## Moovweb's GoogleTV Library (MTV)

The purpose of the mtv.js library is to provide users with a framework to build GoogleTV web applications using Moovweb technology.
 
Each zone will automatically have keyboard and D-pad functionality and you will be able to tab between zones. You will also be able to press enter or click a content div to activate it's primary link.
 
### Directions

Simply setup the following HTML hierarchy in the DOM and mtv will take care of the rest.
 
### Structure

    # One zone wrapper
    <div class="mtv-zone">

      # One items-div wrapper
      <div class="mtv-items-div">

        # Multiple mtv-div elements paired with mtv-item elements
        <div class="mtv-div">
          <div class="mtv-item">
            # Usually a link here.
          </div>
        </div>

        # This structure works too. 
        <div class="mtv-div mtv-item">
            # Usually a link here.
        </div>

      </div>
    </div>
 
### Optional Settings

The MTV library comes with an array of options that can be enabled by setting data-mtv attributes on various elements.

#### Link Behavior

By default, clicking or pressing enter will go to the first link found in the mtv-div. If you'd like to go to a different link, simply set that anchor with the attribute: `data-mtv-component="link"`.

You can also have the Enter key simulate a click event by setting the element you want to click with the attribute: `data-mtv-component="click"`.

#### Ajax

You can also enable links to AJAX their URL into a certain zone on your page. To do this follow the next two steps:

  1. Set the element that will call the AJAX with the attribute: `data-mtv-component="ajax"`.
  - You'll also need to set a target for where this content should be placed. You'll notice that every **.mtv-zone** has an attribute automatically assigned called **data-mtv-id**. Use this id number to set your AJAX element with the attribute: `data-mtv-target="id_number"`. Now the link knows in which zone the content will be placed.

#### Styles

Each zone can have an additional class of "mtv-sidebar" or "mtv-grid" that come with default styles.

Just go into assets/stylesheets/main.scss and uncomment the line: `@import "globals/_mtv";`

#### Moovweb's Uranium.js Widgets

The MTV library also works well with [Uranium.js](http://uraniumjs.com), Moovweb's mobile widget library that comes prepackaged with common mobile widgets you'll find yourself using on every site.

## Domains
Remember to put all domains you're going to hit in your etc/hosts
or to run your server with the `-auto-hosts=true` option.

    127.0.0.1 	mlocal.reddit.com
