if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


// Importing Libraies that we installed using npm
const express = require("express")
const app = express()
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const dbConnect = require('./mongodb');
//const dbConnect2 = require('./mongodb2'); ***no need as type will separate students and teachers***
//var t;
//***function to insert users list in database***
const insertMany = async ()=>{
    
   
        const db = await dbConnect();
        const result = await db.insertMany(users)
        if(result.acknowledged){
            console.log("data inserted")
        }
    
    //const db = await dbConnect();
    //const result = await db.insertMany(users)

    /*if(result.acknowledged){
        console.log("data inserted")
    }*/
}


initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )



const users = []
app.use( express.static( "views" ) );
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, //  wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(methodOverride("_method"))

// Configuring the register post functionality
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

// Configuring the register post functionality
app.post("/register", checkNotAuthenticated, async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(), 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            type: req.body.sub,
        })
        //t = req.body.radio;
        insertMany()
        //bulk.append(users.copy())
        //***********here database is to be connected************
        console.log(users); // Display newly registered in the console
       // insert();
        res.redirect("/login")
        
    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})



// Routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render("index.ejs", {name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


// Importing Libraies that we installed using npm
const express = require("express")
//var MongoClient = require('mongodb').MongoClient;
const assert = require("assert")
//const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require("lodash")
const app = express()
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const dbConnect = require('./mongodb');
const dbConnect2 = require("./mongodb2")
const dbConnect3 = require("./mongodb3")
//const dbConnect2 = require('./mongodb2'); ***no need as type will separate students and teachers***
//var t;
//***function to insert users list in database***
const insertMany = async ()=>{
    
   
        const db = await dbConnect();
        
        const result = await db.insertMany(users)
     
        if(result.acknowledged){
            console.log("data inserted")
        }
        
    
    //const db = await dbConnect();
    //const result = await db.insertMany(users)

    /*if(result.acknowledged){
        console.log("data inserted")
    }*/
}

//**********database for student connected*************
const insert = async ()=>{
    
   
    const db = await dbConnect2();
    
    const result = await db.insertMany(stu)
 
    if(result.acknowledged){
        console.log("data inserted")
       
    }
    

//const db = await dbConnect();
//const result = await db.insertMany(users)

/*if(result.acknowledged){
    console.log("data inserted")
}*/
}

//***********databse for teacher connected*************
const insert2 = async ()=>{

    const db = await dbConnect3();

    const result = await db.insertMany(tea)

    if(result.acknowledged){
        console.log("data inserted")
    }
}

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )



const users = []
app.use( express.static( "views" ) );
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, //  wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(methodOverride("_method"))

// Configuring the register post functionality
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

// Configuring the register post functionality
app.post("/register", checkNotAuthenticated, async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(), 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            type: req.body.sub,
        })
        //t = req.body.radio;
        insertMany()

        //bulk.append(users.copy())
        //***********here database is to be connected************
        console.log(users); // Display newly registered in the console
       // insert();
        res.redirect("/login")
        
    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})

//configuring the student post functionality
const stu = []
app.post("/student", async (req, res) => {

    try {
        stu.push({
            id: Date.now().toString(), 
            name: req.body.name,
            class: req.body.car,
            section: req.body.cars,
        })
        insert()

        //***********here database is to be connected************
        console.log(stu); // Display newly registered in the console
        res.redirect("/save")


    } catch (e) {
        console.log(e);
    }
})

//configuring the teacher post functionality
const tea = []
app.post("/teacher", async (req, res) => {

    try {
        tea.push({
            id: Date.now().toString(),
            name: req.body.name,
            class: req.body.amber,
            section: req.body.skar,
        })
        insert2()

        console.log(tea);
        res.redirect("/save")
    }
    catch (e) {
        console.log(e);
    }
})

app.set('view engine', 'ejs')
//var url = 'mongodb://localhost:27017/headmasterstudents';
let MongoClient = require('mongodb').MongoClient;
var db;
var db2;
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) throw err;
  db = client.db('headmasterstudents');
  //app.listen(3000);
});

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) throw err;
  db2 = client.db('headmasterteacher');
  //app.listen(3000);
});

// Routes

app.get('/', checkAuthenticated, (req, res) => {

    
 
     res.render("index.ejs", {name: req.user.name})
 
 
  
 })
app.get('/student', (req, res) => {

   

    db.collection('data2')
    .find()
    .toArray(function (err, result) {
      if (err) throw err;
      res.render('studentSchedule', {result: result});
    });

  
})

app.get('/teacher', (req, res) => {

    
 
 
     db2.collection('data3')
     .find()
     .toArray(function (err, DATA) {
       if (err) throw err;
       res.render('teacherSchedule', {DATA: DATA});
     });
 
 })

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})

app.get('/headmaster', (req, res) => {
    res.render('headmaster.ejs')
})

app.get('/index_head', (req, res) => {
    res.render('index_head.ejs')
})

app.get('/students', (req, res) => {
    res.render('student.ejs')
})

app.get('/teachers', (req, res) => {
    res.render('teacher.ejs')
    
})

app.get('/save', (req, res) => {
    res.render('save.ejs')
})

app.get('/home', (req, res) => {
    res.render('home.ejs')
})
// End Routes

// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
//   })

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
    //bulk.append(users.copy())
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}





app.listen(3000)

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})

app.get('/headmaster', dataSaved, (req, res) => {
    res.render("headmaster.ejs")
})
// End Routes

// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
//   })

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
    //bulk.append(users.copy())
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

function dataSaved(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/save")
    }
    next()
}

app.listen(3000)