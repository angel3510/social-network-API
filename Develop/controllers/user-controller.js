const { User } = require('../models');

const userController = {
      getAllUser(req, res) {
        User.find({})
          .populate({
            path: 'friends',
            select: '-__v'
        })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
};

module.exports = userController;