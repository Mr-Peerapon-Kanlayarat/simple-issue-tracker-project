var express = require('express');
var router = express.Router();
let Project = require('../models/project');
let User = require('../models/user');
let Issue = require('../models/issue');

//อัปเดตสถานะของ issue
router.put('/:issueId', async (req, res) => {
    try {
        const issueId = req.params.issueId;
        const { status } = req.body;

        if (!issueId || !status) {
            throw new Error("Issue ID and status are required.");
        }

        let issue = await Issue.findByPk(issueId);
        if (!issue) {
            throw new Error("Issue not found.");
        }

        issue.status = status;
        await issue.save();

        res.status(200).json({
            success: true,
            message: "Issue status updated successfully.",
            data: issue
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

//ลบ issue
router.delete('/:issueId', async (req, res) => {
    try {
        const issueId = req.params.issueId;

        if (!issueId) {
            throw new Error("Issue ID is required.");
        }

        let issue = await Issue.findByPk(issueId);
        if (!issue) {
            throw new Error("Issue not found.");
        }

        await issue.destroy();
        res.status(200).json({
            success: true,
            message: "Issue deleted successfully."
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;