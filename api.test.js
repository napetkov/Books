const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('./server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Books API', () => {
    it('Should post a book', (done) => {
        const body = { id: "1", title: "DevOps Magic", author: "Nikolay" };
        chai.request(server)
            .post('/books')
            .send(body)
            .end((err, resp) => {
                if (err) {
                    return done(err);
                }
                expect(resp.statusCode).to.equal(201);
                done();
            })
    })

    it('Should GET all books', (done) => {
        chai.request(server)
            .get('/books')
            .end((err, resp) => {
                expect(resp).to.have.status(200);
                expect(resp.body).to.be.a('array');
                done();
            })
    })

    it('Should get a single book', (done) => {
        const bookId = "1";

        chai.request(server)
            .get(`/books/${bookId}`)
            .end((err, resp) => {
                expect(resp).to.have.status(200);
                expect(resp.body).to.be.a('object')
                expect(resp.body).to.have.property('id');
                expect(resp.body).to.have.property('title');
                expect(resp.body).to.have.property('author');
                done();

            })
    })

    it('Should PUT an existing book', (done) => {
        const bookId = "1";
        const updatedTitle = "Updated Book Title for test";
        const updatedAuthor = "Updated Book Author for test";

        const updatedBook = {id:bookId, title: updatedTitle, author: updatedAuthor}
        
        chai.request(server)
            .put(`/books/${bookId}`)
            .send(updatedBook)
            .end((err, resp) => {
                expect(resp).to.have.status(200);
                expect(resp.body).to.be.a('object');
                expect(resp.body.title).to.equal(updatedTitle)
                expect(resp.body.author).to.equal(updatedAuthor)
                done();
            })
            
    })

})

