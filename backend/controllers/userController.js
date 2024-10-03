// Sample controller functions
const getUsers = (req, res) => {
    res.send('Get all users');
};

const addUser = (req, res) => {
    res.send('User added');
};

module.exports = {
    getUsers,
    addUser,
};
