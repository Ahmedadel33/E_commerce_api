const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { createCategory, getCategories } = require('../controllers/categorycontroller');
const { categoryValidation } = require('../validation/categoryvalid');

router.get('/', getCategories);
router.post('/', protect, admin, categoryValidation, createCategory);

module.exports = router;