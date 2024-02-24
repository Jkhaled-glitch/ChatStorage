const fs = require('fs');
const path = require('path');
const uploadfileMiddleware = require('../config/uploadFileMiddlware');

const parentFolder = path.join(__dirname,'..')


// @desc    Save File To Storage
// @route   POST /:destination    (destination can be files/images/profiles)
// @access  public
// @data    {file:file}

const saveFileToStorage = async (req, res, destination) => {
  const destinationFolder = path.join(parentFolder,destination)

  if (!fs.existsSync(destinationFolder)) {
    return res.status(404).json({ message: 'Destination folder does not exist' });
  }

  uploadfileMiddleware(destination)(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    const file = req.file;
    if(!file){
      return res.status(400).json({message:'File not Exist'})
    }
    const publicUrl = `${req.protocol}://${req.get('host')}/${destination}/${file.filename}`;
    res.status(200).json({ url: publicUrl });
  });
};

// @desc    Delete Files From Storage
// @route   DELETE /:destination    (destination can be files/images/profiles)
// @access  public
// @data    {filenames:[] }

const deleteFilesFromStorage = async (req, res, destination) => {
  console.log(req.body)
  const destinationFolder = path.join(parentFolder, destination);
  if (!fs.existsSync(destinationFolder)) {
    return res.status(404).json({ message: 'Destination folder does not exist' });
  }
  const filenames = req.body.filenames;
  if (!filenames || filenames==[]) {
    return res.status(400).json({ message: 'Filenames can not be Empty' });
  }
  const basePath = path.join(parentFolder, destination);

  try {
    const deletePromises = filenames.map(
      async (filename) => {
        const filePath = path.join(basePath, filename);
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      }
    );

    await Promise.all(deletePromises);

    res.status(200).json({ message: 'Files deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete files', error: err.message });
  }
};



module.exports = {
  saveFileToStorage,
  deleteFilesFromStorage,
};
