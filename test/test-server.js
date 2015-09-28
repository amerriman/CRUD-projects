process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var Project = require("../server/models/project");

var should = chai.should();
chai.use(chaiHttp);

describe('Projects', function(){

  // ************HOOK***************
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

  it('should list ALL projects on /api/projects GET', function(done) {
  chai.request(server)
    .get('/api/projects')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });


  it('should list a SINGLE project on /api/project/<id> GET', function(done) {
    var newProject = new Project({
      name: 'Reddit Clone',
      description: "Show off new Angular skills",
      tags: ["CSS", "HTML", "Angular"],
      group: false,
      group_members: []
    });
    newProject.save(function(err, data) {
      chai.request(server)
        .get('/api/project/'+data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
  });



  it('should add a SINGLE project on /projectss POST', function(done) {
  chai.request(server)
    .post('/api/projects')
    .send({'name': 'Game Library', 'description': 'Create lists of games', 'tags': ['JavaScript', 'HTML'], 'group': false, 'group_members': []})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });


  it('should update a SINGLE project on /api/project/<id> PUT', function(done) {
  chai.request(server)
    .get('/api/projects')
    .end(function(err, res){
      chai.request(server)
        .put('/api/project/'+res.body[0]._id)
        .send({'name': 'Cabin Sort'})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          done();
      });
    });
  });


  it('should delete a SINGLE project on /api/project/<id> DELETE', function(done) {
  chai.request(server)
    .get('/api/projects')
    .end(function(err, res){
      chai.request(server)
        .delete('/api/project/'+res.body[0]._id)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          done();
      });
    });
  });



});
