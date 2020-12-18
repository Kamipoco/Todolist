const { model } = require('../models/todoModel');
var Todos = require('../models/todoModel');

module.exports = function(app) {
    app.get('/api/setupTodos', (req, res) => {{

        //setup seed data
        var seedTodos = [
            {
                text: "Học Nodejs",
                isDone: false
            },
            {
                text: "Học Angular.js",
                isDone: false
            },
            {
                text: "Xây dựng ứng dụng hoàn chỉnh",
                isDone: false
            },
        ];

        Todos.create(seedTodos, (err, results) => {
            res.send(results);
        });
    }});
}