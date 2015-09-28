var express = require('express');
var router = express.Router();
var Project = require('../models/project');

//get all projects
router.get('/projects', function(req, res, next) {
  Project.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


//get one project by id
router.get('/project/:id', function(req, res, next){
  Project.findById(req.params.id, function (err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


//create a project
router.post('/projects', function(req, res, next){
  var newProject = new Project({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    group: req.body.group,
    group_members: req.body.group_members
  });
  newProject.save(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({"SUCCESS": data});
    }
  });
});


//update one project
router.put('/project/:id', function(req, res, next){
  var update = {
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    group: req.body.group,
    group_members: req.body.group_members
  };
  var options = {new: true};
  Project.findOneAndUpdate(req.params.id, update, options, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({'UPDATED' : data});
    }
  });
});


//delete one project
router.delete('/project/:id', function(req, res, next){
  Project.findOneAndRemove(req.params.id, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({'DELETED' : data});
    }
  })
})





module.exports = router;
