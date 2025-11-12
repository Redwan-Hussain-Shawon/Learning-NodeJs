const isAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
        return  res.redirect('/admin/dashboard');;
    }
    next();
}

module.exports = isAdmin;