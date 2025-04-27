import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, Row, Col, Modal, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, setTaskToEdit, updateTask } from "../store/taskSlice.mjs";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskToEdit = useSelector((state) => state.tasks.taskToEdit);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do"); // Default status

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      dispatch(setTasks(data));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Create Task
  const createTask = async (e) => {
    e.preventDefault();

    // Check if the user is logged in (if token is present in localStorage)
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");  // Redirect to login page if user is not logged in
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status }), // Include status
      });
      const data = await response.json();
      if (response.ok) {
        setTitle("");
        setDescription("");
        setStatus("To Do"); // Reset status to default
        fetchTasks();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle Edit (Set task to edit in Redux store)
  const handleEdit = (task) => {
    dispatch(setTaskToEdit(task)); // Set the task to edit in the Redux store
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status); // Set status to the task's current status
  };

  // Handle Task Update
  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/tasks/${taskToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status }), // Include status
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updateTask(data)); // Update the task in the Redux store
        setTitle("");
        setDescription("");
        setStatus("To Do"); // Reset status to default
        dispatch(setTaskToEdit(null)); // Clear the task to edit
        fetchTasks(); // Fetch updated tasks
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4 text-warning">Task Management</h2>

      {/* Task Create Form inside Card */}
      <Card className="mb-5">
        <Card.Body>
          <h5 className="card-title text-center text-warning">Add New Task</h5>
          <Form onSubmit={createTask}>
            <Row>
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Enter Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mb-3"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Enter Task Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mb-3"
                />
              </Col>
              <Col md={2}>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="mb-3"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Button type="submit" variant="warning" block="true" className="mb-3">
                  Add Task
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Tasks Table */}
      <Table striped bordered hover responsive className="text-center">
        <thead style={{ backgroundColor: "#333", color: "white" }}>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.assignedTo?.name || "N/A"}</td>
                <td>
                  {/* Edit Button */}
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(task)} // Edit action
                  >
                    Edit
                  </Button>
                  {/* Delete Button */}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteTask(task._id)} // Delete action
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Tasks Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for Editing Task */}
      {taskToEdit && (
        <Modal show={true} onHide={() => dispatch(setTaskToEdit(null))}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2"
              />
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="mt-2"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Form.Select>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => dispatch(setTaskToEdit(null))} // Close modal
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateTask}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Products;

