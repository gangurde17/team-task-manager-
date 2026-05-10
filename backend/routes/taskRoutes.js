const router = require("express").Router();

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {

    try {

        const task = await Task.create(req.body);

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET TASKS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const tasks = await Task.find()
            .populate("assignedTo")
            .populate("project");

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// UPDATE TASK STATUS
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const updatedTask =
            await Task.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});



module.exports = router;