import React from "react"
import Navbar from "../../components/Navbar"
import './home.css'
import axios from "axios"
import { base_url } from "../../config.js"
import dash from'./dashboard.png'


export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            adminName: null,
            jumlahSiswa: 0,
            jumlahKelas: 0,
            jumlahPetugas: 0,
            jumlahSpp: 0
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({jumlahSiswa: response.data.length})
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
    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({jumlahKelas: response.data.length})
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
            this.setState({jumlahPetugas: response.data.length})
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
            this.setState({jumlahSpp: response.data.length})
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
    getAdmin = () => {
        let petugas = JSON.parse(localStorage.getItem('petugas'))
        this.setState({adminName: petugas.nama_petugas})
    }
    componentDidMount(){
        this.getSiswa()
        this.getKelas()
        this.getSpp()
        this.getPetugas()
        this.getAdmin()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div class="alert alert-light" role="alert">
                    <div className="media my-2">   
                        <div className="media-body text-left">  
                        <h3 className="mt-3 ">Hello  {this.state.adminName}</h3> 
                        Selamat datang kembali, semoga harimu menyenangkan, semangat bekerja dan jangan lupa membayar!   
                        </div> 
                        <img src={dash} className="mr-3" alt="media" width="145" />
                    </div>    
                </div>
                <div className="cardes">
                <div className="main__cards">
                    <div className="card">
                    <i
                        className="las la-graduation-cap la-4x text-lightblue"
                        aria-hidden="true"
                    ></i>
                    <div className="card_inner">
                        <p className="text-primary-p"> Siswa</p>
                        <span className="font-bold text-title">{this.state.jumlahSiswa}</span>
                    </div>
                    </div>

                    <div className="card">
                    <i className="las la-chalkboard la-4x text-red" aria-hidden="true"></i>
                    <div className="card_inner">
                        <p className="text-primary-p"> Kelas</p>
                        <span className="font-bold text-title">{this.state.jumlahKelas}</span>
                    </div>
                    </div>

                    <div className="card">
                    <i
                        className="las la-user la-4x text-yellow"
                        aria-hidden="true"
                    ></i>
                    <div className="card_inner">
                        <p className="text-primary-p"> Petugas</p>
                        <span className="font-bold text-title">{this.state.jumlahPetugas}</span>
                    </div>
                    </div>
                    <div className="card">
                    <i
                        className="las la-coins la-4x text-green"
                        aria-hidden="true"
                    ></i>
                    <div className="card_inner">
                        <p className="text-primary-p"> Spp</p>
                        <span className="font-bold text-title">{this.state.jumlahSpp}</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>

        )
    }
}