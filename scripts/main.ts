# The main file executed by Tritium. The start of all other files.
$response = "Error: Undefined ajax response. Create a page and ajax response for this request."

match($content_type) {
  with(/html/) {
    # Rewrite the xmlns nodes before the html parser clobbers them
    replace(/\<(\/?)(\w+)\:\w+\>/, "$2_mwns_")
    
    # Force UTF-8 encoding. If you'd like to auto-detect the encoding,
    # simply remove the "UTF-8" argument.  e.g. html(){ ... }
    html("UTF-8") {
      
      @import "html.ts"
    }

    # Rewrite the xmlns nodes to restore them
    replace(/(\<(\/?)(\w+))_mwns_(\:\w+\>)/, "$1$4") 

  }
  match($path, /mtv-ajax/) {
    set($response)
  }
  # with(/plain/i) {
  #   @import plain.ts
  # }
  # with(/javascript/) {
  #   @import "ajax.ts"
  # }

  else() {
    log(concat("Passing through ", $content_type, " unmodified"))
  }
}
