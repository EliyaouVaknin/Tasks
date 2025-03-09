import React, { useState } from 'react';
import { Card, Button, ListGroup, Form, Modal } from 'react-bootstrap';

export default function TasksPage({
  tasks,
  currentUser,
  updateTaskStatus,
  updateTaskText,
  deleteTask,
  handleLogout
}) {
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSaveTask = () => {
    if (editedTitle && editedDescription) {
      updateTaskText(editingTask.id, editedTitle, editedDescription);
      setEditingTask(null); // Clear editing state
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

  return (
    <div>
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <Button variant="danger" onClick={handleLogoutClick}>
          Logout
        </Button>
      </div>

      <h2>Tasks</h2>
      <ListGroup>
        {tasks.map(task => (
          <ListGroup.Item key={task.id}>
            <Card>
              <Card.Body>
                {editingTask && editingTask.id === task.id ? (
                  <div>
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
                    <Button variant="primary" onClick={handleSaveTask} className="mt-3">
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
                      variant={task.completed ? 'success' : 'warning'}
                      onClick={() => updateTaskStatus(task.id, !task.completed)}
                    >
                      {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                    </Button>

                    {currentUser.role === 'admin' && (
                      <>
                        <Button
                          variant="warning"
                          onClick={() => handleEditTask(task)}
                          className="ml-2"
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
