require("dotenv").config()
const express = require("express")
const fileUpload = require("express-fileupload")

const admin = require("./Controllers/admin")

const {
    SERVER_PORT
} = process.env

const port = SERVER_PORT || 3005

const app = express()

app.use(express.static(`${__dirname}/Data/Images`))
app.use(express.json())
app.use(fileUpload())

app.get("/api/get/images", admin.getImages)
app.post("/api/add/image", admin.addImage)
app.post("/api/save/images", admin.saveImages)

try {
    app.listen(port, () => console.log(`Listening on port ${port}`))
}
catch(err) {
    console.log(err)
}