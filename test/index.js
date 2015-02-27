/* jshint node: true */

"use strict";

require("babel/register");
[].map(function(file) {
    return "./" + file;
}).forEach(require);
