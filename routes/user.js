const router = require('express').Router();

const { validateUpdateProfile } = require('../middlewares/validate');

const {
  getUserById, updateProfile,
} = require('../controllers/user');

router.get('/users/me', getUserById);
router.patch('/users/me', validateUpdateProfile, updateProfile);

module.exports = router;
