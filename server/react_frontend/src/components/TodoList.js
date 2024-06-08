import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, Table, Container, Card, Header, Icon, Modal } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

function TodoList() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [open, setOpen] = useState(false);

  const addNewTask = async () => {
    try {
      let formField = new FormData();
      formField.append('task', task);
      formField.append('description', description);
      
      const response = await axios.post('http://localhost:8000/api/', formField);
      console.log(response.data);
      
      fetchItems();

      setTask("");
      setDescription("");
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/");
      console.log(result.data);
      setItems(result.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/${id}/`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (id, task, description) => {
    setSelectedItemId(id);
    setEditTask(task);
    setEditDescription(description);
    setOpen(true);
  };

  const updateItem = async () => {
    try {
      let formField = new FormData();
      formField.append('task', editTask);
      formField.append('description', editDescription);
      
      const response = await axios.put(`http://localhost:8000/api/${selectedItemId}/`, formField);
      console.log(response.data);
      
      fetchItems();

      setOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Container style={{ marginTop: '2em' }}>
      <Card fluid>
        <Card.Content>
          <Header as='h2'>Add New Task</Header>
          <Form>
            <Form.Field style={{ marginBottom: '1em' }}>
              <label>Task</label>
              <input 
                placeholder='Enter Your Task Here'
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Form.Field>
            <Form.Field style={{ marginBottom: '1em' }}>
              <label>Task Details</label>
              <input 
                placeholder='Enter Your Task Description Here'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Field>
            <Button 
              primary 
              onClick={addNewTask} 
              style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '0.25em', padding: '0.5em 1em' }}
            >
              Add Task
            </Button>
          </Form>
        </Card.Content>
      </Card>

      {items.length > 0 && (
        <Card fluid>
          <Card.Content>
            <Header as='h2'>Task List</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>S.NO</Table.HeaderCell>
                  <Table.HeaderCell>Task</Table.HeaderCell>
                  <Table.HeaderCell>Details</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {items.map((item, index) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.task}</Table.Cell>
                    <Table.Cell>{item.description}</Table.Cell>
                    <Table.Cell>
                      <Button 
                        color='yellow' 
                        onClick={() => handleEdit(item.id, item.task, item.description)}
                        style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '0.25em', padding: '0.5em 1em' }}
                      >
                        <Icon name='edit' style={{ color: 'blue' }}/> Edit
                      </Button>
                      <Button 
                        color='red' 
                        onClick={() => deleteItem(item.id)}
                        style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '0.25em', padding: '0.5em 1em' }}
                      >
                        <Icon name='delete' style={{ color: 'red' }}/> Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>
      )}

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ textAlign: 'center' }}
      >
        <Modal.Header>Edit Task</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field style={{ marginBottom: '1em' }}>
              <label>Task</label>
              <input 
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
              />
            </Form.Field>
            <Form.Field style={{ marginBottom: '1em' }}>
              <label>Task Details</label>
              <input 
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button 
            color='black' 
            onClick={() => setOpen(false)}
            style={{ backgroundColor: '#000000', color: 'white', border: 'none', borderRadius: '0.25em', padding: '0.5em 1em' }}
          >
            Cancel
          </Button>
          <Button
            content="Update"
            labelPosition='right'
            icon='checkmark'
            onClick={updateItem}
            positive
            style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '0.25em', padding: '0.5em 1em' }}
          />
        </Modal.Actions>
      </Modal>
    </Container>
  );
}

export default TodoList;
