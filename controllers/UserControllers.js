const User = require('../model/user');
exports.getUsers = async (req, res, next) => {
    const user = await User.findAll();
    //console.log(user.every(food => food instanceof User));
    res.send(user);
};
