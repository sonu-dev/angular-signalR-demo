(function () {

    var app = angular.module('chatApp', []);

    app.controller('chatController', function chatController($scope) {

        // scope variables
        $scope.name = 'Guest'; // holds the user's name
        $scope.message = ''; // holds the new message
        $scope.messages = []; // collection of messages coming from server
        $scope.chatHub = null; // holds the reference to hub

        $scope.chatHub = $.connection.chatHub; // initializes hub
        $.connection.hub.start(); // starts hub

        // register a client method on hub to be invoked by the server
        $scope.chatHub.client.broadcastMessage = function (name, message) {
            var newMessage = name + ' says ' + message;
            $scope.messages.push(newMessage);
            $scope.$apply();
        };

        $scope.sendMessage = function () {
            // sends a new message to the server
            $scope.chatHub.server.sendMessage($scope.name, $scope.message);
            $scope.message = '';
        }
    });
}())