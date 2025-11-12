const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();


const isLogin =async (req, res, next) => {
        try {
          const token = req.cookies.token;
          if (!token) return res.redirect("/admin");

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.role = decoded.role;
            req.fullname = decoded.fullname;   
          next();
        } catch (err) {
          console.log(err);
          return res.status(401).json({ message: "Unauthorized" });
        }
}

module.exports = isLogin;