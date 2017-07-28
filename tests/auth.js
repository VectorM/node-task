import { User } from '../models';
import server from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();

chai.use(chaiHttp);

export const user = {
  email: "userfortest@gmail.com",
  password: "12345"
}

describe('AUTH', () => {
  before((done) => {
    User.remove({email:"userfortest@gmail.com"}, (err) => {
      if (err) {
        throw err;
      }
       done();
    });
  });
  describe('/POST user', () => {
      it('it should POST new user ', (done) => {
        chai.request(server)
          .post('/auth/register')
          .send(user)
          .end((err, res) => {
              res.should.have.status(200);
            done();
          });
      });
  });
  describe('/POST login', () => {
      it('it should auth user ', (done) => {
        chai.request(server)
          .post('/auth/login')
          .send(user)
          .end((err, res) => {
              res.body.should.property('token')
              res.should.have.status(200);
            done();
          });
      });
  });
});

