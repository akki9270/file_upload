angular.module('fileUpload', ['ngRoute', 'ngFileUpload'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/upload', {
                templateUrl: './src/fileUpload/fileUpload.html',
                controller: 'fileUploadController',
            })
            .otherwise({ redirectTo: '/upload' });
    });