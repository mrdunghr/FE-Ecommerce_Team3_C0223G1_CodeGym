import CustomerHeader from "../../../components/customer/header";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "@mui/material";
import {ListGroup, ListGroupItem} from "react-bootstrap";

export function Reviews() {
    const [reviews,setReviews] = useState([]);
    useEffect(() => {
        axios.get('/api/v1/reviews/'+ productId)
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    return (
        <>
            <Card>
            <div>Product Reviews</div>
            <ListGroup variant="flush">
                {reviews.map((review, index) => (
                    <ListGroupItem key={index}>
                        <div>{review.name}</div>
                        <div>Rating: {review.rating}</div>
                        <div>{review.review}</div>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Card>

        </>
    )

}