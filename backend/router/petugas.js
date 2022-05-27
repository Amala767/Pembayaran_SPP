const express = require("express")
const { removeAllListeners } = require("nodemon")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const models = require("../models/index")
const petugas = models.petugas

const md5 = require("md5")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "JanganLupaBayarSPP"

// config storage image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./foto_petugas")
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

app.get("/", auth, async(req, res) => {
    petugas.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
             massage : error.massage
        })
    })
})

app.post("/", auth, upload.single("foto_petugas"), async(req, res) => {
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            username: req.body.username,
            password: md5(req.body.password),
            nama_petugas: req.body.nama_petugas,
            jabatan: req.body.jabatan,
            no_telp: req.body.no_telp,
            foto_petugas: req.file.filename
        }
        petugas.create(data)
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

app.put("/", auth, upload.single("foto_petugas"), async(req, res) => {
    let param = { id_petugas: req.body.id_petugas}
    let data = {
        username: req.body.username,
        nama_petugas: req.body.nama_petugas,
        jabatan: req.body.jabatan,
        no_telp: req.body.no_telp
    }
    if (req.body.password) {
        data.password = md5(req.body.password)
    }
    if (req.file) {
        // get data by id
        const row = await petugas.findOne({where: param})
        let oldFileName = row.foto_petugas
            
        // delete old file
        let dir = path.join(__dirname,"../foto_petugas",oldFileName)
        fs.unlink(dir, err => console.log(err))
        

        // set new filename
        data.foto_petugas = req.file.filename
    }

    petugas.update(data, {where: param})
    .then(result => {
        res.json({
            message: "data berhasil diupdate",
            data : result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_petugas", auth, async(req, res) => {
    try {
        let param = { id_petugas: req.params.id_petugas}
        let result = await petugas.findOne({where: param})
        let oldFileName = result.foto_petugas
            
        // delete old file
        let dir = path.join(__dirname,"../foto_petugas",oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        petugas.destroy({where: param})
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

app.post("/auth", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await petugas.findOne({where: params})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app