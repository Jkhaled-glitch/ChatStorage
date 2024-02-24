const express = require('express');
const router = express.Router();
const { saveFileToStorage,deleteFilesFromStorage } = require('../controllers/fileController');


router.post('/:destination', (req, res) => {
  const destination = req.params.destination;
  saveFileToStorage(req, res, destination); 
});


router.delete('/:destination', (req, res) => {
  const destination = req.params.destination;
  deleteFilesFromStorage(req, res, destination); 
});


module.exports = router;
