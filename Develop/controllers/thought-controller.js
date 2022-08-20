const { Thought, User } = require('../models');

const thoughtController = {
      getAllThought(req, res) {
        Thought.find({})
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
      getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thoughts found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    createThought({ params, body }, res) {
            Thought.create(body)
                .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thought: _id } },
                    { new: true }
                );
                })
                .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
                })
                .catch(err => res.json(err));
        },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
      },
};

module.exports = thoughtController;