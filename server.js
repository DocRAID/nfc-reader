const express = require("express");
const app = express();
const port = 8888;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("./main")
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root", // 아이디
  password: "limdongju", // 비밀번호
  database: "nfc", // db 이름 
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// let corsOptions = { 특정 도메인만 접근 허용
//     origin: 'https:...',
//     credentials: true
// }
app.use(cors(/* corsOpions */));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/inquiry", (req, res) => {
    connection.query("SELECT * FROM attend", function (err, rows, fields) {
        if (err) {
          console.log("데이터 가져오기 실패");
        } else {
          console.log(rows);
          res.send(rows);
        }
      });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  
});