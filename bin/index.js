'use strict';

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var mongoose = require('mongoose');
var Book = require('./models/book');

mongoose.connect('mongodb://localhost/books-koa');

var app = new Koa();
var router = new Router();

app.use(bodyParser());

router.get('/', function (ctx) {
    ctx.type = "json";
    ctx.body = { hello: "World" };
});

router.post('/books', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = ctx.request.body;

                        ctx.type = "json";
                        _context.prev = 2;
                        _context.next = 5;
                        return Book.create({ title: data.title, url: data.url });

                    case 5:
                        ctx.body = { message: "Book " + data.title + " has been added", data: data };
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](2);

                        ctx.body = { message: _context.t0.message };

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 8]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());
router.get('/books/:id', function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
        var id, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        id = ctx.params.id;

                        ctx.type = "json";
                        _context2.prev = 2;
                        _context2.next = 5;
                        return Book.findById(id);

                    case 5:
                        data = _context2.sent;

                        ctx.body = { message: "Book " + data.title + " found", data: data };
                        _context2.next = 12;
                        break;

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](2);

                        ctx.body = { message: _context2.t0.message };

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[2, 9]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());
router.put('/books/:id', function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var id, data, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        id = ctx.params.id;
                        data = ctx.request.body;

                        ctx.type = "json";
                        _context3.prev = 3;
                        _context3.next = 6;
                        return Book.findByIdAndUpdate(id, { title: data.title, url: data.url }, { new: true });

                    case 6:
                        response = _context3.sent;

                        ctx.body = { message: "Book " + response.title + " has been updated", data: response };
                        _context3.next = 13;
                        break;

                    case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3['catch'](3);

                        ctx.body = { message: _context3.t0.message };

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[3, 10]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());
router.del('/books/:id', function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(ctx, next) {
        var id, data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        id = ctx.params.id;

                        ctx.type = "json";
                        _context4.prev = 2;
                        _context4.next = 5;
                        return Book.findByIdAndRemove(id);

                    case 5:
                        data = _context4.sent;

                        ctx.body = { message: "Book " + data.title + " has been removed", data: data };
                        _context4.next = 12;
                        break;

                    case 9:
                        _context4.prev = 9;
                        _context4.t0 = _context4['catch'](2);

                        ctx.body = { message: _context4.t0.message };

                    case 12:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[2, 9]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());

app.use(router.routes());

app.listen(3000, function () {
    return console.log("Listening...");
});