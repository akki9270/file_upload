angular.module('fileUpload')
    .controller('fileUploadController', ['$scope', 'Upload', function ($scope, Upload) {
        $scope.file = {};
        $scope.onUpload = function () {
            Upload.upload({
                url: '/api/upload',
                data: { file: $scope.file, name: 'User' }
            })
                .then(function (res) {
                    $scope.message = res.data;
                })
        }
    }]);