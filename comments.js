// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express application
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Object to store comments
const commentsByPostId = {};

// Create route to get comments by post id
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create route to post a comment
app.post('/posts/:id/comments', (req, res) => {
    // Create a random id for the comment
    const commentId = randomBytes(4).toString('hex');

    // Get the post id
    const { id } = req.params;

    // Get the comment content
    const { content } = req.body;

    // Get the comments for the post id
    const comments = commentsByPostId[id] || [];

    // Add the new comment to the comments list
    comments.push({ id: commentId, content, status: 'pending' });

    // Update the comments list for the post id
    commentsByPostId[id] = comments;

    // Send the new comment
    res.status(201).send(comments);
});

// Create route to handle events from the event bus
app.post('/events', (req, res) => {
    // Get the event type
    const { type } = req.body;

    // Check if it is a comment moderation event
    if (type === 'CommentModerated') {
        // Get the comment data
        const { id, postId, status, content } = req.body.data;

        // Get the comments list for the post id
        const comments = commentsByPostId[postId];

        // Get the comment from the comments list
        const comment = comments.find(comment => {
            return comment.id === id;
        });

        // Update the comment status
        comment.status = status;

        // Send the event data to the event bus
        axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        });
    }

    // Send a response to the event bus
    res.send({});
});

// Listen on port 4001