var app = angular.module('app', ['ui.grid','ui.grid.pagination']);
app.controller('RecordCtrl', ['$scope','RecordService', '$http',
    function ($scope, RecordService, $http) {
        var paginationOptions = {
            pageNumber: 1,
            pageSize: 5,
            sort: null
        };

        RecordService.getRecords(
            paginationOptions.pageNumber,
            paginationOptions.pageSize).success(function(data){
            $scope.gridOptions.data = data.content;
            $scope.gridOptions.totalItems = data.totalElements;
        });

        $scope.gridOptions = {
            paginationPageSizes: [1, 3, 5],
            paginationPageSize: paginationOptions.pageSize,
            enableColumnMenus:false,
            useExternalPagination: true,
            columnDefs: [
                { name: 'name' },
                { name: 'message' },
                { name: 'email' },
                { name: 'date', type: 'date', cellFilter: 'date:\'yyyy-MM-dd h:mma\''}
            ],
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
                gridApi.pagination.on.paginationChanged(
                    $scope,
                    function (newPage, pageSize) {
                        paginationOptions.pageNumber = newPage;
                        paginationOptions.pageSize = pageSize;
                        RecordService.getRecords(newPage,pageSize)
                            .success(function(data){
                                $scope.gridOptions.data = data.content;
                                $scope.gridOptions.totalItems = data.totalElements;
                            });
                    });
            }
        };
        $scope.addRowAsyncAsJSON = function(){

            var dataObj = {
                name : $scope.name,
                message : $scope.message,
                email : $scope.email,
                date : new Date()
            };
            var res = $http.post('/saverecord', dataObj);
            $scope.gridOptions.data.push(dataObj);
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
            // Making the fields empty
            //
            $scope.name='';
            $scope.message='';
            $scope.email='';
        };
    }]);
app.service('RecordService',['$http', function ($http) {

    function getRecords(pageNumber,size) {
        pageNumber = pageNumber > 0?pageNumber - 1:0;
        return $http({
            method: 'GET',
            url: '/records?page='+pageNumber+'&size='+size
        });
    }
    return {
        getRecords: getRecords
    };
}]);