import express from 'express'
const app = express()
import session from 'express-session'
import bcrypt from "bcryptjs";
import mongoose from 'mongoose'
import User from './model/user.model.js' 
import cokkieParser from 'cookie-parser'
import cookieParser from 'cookie-parser';
import csurf from 'csurf';


app.use(cookieParser())

const csurfProtection = csurf({ cookie: true });


app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'sdfsdf', {
    maxAge: 9000,
    httpOnly: true,
  })

  res.send('cookie has been set')
})

app.get("/get-cookie", (req, res) => {
  // const usernmae = req.cookies.username
  const usernmae = req.cookies.username
  res.send(usernmae);
});



mongoose.connect("mongodb://127.0.0.1:27017/user-crud")
    .then(()=> console.log('connected'));

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')


app.use(session({
    secret: 'd34243212s',
    resave: false,
    saveUninitialized:false
}))

let checkLogin = (req, res, next) => {
    if (req.session.user) {
        next()
    }else{
 res.redirect("/login");
    }

   
}


app.get('/',checkLogin, (req, res) => {
    res.send(`<h1>Home Page </h1> <p>Hello, ${req.session.user}</p>`)

})

app.get('/login',csurfProtection, (req,res) => {
    res.render('login',{error:null,csrfToken:req.csrfToken})
})

app.post("/login",csurfProtection,async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ username: email });

    if (!user) return res.render('login', { error: 'User Not found' })
    
    const isMatch = await bcrypt.compare(password, user.userpassword);

    if (!isMatch) return res.render("login", { error: "Invalid Password " })
    
    req.session.user = user.username

    res.redirect('/')
    
});


app.get("/logout",checkLogin, (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});


app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ username: email, userpassword: hashPassword });

    res.redirect("/login"); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});







app.listen(3000, () => {
    console.log('work')
})