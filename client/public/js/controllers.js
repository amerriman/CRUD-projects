app.controller("ProjectController", function($scope, httpFactory, $timeout){
  $scope.success = false;
  $scope.message = "";
  $scope.project = {};
  $scope.edit = false;
  $scope.findProject = "";
  $scope.project.group = false;
  $scope.project.group_members = "";

  getProjects = function (url) {
    httpFactory.get(url)
    .then(function(response){
      $scope.projects = response.data;
      console.log($scope.projects, "sp");
    });
  };
  getProjects('api/projects');

  function messageTimeout(){
    $scope.success = false;
  }


  $scope.postProject = function (){
    var payload = $scope.project;
    httpFactory.post('api/projects', payload)
    .then(function(response){
      console.log(response.data.SUCCESS, "rd");
      $scope.projects.push(response.data.SUCCESS);
      $scope.project = {};
      $scope.success = true;
      $scope.message = "Added a new project!";
      $timeout(messageTimeout, 5000);
    });
  };


  $scope.deleteProject = function(id) {
  $scope.findProject = "/api/project/" + id;
  httpFactory.delete($scope.findProject).then(function(response){
    // console.log(response);
    getProjects('/api/projects');
  });
  $scope.success = true;
  $scope.message = "Project Deleted!";
  $timeout(messageTimeout, 5000);
};


  $scope.editProject = function(id){
    $scope.findProject = "/api/project/" + id;
    httpFactory.get($scope.findProject).then(function(response){

      $scope.project = response.data;
    });
    $scope.edit = true;
  };


$scope.updateProject = function(){
  var update = $scope.project;
  httpFactory.put($scope.findProject, update).then(function(response){
    getProjects('/api/projects');
  });
  $scope.project = {};
  $scope.success = true;
  $scope.message = "The project has been changed!";
  $timeout(messageTimeout, 5000);
  $scope.edit = false;
};


});
