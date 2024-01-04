const Task = require("../models/task.model");

const list = async (req, res) => {
  try {
    const task = await Task.find()
      .populate({ path: "user", select: "name email" })
      .exec();
    return res.json({ task });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { title } = req.body;
    const existingTask = await Task.findOne({ title: title });
    if (existingTask) {
      return res.status(400).json({ error: "Task already exists" });
    }
    const task = await Task.create({ title, user: req.profile });
    await task
      .save()
      .then((savedPost) => res.status(201).json({ savedPost }))
      .catch((error) => res.status(500).json({ error: error.message }));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = { list, create };
