var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	$scope.import = function(files){
		var reader = new FileReader();
		reader.onloadend = async () => { // => reader.result
			var workbook = new ExcelJS.Workbook();
			await workbook.xlsx.load(reader.result);
			const worksheet = workbook.getWorksheet('Sheet1');
            console.log(worksheet);
			worksheet.eachRow((row,index) => {
				if(index > 1){
					let student = {
						id: row.getCell(1).value,
						fullname: row.getCell(2).value,
						email: row.getCell(3).value,
						gender: true && row.getCell(4).value,
						marks: +row.getCell(5).value,
						phone: row.getCell(6).value,
						subjects: row.getCell(7).value
					}
                    console.log(student)
					let url = "http://localhost:8081/api/student";
           			$http.post(url,student).then(response => console.log("Succes",response.data))
           			.catch(error => console.log("Error",error));
				}
			});
		};
		reader.readAsArrayBuffer(files[0]);
	}
});