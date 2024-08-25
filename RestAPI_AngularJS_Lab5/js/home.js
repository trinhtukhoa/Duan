let host = "http://localhost:8081/api";

var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {
    // Initialize student and students objects
    $scope.student = {};
    $scope.students = [];

    // Load all students from the API
    $scope.load_All = function() {
        var url = `${host}/student`;
        $http.get(url).then(response => {
            $scope.students = response.data;
            alert("Loaded all students successfully.");
        }).catch(error => {
            alert("Error loading students: " + error);
        });
    };

    // Edit a student by their ID
    $scope.edit = function(id) {
        var url = `${host}/student/${id}`;
        $http.get(url).then(response => {
            $scope.student = response.data;
            alert("Loaded student successfully.");
        }).catch(error => {
            alert("Error loading student: " + error);
        });
    };

    // Create a new student
    $scope.create = function() {
        var st = angular.copy($scope.student);
        var url = `${host}/student`;
        $http.post(url, st).then(response => {
            $scope.students.push(response.data);
            $scope.reset();
            alert("Student created successfully.");
        }).catch(error => {
            console.log(error); // Log the full error object to the console
            let errorMessage = error.data ? error.data.message : (error.statusText || "Unknown error");
            alert("Error creating student: " + errorMessage);
        });
    };
    
    

    // Update an existing student
    $scope.update = function() {
        var st = angular.copy($scope.student);
        var url = `${host}/student/${$scope.student.id}`;
        $http.put(url, st).then(response => {
            var index = $scope.students.findIndex(x => x.id == $scope.student.id);
            $scope.students[index] = response.data; // Update the student in the list
            alert("Student updated successfully.");
        }).catch(error => {
            alert("Error updating student: " + error);
        });
    };

    // Delete a student by their ID
    $scope.delete = function(id) {
        var url = `${host}/student/${id}`;
        $http.delete(url).then(response => {
            var index = $scope.students.findIndex(x => x.id == id);
            $scope.students.splice(index, 1); // Remove the student from the list
            $scope.reset(); // Reset the form
            alert("Student deleted successfully.");
        }).catch(error => {
            alert("Error deleting student: " + error);
        });
    };

    // Reset the form to default values
    $scope.reset = function() {
        $scope.student = { gender: true }; // Initialize gender with true (assuming true = Male)
    };

    // Initialize by loading all students and resetting the form
    $scope.load_All();
    $scope.reset();
});