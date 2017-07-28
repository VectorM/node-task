import { Practice, Technology } from '../models';
import server from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { user } from './auth';

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

describe('API', () => {
  let token;

  function setAuthHeader() {
    return { 'authorization': token };
  }

  before(done => {
    const models = [
      Practice.remove(),
      Technology.remove()
    ]
    Promise.all(models).then(() => {
      console.log('in');
    })
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
          console.log("BODY", res.body);
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
          console.log('RES_BODY:',res.body);
          res.body.results.length.should.to.equal(5)
          res.body.should.be.a('object');
        done();
      });
    })
  })
});

