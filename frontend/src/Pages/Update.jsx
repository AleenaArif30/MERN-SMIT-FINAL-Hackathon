
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Update = () => {
//   const [userData, setUserData] = useState({ name: "", email: "" });
//   const [userId, setUserId] = useState(null); // ✅ Added userId state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("No authentication token found");
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:5000/api/auth/user/me", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setUserId(data.user._id); // ✅ Save userId here
//           setUserData({ name: data.user.name, email: data.user.email });
//         } else {
//           toast.error(data.message || "Failed to fetch user details");
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         toast.error("An error occurred while fetching user details");
//         navigate("/login");
//       }
//     };

//     fetchUserDetails();
//   }, [navigate]);

//   const handleUpdate = async () => {
//     if (!userId) {
//       toast.error("User ID is missing");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success("Profile updated successfully");
//         navigate("/profile");
//       } else {
//         toast.error(data.message || "Failed to update profile");
//       }
//     } catch (error) {
//       console.error("Update Error:", error);
//       toast.error("An error occurred while updating user");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             className="mt-1 p-2 w-full bg-gray-50 rounded-md border"
//             value={userData.name}
//             onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             className="mt-1 p-2 w-full bg-gray-50 rounded-md border"
//             value={userData.email}
//             onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//           />
//         </div>
//         <button
//           className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-all duration-300 mt-4"
//           onClick={handleUpdate}
//         >
//           Save Changes
//         </button>
//         <button
//           className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-md transition-all duration-300 mt-2"
//           onClick={() => navigate("/profile")}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Update;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";

const Update = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authentication token found");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserId(data.user._id);
          setUserData({ name: data.user.name, email: data.user.email });
        } else {
          toast.error(data.message || "Failed to fetch user details");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("An error occurred while fetching user details");
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleUpdate = async () => {
    if (!userId) {
      toast.error("User ID is missing");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully");
        navigate("/profile");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("An error occurred while updating user");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={5}>
          <Card className="shadow">
            <Card.Body>
              <h4 className="mb-4">Edit Profile</h4>
              <Form>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    placeholder="Enter your email"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="success"
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/profile")}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Update;
