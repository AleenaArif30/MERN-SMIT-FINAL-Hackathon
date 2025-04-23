

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice.mjs';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Products = () => {
	const dispatch = useDispatch(); // ✅ FIXED: moved to top
	const navigate = useNavigate(); // ✅ initialize navigate


	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(`${apiUrl}/products`);
				setProducts(Array.isArray(response?.data.products) ? response.data.products : []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	if (loading) {
		return (
			<Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
				<Spinner animation="border" variant="primary" />
			</Container>
		);
	}

	if (error) {
		return (
			<Container className="py-4">
				<Alert variant="danger">Error loading products: {error}</Alert>
			</Container>
		);
	}

	console.log("id", products._id)


	return (
		<Container className="py-5">
			{products.length > 0 ? (
				<Row xs={1} sm={2} lg={3} xl={4} className="g-4">
					{products.map((product) => (
						<Col key={product._id}>
							<Card className="h-100 shadow-sm">
								<div style={{ height: '250px', overflow: 'hidden' }}>
									<Card.Img
										variant="top"
										src={product.image || '/placeholder-product.jpg'}
										alt={product.name}
										style={{ objectFit: 'cover', height: '100%', width: '100%' }}
									/>
								</div>
								<Card.Body>
									<Card.Title>{product.title}</Card.Title>
									<Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
										{product.description?.substring(0, 60)}...
									</Card.Text>
									<h5 className="fw-bold">${product.price.toFixed(2)}</h5>
								</Card.Body>
								<Card.Footer className="bg-white border-top-0">
									<Button
										variant="primary"
										className="w-100"
										onClick={() => {
											console.log("Product being added:", product);

											dispatch(addToCart(product));
											navigate('/cart');
										}}
									>
										Add to Cart
									</Button>


								</Card.Footer>
							</Card>
						</Col>
					))}
				</Row>
			) : (
				<div className="text-center py-5">
					<div className="text-muted mb-3" style={{ fontSize: '3rem' }}>🛒</div>
					<h4>No products available</h4>
					<p className="text-muted">Check back later for new products.</p>
				</div>
			)}
		</Container>
	);
};

export default Products;
