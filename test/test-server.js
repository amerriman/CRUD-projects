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
      res.body.should.be.a('array');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('description');
      res.body[0].should.have.property('tags');
      res.body[0].should.have.property('group');
      res.body[0].should.have.property('group_members');
      res.body[0].name.should.equal('War');
      res.body[0].description.should.equal('something');
      res.body[0].tags[0].should.equal('CSS');
      res.body[0].tags[1].should.equal('HTML');
      res.body[0].group.should.equal(true);
      res.body[0].group_members[0].should.equal('Ashley');
      res.body[0].group_members[1].should.equal('Zoe');
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
          // console.log(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('description');
          res.body.should.have.property('tags');
          res.body.should.have.property('group');
          res.body.should.have.property('group_members');
          res.body.name.should.equal('Reddit Clone');
          res.body.description.should.equal('Show off new Angular skills');
          res.body.tags[0].should.equal("CSS");
          res.body.group.should.equal(false);
          res.body.group_members.should.eql([]);
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
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      res.body.SUCCESS.should.have.property('name');
      res.body.SUCCESS.should.have.property('description');
      res.body.SUCCESS.should.have.property('tags');
      res.body.SUCCESS.should.have.property('group');
      res.body.SUCCESS.should.have.property('group_members');
      res.body.SUCCESS.should.have.property('_id');
      res.body.SUCCESS.name.should.equal('Game Library');
      res.body.SUCCESS.description.should.equal('Create lists of games');
      res.body.SUCCESS.tags[0].should.equal('JavaScript');
      res.body.SUCCESS.group.should.equal(false);
      res.body.SUCCESS.group_members.should.eql([]);
      done();
    });
  });


  it('should update a SINGLE project on /api/project/<id> PUT', function(done) {
  chai.request(server)
    .get('/api/projects')
    .end(function(err, res){
      chai.request(server)
        .put('/api/project/'+res.body[0]._id)
        .send({'name': 'Cabin Sort', "description": "something", "tags": ["CSS", "HTML", "JQuery"], "group": true, "group_members": ["Ashley", "Zoe", "Charlie"]})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          // console.log(response.body)
          response.body.should.be.a('object');
          response.body.should.have.property('UPDATED');
          response.body.UPDATED.should.be.a('object');
          response.body.UPDATED.should.have.property('name');
          response.body.UPDATED.should.have.property('_id');
          response.body.UPDATED.name.should.equal('Cabin Sort');
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
          // console.log(response.body);
          response.body.should.be.a('object');
          response.body.should.have.property('REMOVED');
          response.body.REMOVED.should.be.a('object');
          response.body.REMOVED.should.have.property('name');
          response.body.REMOVED.should.have.property('_id');
          response.body.REMOVED.name.should.equal('War');
          done();
      });
    });
  });



});
