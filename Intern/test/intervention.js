

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
            //.send(interventions)
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
    
         /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id interventions', () => {
    it('it should DELETE an intervention given the id', (done) => {
        let intervention = new interventions({
        createdBy: "7",
        tittle: "Bad Roads",
        type: "red flag",
        location: "Kampala",
        status: "Draft",
        comment: "The water was too much." 
    })
        intervention.save((err, intervention) => {
              chai.request(server)
              .delete('/interventions/:id')
              .end((err, res) => {
                    res.should.have.status(500);
                   // res.body.should.be.a('object');
                    res.body.should.have.property('message').eql(' Deleted This Intervention!');
                   
                done();
              });
        });
    });
});








    

module.exports = server;