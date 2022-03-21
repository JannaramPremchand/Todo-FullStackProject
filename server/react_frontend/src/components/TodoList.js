import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";

function TodoList() {
    //for adding items
    const [task, setTask] = useState(null)
    const [description, setDescription] = useState(null)

    const addNewTask = async () => {
        let formField = new FormData()
        formField.append('task',task)
        formField.append('description',description)
        
        await axios({
          method: 'post',
          url:'http://localhost:8000/api/',
          data: formField
        }).then(response=>{
          console.log(response.data);
          
        })
    }

    //for listing items
  const [Items, setItems] = useState([]);

  const fetchItems = async () => {
    const result = await axios.get("http://127.0.0.1:8000/api/");
    console.log(result.data);
    setItems(result.data);
  };

  useEffect(() => {
   
    fetchItems();
  }, []);
  
  // for deleteing the TASK
  const deleteItem = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/${id}/`);
  };
  return (
    <div>
      <div className="add container my-4" border="dark">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Task</Form.Label>
            <Form.Control type="email" placeholder="Enter Your Task Here" 
             name="task"
              value={task}
              onChange={(e) => setTask(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Task Details</Form.Label>
            <Form.Control as="textarea" rows={2} placeholder="Enter Your Task Description Here"
             name="details"
             value={description}
             onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Button className="btn btn-primary btn-block" onClick={addNewTask}>Add Problem</Button>
        </Form>
      </div>
      <div className="list  my-4">
        <Table variant="dark">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Task</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {Items.map((Item, index) => (
              <tr>
                <td>{Item.id}</td>
                <td>{Item.task}</td>
                <td>{Item.description}</td>
                <td>
                  <Button
                    className="btn btn-danger"
                    onClick={() => deleteItem(Item.id)}
                  >
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TodoList;
