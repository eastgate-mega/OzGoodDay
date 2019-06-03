// MySQL CONFIG
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123',
    database: 'ozgooddaydb'
  });
  
  db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + db.threadId);
  });


  // // create a database here
app.get('/createDB', function(req, res){
    let sql = 'CREATE DATABASE ozgooddaydb';
    db.query(sql, function(err, result){
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send('success');
      }
    });
  });
  
  // create a new table here
  app.get('/createTableUser', function(req, res){
    let sql = 'CREATE TABLE user(id int(45) AUTO_INCREMENT, name varchar(90) NOT NULL, email varchar(45) NOT NULL, password varchar(45) NOT NULL, PRIMARY KEY (id))';
    db.query(sql, function(err, result){
      if (err) {
        throw err
      } else {
        console.log(result);
        res.send('table created');
      }
    });
  });
  
  // insert user
  app.get('/addUser', function(req, res){
    var user = {
      name: 'test2',
      email: '2',
      password: '2'
    };
    let sql = 'INSERT INTO user SET ?';
    let query = db.query(sql, user, function(err, result){
      if (err) {
        throw err
      } else {
        console.log(result);
        res.send('test2 added');
      }
    });
  });
  
  //select user
  app.get('/selectUser', function(req, res){
    let sql = 'SELECT * FROM user';
    let query = db.query(sql, function(err, result){
      if (err) {
        throw err
      } else {
        console.log(result);
        res.send('user fectched');
      }
    });
  });
  
  //select single user
  app.get('/selectUser/:id', function(req, res){
    let sql = `SELECT * FROM user WHERE id = ${req.params.id}`;
    let query = db.query(sql, function(err, result){
      if (err) {
        throw err
      } else {
        console.log(result);
        res.send('user fectched');
      }
    });
  });
  
  //update single user
  app.get('/selectUser/:id/edit', function(req, res){
    var newName = 'jimmyNew'
    let sql = `UPDATE user SET name = '${newName}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, function(err, result){
      if (err) {
        throw err
      } else {
        console.log(result);
        res.send('user info updated');
      }
    });
  });
  
  //delete single user
  app.get('/deleteUser/:id', function(req, res){
    var newName = 'jimmyNew'
    let sql = `DELETE FROM user WHERE id = ${req.params.id}`;
    let query = db.query(sql, function(err, result){
      if (err) {
        throw err
      } else {
        console.log(result);
        res.send('user deleted');
      }
    });
  });