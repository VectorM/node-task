import mongoose from 'mongoose';
import { Practice } from '../models';
import server from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();

chai.use(chaiHttp);

describe('Practices', () => {
  beforeEach((done) => {
    Practice.remove({}, (err) => {
      done();
    });
  });
  describe('/GET practices', () => {
    it('it should GET all the practices', (done) => {
      chai.request(server)
      .get('/practices')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        done();
      });
    })
  })
})
