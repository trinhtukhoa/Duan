var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
    var url = `http://localhost:8081/api/file/images`;
    $scope.url = function(filename) { 
        return `${url}/${filename}`;
    }

    $scope.list = async function(){
        await $http.get(url).then(response => {
            $scope.filenames =  response.data;
            console.log(response.data);
        }).catch(error => {
            console.log("Errors",error);
        })
    }
     
    $scope.upload = async function(files){
        console.log(files);
        var form = new FormData();
        console.log(form);
        for(var i = 0; i < files.length; i++){
            form.append("files", files[i]);
        }
        console.log(form.getAll("files"));
        await $http.post(url, form, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(response => {
            $scope.filenames.push(...response.data);
            console.log(...response.data); 
        }).catch(error => {
            console.log("Errors",error);
        });
    }

    $scope.delete = function(filename) {
        $http.delete(`${url}/${filename}`).then(response => {
            let i = $scope.filenames.findIndex(name => name == filename);
            $scope.filenames.splice(i,1);
        }).catch(error => {
            console.log("Errors",error);
        });
    }

    $scope.list();
});