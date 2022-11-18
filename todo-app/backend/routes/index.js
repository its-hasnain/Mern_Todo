var express = require('express');
var router = express.Router();
// dummy database
let tasks = []
// route for getting all the tasks
router.get('/favorite', (_, res) => {
  try {
    res.json({ success: true, tasks })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
});
// route for posting tasks
router.post('/favorite', (req, res) => {
  const { task } = req.body
  try {
    if (task) {
      tasks.push(task)
      res.json({ success: true, tasks })
    } else {
      res.json({ success: false, message: "Missing required parameters" })
    }
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
});
//route for clearing all tasks
router.delete('/favorite', (req, res) => {
  const { task } = req.body
  try {
    if (tasks) {
      tasks = []
      res.json({ success: true, tasks })
    } else {
      res.json({ success: false, message: "Missing required parameters" })
    }
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
});
//route for update
router.put('/favorite/:id', (req, res) => {
  const { task } = req.body
  tasks.splice(req.params.id, 1, task)
  res.json({ success: true, tasks })
})
//route for delete
router.delete('/favorite/:id', (req, res) => {
  const task = req.params.id
  tasks.splice(task, 1)
  res.json({ success: true, tasks })
})
module.exports = router;