const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const serverless = require('serverless-http')
const session = require('express-session')
const app = express()
const port = 3001;

const validCredentials = {
    username: 'admin',
    password: 'admin@123'
}

let isAuthenticated = false;

// view engine setup 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    if (req.session.isAuthenticated) {
        res.redirect('/')
    } else {
        res.render('index')  
        
    }
})

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (username === validCredentials.username && password === validCredentials.password) {
        req.session.isAuthenticated = true;
        res.redirect('/home');
    } else {
        res.send('Incorrect username or password. Please try again.')
    }
} );

app.get('/home', (req, res) => {
    if (req.session.isAuthenticated) {
        res.render('home')   
    } else {
        res.redirect('/')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err)
        }
        res.redirect('/')
    })
})

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

// app.use('/.netlify/functions/main', app);
// module.exports.handler = serverless(app)