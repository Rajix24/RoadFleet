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
    return res.status(200).json({
      message: "Temporary download URL generated",
      url,
      expiresIn: 3000,
    });
  } catch (error) {
    res.status(400).json({
      message: "error in server in controller getfile",
      error: error
    })
  }
}


async function deleteFile(req, res, next) {
  try {
    await fileStorage.deleteFile(req.params.key);
    // if(!result) return res.status(400).json({message: "file not exist"})
    return res.status(200).json({
      message: "File deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "error in controller deletefile",
      error: error
    })
  }
}

module.exports = {
  uploadFile,
  getFile,
  deleteFile,
};