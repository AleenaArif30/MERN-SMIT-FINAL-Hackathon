// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../store/authSlice';
// const apiUrl = import.meta.env.VITE_API_BASE_URL;

// const LoginPage = () => {
// 	const [formData, setFormData] = useState({
// 		email: '',
// 		password: '',
// 	});
// 	const dispatch = useDispatch()

// 	const [loading, setLoading] = useState(false);
// 	const [showPassword, setShowPassword] = useState(false);
// 	const navigate = useNavigate();

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData((prevData) => ({
// 			...prevData,
// 			[name]: value,
// 		}));
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setLoading(true);
// 		console.log(formData);

// 		try {
// 			const response = await fetch(`${apiUrl}/auth/user/login`, {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify(formData),
// 			});

// 			const data = await response.json();
// 			setLoading(false);
// 			if (response.ok) {
// 				localStorage.setItem("token",data.token)
// 				localStorage.setItem("userId",data._id)
// 				dispatch(loginSuccess({
// 					token:data.token,
// 					userId:data.userId
// 				}))
// 				toast.success(data.message);

// 				navigate('/');
// 			} else {
// 				toast.error(data.message || 'Invalid email or password');
// 			}
// 		} catch (error) {
// 			setLoading(false);
// 			console.error('Error:', error);
// 			toast.error(error.message || 'An error occurred while logging in');
// 		}
// 	};

// 	return (
// 		<div className='flex justify-center items-center min-h-screen  px-4'>
// 			<div className='relative flex flex-col rounded-xl bg-white shadow-lg p-6 w-full max-w-md'>
// 				<h2 className='text-2xl font-semibold text-gray-800 text-center'>Login</h2>
// 				<p className='text-gray-500 text-center mb-6'>Welcome back! Enter your details to sign in.</p>
// 				<form className='space-y-4' onSubmit={handleSubmit}>
// 					<div>
// 						<label className='block text-sm font-medium text-gray-700'>Email</label>
// 						<input
// 							onChange={handleChange}
// 							name='email'
// 							type='email'
// 							className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
// 							placeholder='Your Email'
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<label className='block text-sm font-medium text-gray-700'>Password</label>
// 						<div className='relative'>
// 							<input
// 								onChange={handleChange}
// 								name='password'
// 								type={showPassword ? 'text' : 'password'}
// 								className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10'
// 								placeholder='Your Password'
// 								required
// 							/>
// 							<button
// 								type='button'
// 								className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none'
// 								onClick={() => setShowPassword(!showPassword)}
// 							>
// 								{showPassword ? <FaEyeSlash /> : <FaEye />}
// 							</button>
// 						</div>
// 					</div>



// 					<button
// 						className='w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-md transition-all duration-300 disabled:bg-gray-500'
// 						type='submit'
// 						disabled={loading}
// 					>
// 						{loading ? 'Logging In...' : 'Log In'}
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default LoginPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    try {
      const response = await fetch(`${apiUrl}/auth/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data._id);
        dispatch(
          loginSuccess({
            token: data.token,
            userId: data.userId,
          })
        );
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message || "Invalid email or password");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error(error.message || "An error occurred while logging in");
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient p-3">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-lg rounded-lg">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <p className="text-center text-muted mb-4">
                Welcome back! Enter your details to sign in.
              </p>
              <Form onSubmit={handleSubmit} className="space-y-4">
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      onChange={handleChange}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your Password"
                      required
                    />
                    <button
                      type="button"
                      className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 my-3"
                  variant="dark"
                  disabled={loading}
                >
                  {loading ? "Logging In..." : "Log In"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p className="text-muted">
                  Don't have an account?{" "}
                  <span
                    onClick={() => navigate("/signup")}
                    className="text-primary cursor-pointer"
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
