const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${req.user.id}-${file.originalname}`
      cb(null, uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })

module.exports = upload