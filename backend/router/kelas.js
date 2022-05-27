const express = require("express")
const { removeAllListeners } = require("nodemon")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const models = require("../models/index")
const kelas = models.kelas

const auth = require("../auth")
app.use(auth)

app.get ("/", auth, async(req, res) =>{
    kelas.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
             massage : error.massage
        })
    })
})

app.post("/", auth, async(req, res) => {
    //menampung data
    let data ={
        nama_kelas : req.body.nama_kelas,
        kompetensi_keahlian : req.body.kompetensi_keahlian
    }

    kelas.create(data)
    .then(result => {
        res.json({
            message: "data berhasil ditambahkan",
            data : result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", auth, async(req, res) => {
    let param = { id_kelas: req.body.id_kelas}
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }
    
    kelas.update(data, {where: param})
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

app.delete("/:id_kelas", auth, async(req, res) => {
    let param = {id_kelas: req.params.id_kelas}
    kelas.destroy({where: param})
    .then(result => {
        res.json({
            message: "data berhasil dihapus",
            data : result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})



module.exports = app