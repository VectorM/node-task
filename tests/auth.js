import { Practice, Technologies } from '../models';
import server from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();

chai.use(chaiHttp);

const user = {
  email: "userfortest@gmail.com",
  password: "12345"
}

const request = chai.request(server);

describe('API', () => {
  describe('/GET practices', () => {
    it('it should GET all the practices', (done) => {
      chai.request(server)
      .get('/api/practices')
      .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('array');
        done();
      });
    })
  })
  describe('/GET practices by Id', () => {
    it('it should GET all the practices', (done) => {
      chai.request(server)
      .get('/api/practices')
      .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('array');
        done();
      });
    })
  })
  describe('/GET technologies by practices', () => {
    it('it should GET all the practices', (done) => {
      chai.request(server)
      .get('/api/practices')
      .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('array');
        done();
      });
    })
  })
});

