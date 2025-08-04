var express = require('express');
var router = express.Router();
let Project = require('../models/project');
let User = require('../models/user');

//สร้างโปรเจกต์ใหม่(ต้องมีการยืนยันตัวตน)
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.description) {
            throw new Error("Title and description are required.");
        }
        if (!req.user || !req.user.id) {
            throw new Error("User not authenticated.");
        }
        let project = await Project.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.user.id 
        });
        res.status(201).json({
            success: true,
            message: "Project created successfully.",
            data: project
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

//ดึงข้อมูลโปรเจกต์ทั้งหมดของผู้ใช้ที่เข้าสู่ระบบอยู่
router.get('/', async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            throw new Error("User not authenticated.");
        }
        let projects = await Project.findAll({
            where: { userId: req.user.id },
            include: [{ model: User, attributes: ['username', 'email'] }]
        });
        res.status(200).json({
            success: true,
            data: projects
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

//ดึงข้อมูลโปรเจกต์ตาม ID
router.get('/:projectId', async (req, res) => {
    try {
        if (!req.params.projectId) {
            throw new Error("Project ID is required.");
        }
        if (!req.user || !req.user.id) {
            throw new Error("User not authenticated.");
        }
        let projectId = req.params.projectId;
        let project = await Project.findByPk(projectId, {
            include: [{ model: User, attributes: ['username', 'email'] }]
        });
        if (!project) {
            throw new Error("Project not found.");
        }
        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

//ลบโปรเจกต์ตาม ID เฉพาะผู้ใช้ที่สร้างโปรเจกต์นั้น
router.delete('/:projectId', async (req, res) => {
    try {
        if (!req.params.projectId) {
            throw new Error("Project ID is required.");
        }
        if (!req.user || !req.user.id) {
            throw new Error("User not authenticated.");
        }
        let projectId = req.params.projectId;
        let project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error("Project not found.");
        }
        if (project.userId !== req.user.id) {
            throw new Error("You are not authorized to delete this project.");
        }
        await project.destroy();
        res.status(200).json({
            success: true,
            message: "Project deleted successfully."
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;