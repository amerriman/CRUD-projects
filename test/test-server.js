process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var Project = require("../server/models/project");

var should = chai.should();
chai.use(chaiHttp);

describe('Projects', function(){
  // ******************************
  Project.collection.drop();

  beforeEach(function(done){
    var newProject = new Project({
      name: "War",
      description: "something",
      tags: ["CSS", "HTML", "JQuery"],
      group: true,
      group_members: ["Ashley", "Zoe", "Charlie"]
    });
    newProject.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Project.collection.drop();
    done();
  });
  // ******************************

  it('should list ALL projects on /projects GET', function(done) {
  chai.request(server)
    .get('/projects')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });


  it('should list a SINGLE project on /project/<id> GET', function(done) {
    var newProject = new Project({
      name: 'Super',
      lastName: 'man'
    });
    newProject.save(function(err, data) {
      chai.request(server)
        .get('/project/'+data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
  });


  it('should update a SINGLE project on /project/<id> PUT', function(done) {
  chai.request(server)
    .get('/projects')
    .end(function(err, res){
      chai.request(server)
        .put('/project/'+res.body[0]._id)
        .send({'name': 'Spider'})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          done();
      });
    });
  });


  it('should delete a SINGLE project on /project/<id> DELETE', function(done) {
  chai.request(server)
    .get('/projects')
    .end(function(err, res){
      chai.request(server)
        .delete('/project/'+res.body[0]._id)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          done();
      });
    });
  });



});
