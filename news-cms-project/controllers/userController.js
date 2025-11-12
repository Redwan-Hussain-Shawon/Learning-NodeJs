const userModel = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();


const loginPage = (req, res) => { 
    res.render('admin/login', {
        layout:false
    })
};
const adminLogin = async (req, res) => { 
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username: username });
        if (!user) {
          return res.status(401).json({ message: "Invalid Credentials username" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid Credentials password" });
        }
        const jwtData = {
          user_id: user._id,
          role: user.role,
          fullname: user.fullname,
        };
        const token = jwt.sign(jwtData, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.redirect("/admin/users");
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
   }
    
};




const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect('/admin')
};
 

const adminDashboard = (req, res) => {
    res.render('admin/dashboard', {
        fullname: req.fullname,
        role: req.role
    })   
}

const allUsers = async (req, res) => {
    const users = await userModel.find();
     res.render("admin/users/index",{ users });
 };
const addUserPage = (req, res) => { 
    res.render("admin/users/create");
};        
const addUser = async (req, res) => {
    await userModel.create(req.body)
    res.redirect("/admin/users");
 };


const updateUserPage = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.render("admin/users/edit", { user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

};
   

    const updateUser = async (req, res) => {
        const id = req.params.id;
        const { fullname, password, role } = req.body;
        try {
            const user = await userModel.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            user.fullname = fullname || user.fullname;

            if (password) {
                user.password = password;
            }

            user.role = role || user.role
            await user.save();
            res.redirect("/admin/users");
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
  

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ status: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  loginPage,
  adminLogin,
  logout,
  allUsers,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
  adminDashboard,
};