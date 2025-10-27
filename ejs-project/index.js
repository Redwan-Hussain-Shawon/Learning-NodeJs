import express from 'express'
const app = express()

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.send('Home ')
})

app.get('/about', (req, res) => {
    const users = [
      {
        id: 1,
        name: "Redwan Hussain Shawon",
        email: "redwan@example.com",
        age: 20,
        country: "Bangladesh",
      },
      {
        id: 2,
        name: "Arafat Rahman",
        email: "arafat@example.com",
        age: 22,
        country: "Bangladesh",
      },
      {
        id: 3,
        name: "Nusrat Jahan",
        email: "nusrat@example.com",
        age: 19,
        country: "Bangladesh",
      },
    ];

    res.render('about',{users});
})

app.listen(3000, () => {
    console.log('server Work 3000')
})