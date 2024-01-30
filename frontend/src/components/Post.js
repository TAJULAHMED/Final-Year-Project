import React from "react";
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Post({ post }) {
    const replyCount = post.num_replies
    console.log(post)
    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/post/${post.id}`);
    };

    return (
        <Card onClick={handleClick} className="mb-3" style={{ cursor: 'pointer' }}>
            <Card.Body>
                <Card.Title>{post ? post.title : 'Loading...'}</Card.Title>
                <Card.Text>
                    {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}


export default Post;
