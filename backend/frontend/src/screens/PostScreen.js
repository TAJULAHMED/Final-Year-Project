import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, ListGroup } from 'react-bootstrap';

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} ${formattedTime}`;
}

function PostScreen() {
    const [post, setPost] = useState({});
    const [replies, setReplies] = useState([]);
    const [newReplyContent, setNewReplyContent] = useState('');
    const { postId } = useParams();
    const userInfo = JSON.parse(localStorage.getItem('accessToken'));
    const navigate = useNavigate();

    const getStyle = index => ({
        backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e2e3e5'
    });

    useEffect(() => {
        fetchPostAndReplies();
    }, [postId]);

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }, 
        withCredentials: true
    };

    const fetchPostAndReplies = async () => {
        try {
            // Fetch post details
            const postResponse = await axios.get(`http://localhost:8000/api/forum/${postId}/`, config);
            setPost(postResponse.data);

            // Fetch replies for the post
            const repliesResponse = await axios.get(`http://localhost:8000/api/forum/${postId}/replies/`, config);
            setReplies(repliesResponse.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8000/api/forum/${postId}/replies/`, { content: newReplyContent }, config);
            setNewReplyContent('');
            fetchPostAndReplies(); 
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Button variant="primary" onClick={() => navigate(-1)}>Back to Forum</Button>
            <Card className="mt-3" style={{ backgroundColor: '#f8f9fa' }}>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                </Card.Body>
            </Card>

            <h3 className="mt-4">Replies</h3>
            <ListGroup>
                {replies.map((reply, index) => (
                    <ListGroup.Item key={reply.id} style={getStyle(index)}>
                        {reply.content}
                        <br />
                        <small className="text-muted">Updated at: {formatTimestamp(reply.updated_at)}</small>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Form onSubmit={handleReplySubmit} className="mt-4">
                <Form.Group controlId="replyContent">
                    <Form.Label>Write a reply</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={newReplyContent}
                        onChange={(e) => setNewReplyContent(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-3'>Submit Reply</Button>
            </Form>
        </Container>
    );
}

export default PostScreen;
