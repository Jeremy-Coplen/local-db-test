const Pool = require("pg").Pool

const {
    DB_USER,
    DB_HOST,
    DB_NAME,
    DB_USER_PASSWORD,
    DB_PORT,
    REACT_APP_SERVER_HOST
} = process.env

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_USER_PASSWORD,
    port: DB_PORT
})

module.exports = {
    getImages: (req, res) => {
        pool.query('SELECT * FROM images ORDER BY ASC', (err, results) => {
            if(err) {
                throw err
            }

            res.status(200).send(results.rows)
        })
    },

    addImage: (req, res) => {
        const fileName = req.files.myFile.name
        const path = `${__dirname}/../Data/Images/${fileName}`
        const image = req.files.myFile

        image.mv(path, (err) => {
            if(err) {
                console.log(err)
                res.sendStatus(500)
            }

            // const blobImage = require(`${__dirname}/../Data/Images/${fileName}`)

            // let blob = (typedArray, mimeType) => {
            //     return URL.createObjectURL(new Blob([typedArray.buffer], {type: mimeType}))
            // }

            // const url = blob(blobImage, "image/*")

            res.status(200).send(`${REACT_APP_SERVER_HOST}/Data/Images/${fileName}`)
        })
    },

    saveImages: async (req, res) => {
        try {
            const { images } = req.body
    
            let imageIds = []
    
            for(let i = 0; i < images.length; i++) {
                await pool.query('INSERT INTO images (url) VALUES ($1)', [images[i]], (err, results) => {
                    if(err) {
                        throw err
                    }
    
                    imageIds.push(results.insertId)
                })
            }
    
            res.status(200).send(imageIds)
        }
        catch(err) {
            console.log(err)
        }
    }
}