import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup, Form, Modal, Alert, Row, Col } from 'react-bootstrap';

export default function TasksPage({
  tasks,
  currentUser,
  updateTaskStatus,
  updateTaskText,
  deleteTask,
  handleLogout,
  addNewTask
}) {
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [isTaskPublic, setIsTaskPublic] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setIsTaskPublic(editingTask.isPublic);
    }
  }, [editingTask]);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSaveTask = () => {
    if (editedTitle && editedDescription) {
      updateTaskText(editingTask.id, editedTitle, editedDescription, isTaskPublic);
      setEditingTask(null);
      setError('')
    } else {
      setError('Please fill all the fields.')
    }
  };

  const handleDeleteTask = () => {
    deleteTask(taskToDelete.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    handleLogout();
    setShowLogoutConfirm(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleAddTaskClick = () => {
    setShowAddTaskModal(true);
    setError('')
  };

  const handleAddNewTask = () => {
    if (newTaskTitle && newTaskDescription) {
      addNewTask({ title: newTaskTitle, description: newTaskDescription, status: false, isPublic: isTaskPublic });
      setNewTaskTitle('');
      setError('')
      setNewTaskDescription('');
      setIsTaskPublic(false);
      setShowAddTaskModal(false);
    } else {
      setError('Please fill all the fields.')
    }
  };

  const handleCancelAddTask = () => {
    setShowAddTaskModal(false);
  };

  return (
    <div>
      <div>
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
          <Button variant="danger" onClick={handleLogoutClick}>
            Logout
          </Button>
        </div>
        <h2>Task Manager</h2>
      </div>

      <Button className="primary-btn mb-3" onClick={handleAddTaskClick}>
        Add New Task
      </Button>
      {tasks.length > 0 ? (
        <ListGroup>
          {tasks.map(task => (
            <ListGroup.Item key={task.id}>
              <Card>
                <Card.Body>
                  {editingTask && editingTask.id === task.id ? (
                    <div>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form.Group className="mt-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Check
                          type="checkbox"
                          label="Visible to all users"
                          checked={isTaskPublic}
                          onChange={(e) => setIsTaskPublic(e.target.checked)}
                        />
                      </Form.Group>

                      <Button className="primary-btn mt-3" onClick={handleSaveTask}>
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setEditingTask(null)}
                        className="mt-3 ml-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Card.Title>{task.title}</Card.Title>
                      <Card.Text>{task.description}</Card.Text>
                      <Button
                        className={task.status ? 'primary-btn' : 'secondary-btn'}
                        onClick={() => updateTaskStatus(task)}
                      >
                        {task.status ? 'Mark as Pending' : 'Mark as Completed'}
                      </Button>

                      {currentUser.role === 'admin' && (
                        <>
                          <Button
                            className="primary-btn ml-2"
                            onClick={() => handleEditTask(task)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              setTaskToDelete(task);
                              setShowDeleteConfirm(true);
                            }}
                            className="ml-2"
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Row className="justify-content-center mt-5">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card className="text-center card-shadow">
              <Card.Body>
                <Card.Title>No tasks yet... 🎉</Card.Title>
                <Card.Text>Start by adding a new task to stay organized!</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Modal show={showAddTaskModal} onHide={handleCancelAddTask}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Enter task description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Visible to all users"
                checked={isTaskPublic}
                onChange={(e) => setIsTaskPublic(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancelAddTask}>
            Cancel
          </Button>
          <Button className="primary-btn" onClick={handleAddNewTask}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteConfirm} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this task? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteTask}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showLogoutConfirm} onHide={handleCancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out? You will lose any unsaved progress.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelLogout}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogoutConfirm}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
