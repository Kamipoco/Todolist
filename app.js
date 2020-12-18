var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');//sử dụng morgan để log những request đến
var mongoose = require('mongoose');
const { render } = require('ejs');

//Khởi tạo app bằng express
var app = express();
var port = process.env.PORT || 3000; //khởi tạo port thông qua biến mội trường, nếu ko có thì gán mặc định port=3000

app.use(bodyParser.json());//Kiểu dữ liệu muốn đọc từ người dùng gửi lên đc chuyển sang json
app.use(bodyParser.urlencoded({ extended: true })); //chấp nhận mọi kiểu gửi về server

//Sử dụng middlewware cung cấp các tài nguyên tĩnh cho client, ánh xạ, người dùng truy cập thông qua assets này
app.use('/assets', express.static(__dirname + '/public'));


app.use(morgan('dev')); //sử dụng middleware để log req ra console

app.set('view engine', 'ejs');//template engine là ejs

//connect MongoDB
// mongoose.connect('mongodb://localhost/node-todos'); //ROBO3T LOCAL
mongoose.connect('mongodb+srv://Lam:01676891120@cluster0.fndmh.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true}); //ATLAT TRỰC TUYẾN
var db = mongoose.connection;

var config = require('./config')
var setupController = require('./api/controllers/setupController');
var todoController = require('./api/controllers/todoController');

setupController(app);
todoController(app);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
});