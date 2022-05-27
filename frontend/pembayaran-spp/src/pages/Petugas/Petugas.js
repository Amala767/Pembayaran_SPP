import React from "react"
import Navbar from "../../components/Navbar"
import DataPetugas from "../../components/Petugas/DataPetugas"
import { base_url, foto_petugas_url } from "../../config.js";
import $ from "jquery"
import axios from "axios"
import './petugas.css'

export default class Petugas extends React.Component{
    constructor(){
        super()
            this.state = {
                Petugas: [],
                token: "",
                action: "",
                nama_petugas: "",
                jabatan: "",
                alamat: 0,
                no_telp: "",
                username: "",
                password: "",
                foto_petugas: "",
                uploadFile: true,
                id_petugas: "",
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
    getPetugas = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({Petugas: response.data})
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
        this.getPetugas()
    }
    Add = () => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "insert",
            id_petugas: 0,
            nama_petugas: "",
            alamat: "",            
            jabatan: "",
            no_telp: 0,
            username: "",
            password: "",
            foto_petugas: null,
            uploadFile: true
        })
    }

    Edit = selectedItem => {
        $("#modal_petugas").modal("show")
        this.setState({
            action: "update",
            id_petugas: selectedItem.id_petugas,
            nama_petugas: selectedItem.nama_petugas,
            alamat: selectedItem.alamat,
            jabatan: selectedItem.jabatan,
            no_telp: selectedItem.no_telp,
            username: selectedItem.username,
            password: selectedItem.password,
            foto_petugas: null,
            uploadFile: false
        })
    }
    savePetugas = event => {
        event.preventDefault()
        $("#modal_petugas").modal("hide")
        let form = new FormData()
        form.append("id_petugas", this.state.id_petugas)
        form.append("nama_petugas", this.state.nama_petugas)
        form.append("alamat", this.state.alamat)
        form.append("jabatan", this.state.jabatan)
        form.append("no_telp", this.state.no_telp)
        form.append("username", this.state.username)        
        form.append("password", this.state.password)
        if (this.state.uploadFile) {
            form.append("foto_petugas", this.state.foto_petugas)
        }

        let url = base_url + "/petugas"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        }
    }
    dropPetugas = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/petugas/" + selectedItem.id_petugas
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        }
    }
    render(){
        return(
            <div className="ptg">
                <Navbar />
                <div className="containers">
                   <h3 className="text-bold mt-2"><i className="las la-user la-2x"></i>Data Petugas</h3>
                   <div className="row">
                       { this.state.Petugas.map( item => (
                           <DataPetugas
                           key = {item.id_petugas}
                           nama_petugas = {item.nama_petugas}
                           no_telp = {item.no_telp}
                           jabatan = {item.jabatan}
                           foto_petugas = { foto_petugas_url + "/" + item.foto_petugas}
                           onEdit = {() => this.Edit(item)}
                           onDrop = {() => this.dropPetugas(item)}
                            />
                       )) }
                   </div>
                   <button className="btn btn-primary" onClick={() => this.Add()}>
                       Tambah Petugas
                   </button>
                </div>

                 {/* modal product  */}
                 <div className="modal fade" id="modal_petugas">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-info text-white">
                                 <h4>Form Petugas</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.savePetugas(ev)}>
                                     Nama Petugas
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama_petugas}
                                     onChange={ev => this.setState({nama_petugas: ev.target.value})}
                                     required
                                     />
                                    No.HP
                                     <input type="number" className="form-control mb-1"
                                     value={this.state.no_telp}
                                     onChange={ev => this.setState({no_telp: ev.target.value})}
                                     required
                                     />
                                    jabatan
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.jabatan}
                                     onChange={ev => this.setState({jabatan: ev.target.value})}
                                     required
                                     />
                                    Username
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.username}
                                     onChange={ev => this.setState({username: ev.target.value})}
                                     required
                                     />
                                     Password
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.password}
                                     onChange={ev => this.setState({password: ev.target.value})}
                                     required
                                     />
                                    { this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                        onClick={() => this.setState({uploadFile: true})}>
                                            Ganti Foto Petugas
                                        </button>
                                    ) : (
                                        <div>
                                            Foto Petugas
                                            <input type="file" className="form-control mb-1"
                                            onChange={ev => this.setState({foto_petugas: ev.target.files[0]})}
                                            
                                            required
                                            />
                                        </div>
                                    ) }

                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        )
    }
}