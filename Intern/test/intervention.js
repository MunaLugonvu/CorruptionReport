process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let intervention = require('..models/intervention');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

let server = require('../server');

describe('interventions', () => {
    beforeEach((done) => {
        interventions.remove({}, (err) => { 
           done();           
        });        
    });
  describe('/GET interventions', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/interventions')
            .end((err, res) => {
                  res.should.have.status(500);
            
              done();
            });
      });
  });
})
;