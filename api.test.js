const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('./server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Books API', () =>{
    it('Should post a book', (done) =>{
        const body = {id: 1, title: "DevOps Magic", author: "Nikolay"};
        chai.request(server)
            .post('/books')
            .send(body)
            .end((err, resp) => {
                if(err){
                    done(err);
                }
                expect(resp.statusCode).to.equal(201);
                done();
            })
    })

})

