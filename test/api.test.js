import { Practice, Technology, User } from '../models';
import server from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { user } from './auth.test';

chai.use(chaiHttp);

const mockPractice = new Practice({
  name: 'onlyForTest',
  description: 'onlyForTest'
})

const mockTechnology = {
  name: 'onlyForTest',
  description: 'onlyForTest',
  _created: mockPractice._id
}

function cleanDB(withUser) {
  let models = [
    Practice.remove({ name: "onlyForTest" }),
    Technology.remove({ name: "onlyForTest" })
  ]
  if (withUser) {
    models.push(User.remove({ email:"userfortest@gmail.com" }))
  }
  return Promise.all(models)
}

describe('API', () => {
  let token;

  function setAuthHeader() {
    return { 'authorization': token };
  }

  before(done => {
    cleanDB()
    .then(() => {
      Promise.all(Array(12).fill(mockTechnology).map((technology) => {
        let newTech = new Technology(technology)
        mockPractice.technologies.push(newTech)
        mockPractice.save()
        newTech.save()
      }))
    })
    .then(() => {
      chai.request(server)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
          res.body.should.property('token')
          res.should.have.status(200);
          token = res.body.token
        done();
      });
    })
  })
  after(done => {
    cleanDB(true).then(() => done())
  })
  describe('/GET practices', () => {
    it('it should GET all the practices', (done) => {
      chai.request(server)
      .get('/api/practices')
      .set(setAuthHeader())
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
        done();
      });
    })
  })
  describe('/GET practices/:id/', () => {
    it('it should GET one practice by id', (done) => {
      chai.request(server)
      .get(`/api/practices/${mockPractice._id}`)
      .set(setAuthHeader())
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
        done();
      });
    })
  })
  describe('/GET practices/:id', () => {
    it('it should GET technologies by current practice technologies', (done) => {
      chai.request(server)
      .get(`/api/practices/${mockPractice._id}/technologies`)
      .set(setAuthHeader())
      .end((err, res) => {
          res.should.have.status(200);
          res.body.results.length.should.to.equal(5)
          res.body.should.to.have.property('page')
          res.body.should.to.have.property('pages')
          res.body.should.be.a('object');
        done();
      });
    })
  })
});

