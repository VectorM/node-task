import mongoose from 'mongoose';
import { User } from '../models';
import server from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();

chai.use(chaiHttp);

const testUser = {
  email: "test@gmail.com",
  password: "12345"
}

describe('Practices', () => {
  let token
  before((done) => {
    User.remove({email:"test@gmail.com"}, err => {
      if (err) {
        throw err
      }
      const request = chai.request(server);
      request
        .post('/auth/register')
        .send(testUser)
        .then(function () {
          request
            .post('/auth/login')
            .send(testUser)
            .end(function (err, res) {
              token = res.body.token
              done();
            });
        });
    })
  });
  describe('/GET practices', () => {
    it('it should GET all the practices', (done) => {
      chai.request(server)
      .get('/api/practices')
      .set('authorization', token)
      .end((err, res) => {
        console.log('ss', token);
          res.should.have.status(200);
        done();
      });
    })
  })
})
