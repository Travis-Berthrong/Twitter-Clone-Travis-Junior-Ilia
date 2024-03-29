const express = require('express');
const router = express.Router();

const followerServices = require('../services/followers.services');

router.get('/followers/:user_email', followerServices.getFollowers);
router.get('/following/:user_email', followerServices.getFollowing);
router.post('/follow/:followed_user_id', followerServices.followUser);
router.delete('/unfollow/:followed_user_id', followerServices.unfollowUser);

module.exports = router;