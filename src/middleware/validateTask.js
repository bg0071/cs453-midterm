function validateCreateOrReplace(req, res, next) {
  const { title, course, completed } = req.body;

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof course !== "string" ||
    course.trim() === "" ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      error:
        "title and course must be non-empty strings, " +
        "and completed must be a boolean"
    });
  }

  next();
}

function validatePatch(req, res, next) {
  const allowedFields = ["title", "course", "completed"];
  const suppliedFields = Object.keys(req.body);

  if (suppliedFields.length === 0) {
    return res.status(400).json({
      error: "PATCH requires at least one field"
    });
  }

  const containsUnknownField = suppliedFields.some(
    (field) => !allowedFields.includes(field)
  );

  if (containsUnknownField) {
    return res.status(400).json({
      error: "Only title, course, and completed may be updated"
    });
  }

  if (
    req.body.title !== undefined &&
    (typeof req.body.title !== "string" ||
      req.body.title.trim() === "")
  ) {
    return res.status(400).json({
      error: "title must be a non-empty string"
    });
  }

  if (
    req.body.course !== undefined &&
    (typeof req.body.course !== "string" ||
      req.body.course.trim() === "")
  ) {
    return res.status(400).json({
      error: "course must be a non-empty string"
    });
  }

  if (
    req.body.completed !== undefined &&
    typeof req.body.completed !== "boolean"
  ) {
    return res.status(400).json({
      error: "completed must be a boolean"
    });
  }

  next();
}

module.exports = {
  validateCreateOrReplace,
  validatePatch
};