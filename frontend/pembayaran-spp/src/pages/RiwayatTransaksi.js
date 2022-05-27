import { base_url } from "../config";
import axios from "axios"
import TransactionList from "../components/TransactionList"
import React from "react";
import Navbar from "../components/Navbar"
import './Kelas/kelas.css'

export default class RiwayatTransaksi extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            petugas: null,
            Pembayaran: [],
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
        let url = base_url + "/Pembayaran"

        axios.get(url, this.headerConfig())
        .then(response => {
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
    componentDidMount(){
        this.getPembayaran()
    }

    render(){
        return (
            <div>
                <Navbar />
                <div className="data-kel">
                    <h3 className="text-bold text-dark mt-4 mb-3"><i className="las la-calendar-check la-2x"></i>Transactions List</h3>
                    { this.state.Pembayaran.map(item => (
                        <TransactionList
                        key = {item.id_pembayaran}
                        nisn = {item.nisn}
                        bulan_dibayar = {item.bulan_dibayar}
                        tahun_dibayar = {item.tahun_dibayar}
                        jumlah_bayar = {item.jumlah_bayar}
                        time = {item.tgl_bayar}
                         />
                    )) }
                </div>
            </div>
        )
    }

}