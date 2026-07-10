const express = require("express");

const {
  validateCreateOrReplace,
  validatePatch
} = require("../middleware/validateTask");

const router = express.Router();

let nextId = 3;

let tasks = [
  {
    id: "1",
    title: "Watch Week 3 lecture",
    course: "CS453",
    completed: false
  },
  {
    id: "2",
    title: "Review HTTP status codes",
    course: "CS453",
    completed: true
  }
];

function findTaskIndex(id) {
  return tasks.findIndex((task) => task.id === id);
}

// GET /api/tasks
router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

// GET /api/tasks/:id
router.get("/:id", (req, res) => {
  const task = tasks.find((item) => item.id === req.params.id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  res.status(200).json(task);
});

// POST /api/tasks
router.post("/", validateCreateOrReplace, (req, res) => {
  const newTask = {
    id: String(nextId++),
    title: req.body.title.trim(),
    course: req.body.course.trim(),
    completed: req.body.completed
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// PUT /api/tasks/:id
router.put("/:id", validateCreateOrReplace, (req, res) => {
  const index = findTaskIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  const replacementTask = {
    id: req.params.id,
    title: req.body.title.trim(),
    course: req.body.course.trim(),
    completed: req.body.completed
  };

  tasks[index] = replacementTask;

  res.status(200).json(replacementTask);
});

// PATCH /api/tasks/:id
router.patch("/:id", validatePatch, (req, res) => {
  const index = findTaskIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  if (req.body.title !== undefined) {
    tasks[index].title = req.body.title.trim();
  }

  if (req.body.course !== undefined) {
    tasks[index].course = req.body.course.trim();
  }

  if (req.body.completed !== undefined) {
    tasks[index].completed = req.body.completed;
  }

  res.status(200).json(tasks[index]);
});

// DELETE /api/tasks/:id
router.delete("/:id", (req, res) => {
  const index = findTaskIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  tasks.splice(index, 1);

  res.status(204).send();
});

module.exports = router;