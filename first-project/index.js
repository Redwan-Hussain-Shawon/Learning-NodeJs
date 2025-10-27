const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('hello port 3000')
})

app.get('/', (req, res) => {
    res.send('Wellcome ')
})

app.get("/about", (req, res) => {
  res.send("about ");
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/check', (req, res) => {
      console.log(req.body);
    res.send(req.body);
})




app.get("/user/:userid/book/:bookid", (req, res) => {
  const { userid, bookid } = req.params;

  const books = [
    { id: 1, title: "Book A", price: 250 },
    { id: 2, title: "Book B", price: 300 },
  ];

  const users = [
    { id: 1, name: "Redwan" },
    { id: 2, name: "Shawon" },
  ];

  res.json({
    success: true,
    message: "Multiple data arrays sent successfully",
    data: {
      userId: userid,
      bookId: bookid,
      users,
      books,
    },
  });
});


