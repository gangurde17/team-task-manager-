const router = require("express").Router();

const Project = require("../models/Project");

const authMiddleware = require("../middleware/authMiddleware");


// CREATE PROJECT
router.post("/", authMiddleware, async (req, res) => {

    try {

        const project = await Project.create({
            ...req.body,
            createdBy: req.user.id
        });

        res.status(201).json(project);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET ALL PROJECTS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const projects = await Project.find()
            .populate("members")
            .populate("createdBy");

        res.json(projects);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        await Project.findByIdAndDelete(req.params.id);

        res.json({
            message: "Project Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const updatedProject =
            await Project.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        res.json(updatedProject);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;