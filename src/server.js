const express = require("express");

const tasksRouter = require("./routes/tasks");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Course Task Tracker API is running"
  });
});

app.use("/api/tasks", tasksRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});