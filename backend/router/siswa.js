const express = require("express")
const models = require("../models/index")
const siswa = models.siswa
const app = express()

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const auth = require("../auth")
app.use(auth)

// config storage image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./foto_siswa")
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})


app.get("/", auth, async(req, res) =>{
    siswa.findAll()
    .then(siswa => {
        res.json(siswa)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", upload.single("foto_siswa"), auth, async(req, res) =>{
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            nisn: req.body.nisn,
            nis: req.body.nis,
            nama: req.body.nama,
            id_kelas: req.body.id_kelas,
            id_spp: req.body.id_spp,
            alamat: req.body.alamat,
            no_telp: req.body.no_telp,
            jenis_kelamin: req.body.jenis_kelamin,
            foto_siswa: req.file.filename
        }
        siswa.create(data)
        .then(result => {
            res.json({
                message: "data berhasil ditambahkan",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })

        
    }
})

app.put("/", upload.single("foto_siswa"), auth, async(req, res) =>{
    let param = { nisn: req.body.nisn}
    let data = {
        nisn: req.body.nisn,
            nis: req.body.nis,
            nama: req.body.nama,
            id_kelas: req.body.id_kelas,
            id_spp: req.body.id_spp,
            alamat: req.body.alamat,
            no_telp: req.body.no_telp,
            jenis_kelamin: req.body.jenis_kelamin
    }
    if (req.file) {
        // get data by id
        const row = await siswa.findOne({where: param})
        let oldFileName = row.foto_siswa
            
        // delete old file
        let dir = path.join(__dirname,"../foto_siswa",oldFileName)
        fs.unlink(dir, err => console.log(err))
        

        // set new filename
        data.foto_siswa = req.file.filename
    }

    siswa.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data berhasil diupdate",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:nisn", auth, async (req, res) =>{
    try {
        let param = { nisn: req.params.nisn}
        let result = await siswa.findOne({where: param})
        let oldFileName = result.foto_siswa
            
        // delete old file
        let dir = path.join(__dirname,"../foto_siswa",oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        siswa.destroy({where: param})
        .then(result => {
            res.json({
                message: "data berhasil dihapus",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = app