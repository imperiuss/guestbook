var app = angular.module('app', []);
app.controller('RecordsController', ['$scope', '$http', 'RecordService', function ($scope, $http, RecordService) {
    $scope.records = [];
    var paginationOptions = {
        pageNumber: 1,
        pageSize: 5
    };
    $scope.pageNumber = 1;

    RecordService.getRecords($scope.pageNumber, paginationOptions.pageSize).success(function (data) {
        $scope.records = data.content;
        $scope.first = data.first;
    });

    $scope.setCurrent = function setPage(newPage) {
        $scope.pageNumber = newPage;
        RecordService.getRecords($scope.pageNumber, paginationOptions.pageSize).success(function (data) {
            $scope.records = data.content;
            $scope.first = data.first;
            $scope.last = data.last;
        });
    };
    $scope.addRowAsyncAsJSON = function () {

        var dataObj = {
            name: $scope.name,
            message: $scope.message,
            email: $scope.email,
            date: new Date()
        };
        var res = $http.post('/saverecord', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.records.unshift(dataObj);
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        $scope.name = '';
        $scope.message = '';
        $scope.email = '';
    };
}]);
app.service('RecordService', ['$http', function ($http) {

    function getRecords(pageNumber, size) {
        pageNumber = pageNumber > 0 ? pageNumber - 1 : 0;
        return $http({
            method: 'GET',
            url: '/records?page=' + pageNumber + '&size=' + size
        });
    }

    return {
        getRecords: getRecords
    };
}]);