var MyCtrl = function ($scope) {
    "use strict";
    /*global alert:false*/
    $scope.nr = 2;
    $scope.step = 1;
    $scope.pressed = false;
    $scope.limit = 3;

    $scope.scores = [
        {name: "Ion",
            score: "150"},
        {name: "John",
            score: "100"},
        {name: "Mishu",
            score: "60"},
        {name: "Mike",
            score: "30"}
    ];


    $scope.count = function (i) {
        $scope.nr += i;
        return $scope.nr;
    };

    $scope.ascending = function () {
        return $scope.count($scope.step);
    };

    $scope.descending = function () {
        return $scope.count(-$scope.step);
    };

    $scope.compare = function (a, b) {
        return b.score - a.score;
    };

    $scope.addScore = function () {
        var nar, sc, name;
        if (($scope.name === undefined) || ($scope.name === "")) {
            alert("Please enter your name!");
        } else {
            nar = $scope.name.split(" ");
            sc = nar.pop();
            name = nar[0];
            $scope.scores.push({name: name, score: sc});
            if (!$scope.pressed) {
                $scope.pressed = true;
            } else {
                $scope.pressed = false;
            }
            $scope.name = "";
        }
        $scope.scores.sort($scope.compare);
    };

    $scope.deleteScore = function () {
        $scope.scores.splice($scope.scores.indexOf(this.score), 1);
    };
};