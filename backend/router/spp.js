const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const models = require("../models/index")
const spp = models.spp

const auth = require("../auth")
app.use(auth)

app.get("/", auth, async(req, res) => {
    spp.findAll()
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
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal,
    }

    spp.create(data)
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
    let param = { id_spp: req.body.id_spp}
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal,
    }

    spp.update(data, {where: param})
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

app.delete("/:id_spp", auth, async(req, res) => {
    let param = {id_spp: req.params.id_spp}
    spp.destroy({where: param})
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