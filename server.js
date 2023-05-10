
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                host: '34.28.61.19',
                user: 'root',
                password: 'db-project-team017',
                database: 'Project-017'
});

connection.connect;


var app = express();

const cors = require('cors');
app.use(cors());

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.render('index', { title: 'Mark Attendance' });
});

app.get('/success', function(req, res) {
      res.send({'message': 'SQL Inserted'});
});


app.post('/selecttop3', function(req, res) {
   
    var sql = `SELECT * FROM Top3;`;



console.log(sql);
  connection.query(sql, function(err, result, fields) {
    if (err) {
      res.send(err)
      return;
    }
    console.log(result);
    res.send(result);
  });
});


 
// this code is executed when a user clicks the form submit button
app.post('/insertathlete', function(req, res) {
  var name = req.body.name;
  var discipline = req.body.discipline;
  var noc = req.body.noc;
   
  var sql = `Insert INTO Athletes Values('${name}', '${discipline}', '${noc}');`;



console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/success');
  });
});
app.post('/stored', function(req, res) {
    var sd = req.body.sd;
    var num = req.body.num;
    var noc = req.body.noc;
     
   
    var sql = `call Discipline_Top3('${num}', '${noc}', '${sd}')`;



console.log(sql);
  connection.query(sql, function(err, result, fields) {
    if (err) {
      res.send(err)
      return;
    }
    console.log(result);
    res.send(result);
  });
});

app.post('/deleteathlete', function(req, res) {
    var name = req.body.name;
    var sql = `Delete FROM Athletes WHERE A_name = '${name}';`;


console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.send(result);
  });
});

app.post('/updatetop3', function(req, res) {
  var event = req.body.event;
  var discipline = req.body.discipline;
  var noc = req.body.noc;
  var color = req.body.color;
  
  var sql = 'UPDATE trail_Top3 SET ?? = ? WHERE Discipline = ? AND D_event = ?';

  connection.query(sql, [color, noc, discipline, event], function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.send(result);
  });
});



app.post('/selectathlete', function(req, res) {
    var name = req.body.name;
    var discipline = req.body.discipline;
    var noc = req.body.noc;
     
   
    var sql = `SELECT * FROM Athletes WHERE A_name LIKE '${name}' OR Discipline = '${discipline}' OR NOC = '${noc}';`;



console.log(sql);
  connection.query(sql, function(err, result, fields) {
    if (err) {
      res.send(err)
      return;
    }
    console.log(result);
    res.send(result);
  });
});

app.post('/selectmedals', function(req, res) {

    var sql = `SELECT * FROM trail_Medals;`;



console.log(sql);
  connection.query(sql, function(err, result, fields) {
    if (err) {
      res.send(err)
      return;
    }
    console.log(result);
    res.send(result);
  });
});

app.post('/updateathlete', function(req, res) {
  var name = req.body.name;
  var discipline = req.body.discipline;
    
  var sql = `Update Athletes Set Discipline = '${discipline}' where A_name = '${name}';`;



console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.send(result);
  });
});


app.post('/advancedquery1', function(req, res) {
  var noc = req.body.noc;
  var sql = `SELECT A.A_Name, A.NOC, A.Discipline
             FROM Athletes A
             WHERE A.discipline = (
                 SELECT Discipline
                 FROM Top3
                 GROUP BY Discipline
                 HAVING COUNT(Discipline) >= ALL(
                     SELECT COUNT(t.Discipline) FROM Top3 t GROUP BY t.Discipline
                 )
             )
             AND A.NOC LIKE '${noc}'
             ORDER BY A.A_Name
             LIMIT 15;`;

  console.log(sql);

  connection.query(sql, function(err, result, fields) {
    if (err) {
      res.send(err);
      return;
    }
    console.log(result);
    res.send(result);
  });
});

app.post('/advancedquery2', function(req, res) {
  var noc = req.body.noc;
  var discipline1 = req.body.discipline1;
  var discipline2 = req.body.discipline2;
  var sql = `SELECT Discipline, D_Event
             FROM Top3
             WHERE Discipline = '${discipline1}' and Gold LIKE '${noc}'
             GROUP BY Discipline, D_Event
             UNION
             SELECT Discipline, D_Event
             FROM Top3
             WHERE Discipline = '${discipline2}' and SILVER LIKE '${noc}'
             GROUP BY Discipline, D_Event
             ORDER BY Discipline
             LIMIT 15;`;

  console.log(sql);

  connection.query(sql, function(err, result, fields) {
    if (err) {
      res.send(err);
      return;
    }
    console.log(result);
    res.send(result);
  });
});


app.listen(80, function () {
    console.log('Node app is running on port 80');
});

