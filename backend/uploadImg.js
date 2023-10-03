import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer ({
    storage:storage,
    fileFilter: (req, file, callback) => {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg"
        ){
            callback(null, true)
        } else {
            console.log('only jpg & png file supported!')
            callback(null, true)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

export { upload }