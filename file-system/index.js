const express = require('express')
const app = express()
const fs = require('fs')


app.get('/write-file', (req, res) => {
    fs.writeFile('./public/output.txt', 'This is a test message', (err) => {
        if (err) {
            return res.status(500).send('Failed to write file')
        }
        res.send('File written successfully');
    })
})

app.get('/read-file', (req, res) => {
     fs.readFile("./public/output.txt",(err, data) => {
       if (err) {
         return res.status(500).send("Failed to read file");
         }
         res.setHeader('Content-Type','text/plain')
       res.send(data );
     });
})


app.get("/append-file", (req, res) => {
  fs.appendFile("./public/output.txt", "\nNew Line appended", (err) => {
    if (err) {
      return res.status(500).send("Failed to append file");
    }
    res.send('Content Appended');
  });
});


app.get("/delete-file", (req, res) => {
  fs.unlink("./public/output.txt", (err) => {
    if (err) {
      return res.status(500).send("Failed to Delete File");
    }
    res.send("File Delete");
  });
});


app.get("/read-folder", (req, res) => {
  fs.readdir("./public", (err,files) => {
      if (err) {
        console.log(err)
          return;
      }
      console.log(files)
  });
});

app.get("/create-folder", (req, res) => {
  fs.mkdir("./public/myFolder", (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Folder created successfully');
  });
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
})