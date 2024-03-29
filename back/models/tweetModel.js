const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    author_email: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        max: 140,
    },
    media: {
        type: String,
    },
    poll_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    retweet_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    hashtags: [{
        type: String,
    }],
    num_comments: {
        type: Number,
        default: 0,
    },
    liked_by:[{
        type: mongoose.Schema.Types.ObjectId,
    }],
    num_bookmarks: {
        type: Number,
        default: 0,
    },
    num_retweets: {
        type: Number,
        default: 0,
    },
    num_views: {
        type: Number,
        default: 0,
    },
}, { timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 },
});

module.exports = mongoose.model('Tweet', tweetSchema);
