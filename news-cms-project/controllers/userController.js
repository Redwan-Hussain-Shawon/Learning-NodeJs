const userModel = require("../models/User");



const loginPage = (req, res) => { 
    res.render('admin/login', {
        layout:false
    })
};
const adminLogin = (req, res) => { 
  
};
const logout = (req, res) => { };

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
    deleteUser
}