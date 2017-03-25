import 'babel-polyfill';
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const Book = require('./models/book');

mongoose.connect('mongodb://localhost/books-koa');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/', (ctx) => {
    ctx.type = "json";
    ctx.body = { hello: "World"}
});

router.post('/books', async (ctx, next) => {
    const data = ctx.request.body;
    ctx.type = "json";
    try {
        await Book.create({title: data.title, url: data.url});
        ctx.body = { message: "Book " + data.title + " has been added", data: data };
    } catch (error) {
        ctx.body = { message: error.message };
    }
});
router.get('/books/:id', async (ctx, next) => {
	const id = ctx.params.id;
    ctx.type = "json";
    try {
        const data = await Book.findById(id);
        ctx.body = { message: "Book " + data.title + " found", data: data };
    } catch (error) {
        ctx.body = { message: error.message };
    }
});
router.put('/books/:id', async (ctx, next) => {
	const id = ctx.params.id;
	const data = ctx.request.body;
    ctx.type = "json";
    try {
        const response = await Book.findByIdAndUpdate(id, {title: data.title, url: data.url}, {new: true});
        ctx.body = { message: "Book " + response.title + " has been updated", data: response };
    } catch (error) {
        ctx.body = { message: error.message };
    }
});
router.del('/books/:id', async (ctx, next) => {
	const id = ctx.params.id;
    ctx.type = "json";
    try {
        const data = await Book.findByIdAndRemove(id);
        ctx.body = { message: "Book " + data.title + " has been removed", data: data };
    } catch (error) {
       ctx.body = { message: error.message }; 
    }
});

app.use(router.routes());

app.listen(3000, () => console.log("Listening..."));