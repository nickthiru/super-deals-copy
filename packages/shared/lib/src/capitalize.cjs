"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
var _ramda = require("ramda");
function capitalize() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var splitOn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";
  var joinWith = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : " ";
  var copy = text.slice(0);
  var split = copy.split(splitOn);
  var arrCapWords = (0, _ramda.map)(function (word) {
    var capFirst = (0, _ramda.toUpper)(word.charAt(0));
    var capWord = capFirst + word.slice(1);
    return capWord;
  }, split);
  var capText = (0, _ramda.join)(joinWith)(arrCapWords);
  return capText;
}