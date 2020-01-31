

let mongoose = require("mongoose");
let interventions = require('../models/intervention');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = 'http://localhost:3000';


chai.use(chaiHttp);



describe('/GET interventions', function() {
    it('it should GET all interventions', function()  {
    chai.request(server)
        .get('/interventions')
        .end(function(err, res) {
              res.should.have.status(200);
              res.body.should.have.property('createdBy')
              res.body.should.have.property('title')
              res.body.should.have.property('type')
              res.body.should.have.property('location')
              res.body.should.have.property('status')
              res.body.should.have.property('images')
              res.body.should.have.property('videos')
              res.body.should.have.property('comment')
              
              
              
              
              done();
           });
        });
    });

    describe('/POST interventions', function() {
        it('it should post an intervention', function()  {
        chai.request(server)
            .post('/interventions')
            .send(interventions)
            .end(function(err, res) {
                  res.should.have.status(200);
                  res.body.should.have.property('createdBy')
                  res.body.should.have.property('title')
                  res.body.should.have.property('type')
                  res.body.should.have.property('location')
                  res.body.should.have.property('status')
                  res.body.should.have.property('images')
                  res.body.should.have.property('comment')
                  res.body.should.have.property('message').eql('Intervention created!');
                  
                  
                  
                  done();
               });
            });
        });
    
    

module.exports = server;