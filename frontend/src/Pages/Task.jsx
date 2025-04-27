


// import React, { useEffect, useState } from "react";
// import { Container, Card, Row, Col, Button, Form, Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { setTasks, setTaskToEdit, updateTask } from "../store/taskSlice.mjs";
// import { useNavigate } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const Task = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const tasks = useSelector((state) => state.tasks.tasks);
//   const taskToEdit = useSelector((state) => state.tasks.taskToEdit);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("To Do");

//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${API_BASE_URL}/tasks`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       dispatch(setTasks(data));
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const createTask = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/tasks`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title, description, status }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setTitle("");
//         setDescription("");
//         setStatus("To Do");
//         fetchTasks();
//       } else {
//         console.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error creating task:", error);
//     }
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       fetchTasks();
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleEdit = (task) => {
//     dispatch(setTaskToEdit(task));
//     setTitle(task.title);
//     setDescription(task.description);
//     setStatus(task.status);
//   };

//   const handleUpdateTask = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${API_BASE_URL}/tasks/${taskToEdit._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title, description, status }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         dispatch(updateTask(data));
//         setTitle("");
//         setDescription("");
//         setStatus("To Do");
//         dispatch(setTaskToEdit(null));
//         fetchTasks();
//       } else {
//         console.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Filter tasks by status
//   const todoTasks = tasks.filter((task) => task.status === "To Do");
//   const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
//   const doneTasks = tasks.filter((task) => task.status === "Done");

//   return (
//     <Container className="py-4">
//       <h2 className="text-center mb-4 text-warning">Task Management</h2>

//       {/* Task Create Form */}
//       <Card className="mb-5">
//         <Card.Body>
//           <h5 className="card-title text-center text-warning">Add New Task</h5>
//           <Form onSubmit={createTask}>
//             <Row>
//               <Col md={4}>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Task Title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                   className="mb-3"
//                 />
//               </Col>
//               <Col md={4}>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Task Description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                   className="mb-3"
//                 />
//               </Col>
//               <Col md={2}>
//                 <Form.Select
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   required
//                   className="mb-3"
//                 >
//                   <option value="To Do">To Do</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Done">Done</option>
//                 </Form.Select>
//               </Col>
//               <Col md={2}>
//                 <Button type="submit" variant="warning" block="true" className="mb-3">
//                   Add Task
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </Card.Body>
//       </Card>

//       {/* 3 Columns for Tasks */}
//       <Row>
//         {/* To Do Column */}
//         <Col md={4}>
//           <h4 className="text-center text-primary">To Do</h4>
//           {todoTasks.length ? todoTasks.map((task) => (
//             <Card key={task._id} className="mb-3">
//               <Card.Body>
//                 <Card.Title>{task.title}</Card.Title>
//                 <Card.Text>{task.description}</Card.Text>
//                 <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(task)}>Edit</Button>
//                 <Button variant="danger" size="sm" onClick={() => deleteTask(task._id)}>Delete</Button>
//               </Card.Body>
//             </Card>
//           )) : <p className="text-center">No tasks</p>}
//         </Col>

//         {/* In Progress Column */}
//         <Col md={4}>
//           <h4 className="text-center text-info">In Progress</h4>
//           {inProgressTasks.length ? inProgressTasks.map((task) => (
//             <Card key={task._id} className="mb-3">
//               <Card.Body>
//                 <Card.Title>{task.title}</Card.Title>
//                 <Card.Text>{task.description}</Card.Text>
//                 <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(task)}>Edit</Button>
//                 <Button variant="danger" size="sm" onClick={() => deleteTask(task._id)}>Delete</Button>
//               </Card.Body>
//             </Card>
//           )) : <p className="text-center">No tasks</p>}
//         </Col>

//         {/* Done Column */}
//         <Col md={4}>
//           <h4 className="text-center text-success">Done</h4>
//           {doneTasks.length ? doneTasks.map((task) => (
//             <Card key={task._id} className="mb-3">
//               <Card.Body>
//                 <Card.Title>{task.title}</Card.Title>
//                 <Card.Text>{task.description}</Card.Text>
//                 <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(task)}>Edit</Button>
//                 <Button variant="danger" size="sm" onClick={() => deleteTask(task._id)}>Delete</Button>
//               </Card.Body>
//             </Card>
//           )) : <p className="text-center">No tasks</p>}
//         </Col>
//       </Row>

//       {/* Modal for Editing Task */}
//       {taskToEdit && (
//         <Modal show={true} onHide={() => dispatch(setTaskToEdit(null))}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Task</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Control
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="mt-2"
//               />
//               <Form.Select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 required
//                 className="mt-2"
//               >
//                 <option value="To Do">To Do</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Done">Done</option>
//               </Form.Select>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => dispatch(setTaskToEdit(null))}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleUpdateTask}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </Container>
//   );
// };

// export default Task;


import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Form, Modal, Dropdown } from "react-bootstrap"; // <-- Dropdown import kiya
import { useDispatch, useSelector } from "react-redux";
import { setTasks, setTaskToEdit, updateTask } from "../store/taskSlice.mjs";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Task = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskToEdit = useSelector((state) => state.tasks.taskToEdit);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const [showMoveDropdownId, setShowMoveDropdownId] = useState(null); // <-- Move dropdown ke liye state

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

  const createTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status }),
      });
      const data = await response.json();
      if (response.ok) {
        setTitle("");
        setDescription("");
        setStatus("To Do");
        fetchTasks();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

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

  const handleEdit = (task) => {
    dispatch(setTaskToEdit(task));
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  };

  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/tasks/${taskToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updateTask(data));
        setTitle("");
        setDescription("");
        setStatus("To Do");
        dispatch(setTaskToEdit(null));
        fetchTasks();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleMoveTask = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updateTask(data));
        fetchTasks();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks by status
  const todoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  const renderTaskCard = (task) => (
    <Card key={task._id} className="mb-3">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.description}</Card.Text>
        <div className="d-flex justify-content-between">
          <div>
            <Button
              variant="warning"
              size="sm"
              className="me-2"
              onClick={() => handleEdit(task)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </Button>
          </div>
          <div>
            <Dropdown show={showMoveDropdownId === task._id} onToggle={(isOpen) => setShowMoveDropdownId(isOpen ? task._id : null)}>
              <Dropdown.Toggle variant="secondary" size="sm">
                Move
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleMoveTask(task._id, "To Do")}>To Do</Dropdown.Item>
                <Dropdown.Item onClick={() => handleMoveTask(task._id, "In Progress")}>In Progress</Dropdown.Item>
                <Dropdown.Item onClick={() => handleMoveTask(task._id, "Done")}>Done</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4 text-warning">Task Management</h2>

      {/* Add Task Form Code Yahan Same Rahega */}

      {/* 3 Columns for Tasks */}
      <Row>
        <Col md={4}>
          <h4 className="text-center text-primary">To Do</h4>
          {todoTasks.length ? todoTasks.map(renderTaskCard) : <p className="text-center">No tasks</p>}
        </Col>

        <Col md={4}>
          <h4 className="text-center text-info">In Progress</h4>
          {inProgressTasks.length ? inProgressTasks.map(renderTaskCard) : <p className="text-center">No tasks</p>}
        </Col>

        <Col md={4}>
          <h4 className="text-center text-success">Done</h4>
          {doneTasks.length ? doneTasks.map(renderTaskCard) : <p className="text-center">No tasks</p>}
        </Col>
      </Row>

      {/* Modal for Editing Task (Same as Tumne diya tha) */}
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
              {/* <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="mt-2"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Form.Select> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(setTaskToEdit(null))}>
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

export default Task;
