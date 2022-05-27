import React from "react"
import Navbar from "../components/Navbar"
import './Kelas/kelas.css'
import { base_url } from "../config.js";
import $, { event } from "jquery"
import axios from "axios"

export default class Transaksi extends React.Component{
    constructor(){
        super()
        let date = new Date()
        this.state = {
            Pembayaran: [],
            token: "",
            action: "",
            id_pembayaran: 0,
            id_petugas: 0,
            nisn: 0,
            tgl_bayar: date ,
            bulan_dibayar: "",
            tahun_dibayar: "",
            id_spp: "",
            jumlah_bayar: "",
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getPembayaran = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({Pembayaran: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({id_spp: response.data.data.id_spp})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({nisn: response.data.data.nisn})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    getPetugas = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({id_petugas: response.data.data.id_petugas})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    componentDidMount(){
        this.getSiswa()
        this.getSpp()
        this.getPembayaran()
        this.getPetugas()
    }
    AddTransaksi = () => {
        $("#modal-pembayaran").modal("show")
        this.setState({
            action: "insert",
            nisn: 0,
            id_pembayaran: 0,
            id_petugas: 0,
            id_spp: 0,
            tgl_bayar: "",
            bulan_dibayar: "",
            tahun_dibayar: "",
            jumlah_bayar: "",
        })
    }
    savePembayaran = event => {
        event.preventDefault()
        $("#modal-pembayaran").modal("hide")
        // let form = new FormData()
        // form.append("id_pembayaran", this.state.id_pembayaran)
        // form.append("id_petugas", this.state.id_petugas)
        // form.append("id_spp", this.state.id_spp)
        // form.append("nisn", this.state.nisn)
        // form.append("bulan_dibayar", this.state.bulan_dibayar)
        // form.append("tgl_bayar", this.state.tgl_bayar)
        // form.append("tahun_dibayar", this.state.tahun_dibayar)
        // form.append("jumlah_bayar", this.state.jumlah_bayar)
        let form = {
            'id_pembayaran': this.state.id_pembayaran,
            'id_petugas': this.state.id_petugas,
            'nisn': this.state.nisn,
            'id_spp': this.state.id_spp,
            'tgl_bayar': this.state.tgl_bayar,
            'bulan_dibayar': this.state.bulan_dibayar,
            'tahun_dibayar': this.state.tahun_dibayar,
            'jumlah_bayar': this.state.jumlah_bayar,
        }
        let url = base_url + "/pembayaran"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPembayaran()
            })
            .catch(error => console.log(error))
        } 
    }
    render(){
        return(
            <div>
               <Navbar />
               <div className="data-kel">
               <div class="alert alert-light" role="alert">
                    <div className="media">   
                        <div className="media-body text-left">  
                        <h3 className="mt-3 ">Hello !</h3> 
                        Transaksi dapat dilakukan dengan klik button dibawah   
                        </div> 
                    </div>     
                    <button className="btn btn-info mt-3" onClick={() => this.AddTransaksi()}>
                            Tambah Transaksi
                    </button>  
                </div>
             </div>
               <div className="modal fade" id="modal-pembayaran">
                  <div className="modal-dialog">
                    <div className="modal-content">
                   <h3 className="m-3"><i className="las la-comments-dollar la-2x"></i>Form Transaksi</h3>
                   <form class="row g-3 m-2"  onSubmit={ev => this.savePembayaran(ev)}>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">NISN</label>
                            <input type="number" className="form-control mb-1"
                            value={this.state.nisn} onChange={ev => this.setState({nisn: ev.target.value})} required />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">ID Petugas</label>
                            <input type="number" className="form-control mb-1"
                            value={this.state.id_petugas} onChange={ev => this.setState({id_petugas: ev.target.value})} required />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Id Spp</label>
                            <input type="number" className="form-control mb-1"
                            value={this.state.id_spp} onChange={ev => this.setState({id_spp: ev.target.value})} required />
                        </div>
                        <div class="col-6">
                            <label class="form-label">Bulan Dibayar</label>
                            <input type="text" className="form-control mb-1"
                            value={this.state.bulan_dibayar} onChange={ev => this.setState({bulan_dibayar: ev.target.value})} required />
                        </div>
                        <div class="col-6">
                            <label class="form-label">Tahun Dibayar</label>
                            <input type="text" className="form-control mb-1"
                            value={this.state.tahun_dibayar} onChange={ev => this.setState({tahun_dibayar: ev.target.value})} required />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Jumlah Bayar</label>
                            <input type="number" className="form-control mb-1"
                            value={this.state.jumlah_bayar} onChange={ev => this.setState({jumlah_bayar: ev.target.value})} required />
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-success mt-3">Save Transaction</button>
                        </div>
                        </form>
               </div>
               </div>
               </div>
           </div>
        )
    }
}