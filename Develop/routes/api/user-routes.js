const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// /api/user
router
    .route('/')
    .get(getAllUser)
    .post(createUser)

router 
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)

router
    .route('/:userId/friends/:friendId')
    .delete(removeFriend)

module.exports = router;