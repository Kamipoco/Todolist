var app = angular.module("app.todos", ["xeditable"]); //trả về 1 ứng dụng angular
//Angular tuân theo mô hình Model-View-Star

app.controller("todoController", ['$scope', 'svTodos', function ($scope, svTodos) {
    $scope.appUse = "AngularJS & NodeJS/Express/API";
    $scope.appName = "Todo List";
    $scope.formData = {};
    $scope.loading = true;

    $scope.todos = [];

    //load Data form API 
    svTodos.get()
        .then( (res) => {
            $scope.todos = res.data; 
            $scope.loading = res.false;
        })
        .catch( (error) => {
            console.log(error, 'Can not get data from API');
        });

    $scope.createTodo = function () {
        // console.log($scope.formData);
        $scope.loading = true;
        var todo = {
            text: $scope.formData.text,
            isDone: false
        }

        svTodos.create(todo)
        .then( (res) => {
            $scope.todos = res.data;
            $scope.formData.text = "";
            $scope.loading = false;
        })
    }

    $scope.updateTodo = function (todo) {
        console.log('Update todo: ', todo);
        $scope.loading = true;

        svTodos.update(todo)
        .then( (res) => {
            $scope.todos = res.data;
            $scope.loading = false;
        })
    }

    $scope.deleteTodo = function (todo) {
        console.log('Delete todo: ', todo);
        $scope.loading = true;

        svTodos.delete(todo._id)
        .then( (res) => {
            $scope.todos = res.data;
            $scope.loading = false
        })
    }

}]);

    // //Data Fake
    // $scope.todos = [
    //     {
    //         text: "Khởi tạo dự án Todo List, include thư viện boostrap, fontawesome, angularjs,...",
    //         isDone: true
    //     },
    //     {
    //         text: "Cài đặt AugularJS app, controller, khởi tạo dữ liệu ban đầu",
    //         isDone: true
    //     },
    //     {
    //         text: "Tạo service gọi bằng API, binding dữ liệu, action, ...",
    //         isDone: false
    //     },
    //     {
    //         text: "Hoàn thành ứng dụng, Desploy lên heroku",
    //         isDone: false
    //     }
    // ];