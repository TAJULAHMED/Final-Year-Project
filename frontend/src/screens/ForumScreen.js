import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';


function ForumScreen() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const userInfo = JSON.parse(localStorage.getItem('accessToken'));
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.access}`
                }
            };
            const response = await axios.get('http://localhost:8000/api/forum/', config);
            setPosts(response.data);
            console.log(posts)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNewPostChange = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            };
            const response = await axios.post('http://localhost:8000/api/forum/', newPost, config);
            setPosts([...posts, response.data]);
            setNewPost({ title: '', content: '' }); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container>
            <h1 className='mt-4'>Submit a post</h1>
            <Form onSubmit={handlePostSubmit}>
                <Form.Group className="mb-3" controlId="formPostTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        value={newPost.title}
                        onChange={handleNewPostChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPostContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter contents of post"
                        name="content"
                        value={newPost.content}
                        onChange={handleNewPostChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='mb-4'>
                    Submit Post
                </Button>
            </Form>

            <h1 className='mt-4'>Forum Posts</h1>
            <Row>
                {posts.map(post => (
                    <Col key={post.id} sm={12} md={12} lg={12} xl={12}>
                        <Post post={post} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ForumScreen;
