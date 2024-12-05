var express = require('express');
var router = express.Router();
const todoList = [
    {id: '1111', title: 'title', description: 'description', finished: true}
]


/* GET todo list */
router.get('/', function(req, res, next) {
    console.log('sending tasks');
    res.status(200).json({
        status: true,
        message: 'success',
        data: todoList
      });
});

/**
 * create a task
 */
router.post('/', async function (req, res) {
    console.log('creating new task');
    console.log(req.body)
    const { id, title, description, finished } = req.body;
    todoList.push({
        id, 
        title, 
        description,
        finished
    });
    res.json({ status: true, message: 'task added', data: todoList });
});


/**
 * update a task
 */
router.put('/:id', async function (req, res) {
    const { id } = req.params;
    const { title, description, finished } = req.body;
    let todo = todoList.find((task) => task.id === id);

    if (!todo) {
        return res.status(404).json({ success: false, message: 'id not found' });
    }

    todo.title = title
    todo.description = description
    todo.finished = finished

    res.json({ status: true, message: 'task updated', data: todoList });
    
});

/**
 * delete a task
 */
router.delete('/:id', async function (req, res) {
    const { id } = req.params;
    console.log(id, typeof id);
    const index = todoList.findIndex((task) => task.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'id not found' });
    }
    
    todoList.splice(index, 1)

    res.json({ status: true, message: 'task deleted', data: todoList });
    
});

module.exports = router;
