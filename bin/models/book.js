"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BookSchema = new _mongoose2.default.Schema({
    title: String,
    url: String
});

module.exports = _mongoose2.default.model("Book", BookSchema);