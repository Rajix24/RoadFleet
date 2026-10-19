const fileStorage = require("../services/fileStorage.service")



async function  uploadFile(req, res, next){
    try{
        if(!req.file){
            return res.status(400).json({
                message:  "please enter file"
            })
        }
        const file = await fileStorage.uploadFile(req.file)
        return res.status(201).json({
            message: "file upload",
            file: file,
        })
    }catch(error){
           res.status(400).json({
            message: "error in controller",
            error: error
           })
        }
}



async function getFile(req, res, next) {
  try {
    const url = await fileStorage.getFileUrl(req.params.key);

    return res.json({
      message: "Temporary download URL generated",
      url,
      expiresIn: 3600,
    });
  } catch (error) {
    next(error);
  }
}


async function deleteFile(req, res, next) {
  try {
    await fileStorage.deleteFile(req.params.key);

    return res.json({
      message: "File deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadFile,
  getFile,
  deleteFile,
};