const express = require('express');
const router = express.Router();
const roleCtrl = require('../controllers/roleController');

router.post('/', roleCtrl.createRole);
router.get('/', roleCtrl.getRoles);
router.get('/:id', roleCtrl.getRoleById);
router.put('/:id', roleCtrl.updateRole);
router.delete('/:id', roleCtrl.softDeleteRole);

module.exports = router;