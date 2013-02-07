log("--> Running plain.ts")

# Normal Ajax can be parsed simply using html_fragment()
# html_fragment("utf-8") {
#   
#   rewrite_links()
#   absolutize_srcs()
# 
#   # Needed to begin mobilizing
#   remove_all_styles()
# 
#   match($path) {
#     # with(/foo/) {
#     #   log("--> Importing ajax/foo.ts in plain.ts")
#     #   @import ajax/foo.ts
#     # }
#   }
# }

#############
#############
#############

# The following section is required for when dealing with .NET Ajax
# The content length is encoded and requires extra special handling
# by calculating said length. 

# Aspx for multiple different parts per response
# replace(/(\s*?\|?)(\d+)(\|[^\|]*\|[^\|]*\|)(.*?)\|(?=((\d+\|)|$))|/m) {
#   $first = $1
#   $second = $2    # content length
#   $third = $3     # parent container
#   $fourth = $4    # actual content
#   $fourth {
#     $charset_determined = "utf-8" # force encoding for proper length
#     html_fragment("utf-8") {
#       
#       rewrite_links()
#       absolutize_srcs()
# 
#       # Needed to begin mobilizing
#       remove_all_styles()
# 
#       match($path) {
#         # with(/foo/) {
#         #   log("--> Importing ajax/foo.ts in plain.ts")
#         #   @import ajax/foo.ts
#         # }
#       }
#     }
#     replace(/&amp;/, "&")
#     replace(/%20/, " ")
#     replace(/%22/, "\"")
#   }
#   log("changed")
#   
#   # log(concat("=>  $first:  ", $first))
#   # log(concat("=>  $second:  ", $second))
#   # log(concat("=>  $third:  ", $third))
#   # log(concat("=>  $fourth:  ", $fourth))
#   
#   match($second) {
#     with(/^0$/) {
#       log("!!!! $second is 0")
#       $second = length($fourth)
#       $collection = concat($collection, $first, $second, $third, $fourth, "|")      
#     }
#     with(/^$/) {
#       log("!!!! $second is null")
#       $collection = concat($collection, $first, $second, $third, $fourth)            
#     }
#     not(/^0$/) {
#       $second = length($fourth)
#       log("!!!! $second is just something else")
#       $collection = concat($collection, $first, $second, $third, $fourth, "|")      
#     }
#   }
#   # Error => You've probably broken the AJAX somehow
#   match($third) {
#     with(/\|error\|/) {
#       log("!!!! Error Ajax")
#       $collection = concat($collection, $first, $second, $third, $fourth, "|")      
#     }
#   }
#   
#   # log(concat("=>  $collection:  ", $collection))
#   
#   # log("--> ===================================")
# }
# set($collection)
