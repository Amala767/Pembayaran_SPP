import React from "react"
import Navbar from "../../components/Navbar"
import DataSiswa from "../../components/Siswa/DataSiswa"
import { base_url, foto_siswa_url } from "../../config.js";
import $ from "jquery"
import axios from "axios"
import './siswa.css';


export default class Siswa extends React.Component{
    constructor(){
        super()
        this.state = {
            Siswa: [],
            token: "",
            action: "",
            nisn: "",
            nis: "",
            nama: "",
            alamat: "",
            no_telp: 0,
            jenis_kelamin: "",
            id_kelas: "",
            id_spp: "",
            foto_siswa: "",
            uploadFile: true,
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
    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({Siswa: response.data})
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
            this.setState({id_spp: response.data.length})
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
            this.setState({id_kelas: response.data.length})
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
        this.getKelas()
    }
    Add = () => {
        $("#modal_siswa").modal("show")
        this.setState({
            action: "insert",
            nisn: 0,
            nama: "",
            nis: "",
            no_telp: 0,
            alamat: "",
            jenis_kelamin: "",
            id_kelas: 0,
            id_spp: 0,
            foto_siswa: null,
            uploadFile: true
        })
    }
    saveSiswa = event => {
        event.preventDefault()
        $("#modal_siswa").modal("hide")
        let form = new FormData()
        form.append("nisn", this.state.nisn)
        form.append("nis", this.state.nis)
        form.append("nama", this.state.nama)
        form.append("no_telp", this.state.no_telp)
        form.append("alamat", this.state.alamat)        
        form.append("jenis_kelamin", this.state.jenis_kelamin)
        form.append("id_spp", this.state.id_spp)        
        form.append("id_kelas", this.state.id_kelas)
        if (this.state.uploadFile) {
            form.append("foto_siswa", this.state.foto_siswa)
        }

        let url = base_url + "/siswa"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        }
    }

    Edit = selectedItem => {
        $("#modal_siswa").modal("show")
        this.setState({
            action: "update",
            nisn: selectedItem.nisn,
            nis: selectedItem.nis,
            nama: selectedItem.nama,
            alamat: selectedItem.alamat,
            no_telp: selectedItem.no_telp,            
            jenis_kelamin: selectedItem.jenis_kelamin,
            id_spp: selectedItem.id_spp,            
            id_kelas: selectedItem.id_kelas,
            foto_siswa: null,
            uploadFile: false
        })
    }
    dropSiswa= selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/siswa/" + selectedItem.nisn
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div>
               <Navbar />
               <div className="sis">                
                <h3 className="text-bold mt-2"><i className="las la-graduation-cap la-2x"></i>Data Siswa</h3>
                   <div className="row">
                       { this.state.Siswa.map( item => (
                           <DataSiswa
                           key = {item.nisn}
                           nama = {item.nama}
                           nisn = {item.nisn}
                           alamat = {item.alamat}
                           no_telp = {item.no_telp}
                           jenis_kelamin = {item.jenis_kelamin}
                           foto_siswa = { foto_siswa_url + "/" + item.foto_siswa}
                           onEdit = {() => this.Edit(item)}
                           onDrop = {() => this.dropSiswa(item)}
                            />
                       )) }
                   </div>
                   <button className="btn btn-info" onClick={() => this.Add()}>
                       Tambah Siswa
                   </button>
                </div>

                 {/* modal Siswa  */}
                 <div className="modal fade" id="modal_siswa">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-info text-white">
                                 <h4>Form Siswa</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveSiswa(ev)}>
                                    NISN
                                     <input type="number" className="form-control mb-1"
                                     value={this.state.nisn}
                                     onChange={ev => this.setState({nisn: ev.target.value})}
                                     required
                                     />
                                     NIS
                                     <input type="number" className="form-control mb-1"
                                     value={this.state.nis}
                                     onChange={ev => this.setState({nis: ev.target.value})}
                                     required
                                     />
                                     Nama Siswa
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama}
                                     onChange={ev => this.setState({nama: ev.target.value})}
                                     required
                                     />

                                     Alamat
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.alamat}
                                     onChange={ev => this.setState({alamat: ev.target.value})}
                                     required
                                     />

                                    No.Telpon
                                     <input type="number" className="form-control mb-1"
                                     value={this.state.no_telp}
                                     onChange={ev => this.setState({no_telp: ev.target.value})}
                                     required
                                     />
                                     Jenis Kelamin
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.jenis_kelamin}
                                     onChange={ev => this.setState({jenis_kelamin: ev.target.value})}
                                     required
                                     />
                                     Id Kelas
                                     <input type="number" className="form-control mb-1"
                                     value={this.state.id_kelas}
                                     onChange={ev => this.setState({id_kelas: ev.target.value})}
                                     required
                                     />
                                     Id Spp
                                     <input type="number" className="form-control mb-1"
                                     value={this.state.id_spp}
                                     onChange={ev => this.setState({id_spp: ev.target.value})}
                                     required
                                     />

                                    { this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                        onClick={() => this.setState({uploadFile: true})}>
                                            Change Image
                                        </button>
                                    ) : (
                                        <div>
                                            Foto Siswa
                                            <input type="file" className="form-control mb-1"
                                            onChange={ev => this.setState({foto_siswa: ev.target.files[0]})}
                                            
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