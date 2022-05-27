import React from "react"
import Navbar from "../components/Navbar"
import { base_url } from "../config.js";
import axios from "axios"
import $ from "jquery"
import './Kelas/kelas.css'


export default class Spp extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            action: "",
            nominal: 0,
            tahun: 0,
            Spp: [],
            }
    
            if(localStorage.getItem("token")){
                this.state.token = localStorage.getItem("token")
            }else{
                window.location = "/login"
            }
        }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({Spp: response.data})
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
        this.getSpp()
    }
    Add = () => {
        $("#modal_spp").modal("show")
        this.setState({
            action: "insert",
            id_spp: 0,
            tahun: 0,
            nominal: 0
        })
    }

    Edit = selectedItem => {
        $("#modal_spp").modal("show")
        this.setState({
            action: "update",
            id_spp: selectedItem.id_spp,
            tahun: selectedItem.tahun,
            nominal: selectedItem.nominal
        })
    }
    saveSpp = event => {
        event.preventDefault()
        $("#modal_spp").modal("hide")
        // let form = new FormData()
        // form.append("id_spp", this.state.id_spp)
        // form.append("tahun", this.state.tahun)
        // form.append("nominal", this.state.nominal)
        let form = {
            'id_spp':this.state.id_spp,
            'tahun':this.state.tahun,
            'nominal': this.state.nominal
        }
        let url = base_url + "/spp"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(error => console.log(error))
        }
    }
    dropSpp = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/spp/" + selectedItem.id_petugas
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
            <div>
                <Navbar />
                <div className="data-kel">
                            <h3 className="m-2"><i className="las la-coins la-2x"></i>List Biaya Spp</h3>
                        <div className="card-body">
                            <table className="table table-bordered table-light table-striped">
                                <thead>
                                    <tr>
                                        <th>Tahun</th>
                                        <th>Nominal</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    { this.state.Spp.map( (item, index) => (
                                        <tr key={index}>
                                            <td>{item.tahun}</td>
                                            <td>Rp {item.nominal}</td>
                                            <td>
                                                <button className="btn btn-sm btn-info m-1"
                                                onClick={() => this.Edit(item)}>
                                                    Edit
                                                </button>

                                                <button className="btn btn-sm btn-danger m-1"
                                                onClick={() => this.dropSpp(item)}>
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ) ) }
                                </tbody>
                            </table>
                                <button className="btn btn-outline-success m-2" onClick={() => this.Add()}>
                                    Tambah Spp
                                </button>
                        </div>
                        <div className="modal fade" id="modal_spp">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-info text-white">
                                 <h4>Form Petugas</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveSpp(ev)}>
                                    Tahun
                                     <input type="number" className="form-control mb-1"
                                     value={this.state.tahun}
                                     onChange={ev => this.setState({tahun: ev.target.value})}
                                     required
                                     />
                                    Nominal
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nominal}
                                     onChange={ev => this.setState({nominal: ev.target.value})}
                                     required
                                     />
                                    { this.state.action === "update"  }
                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                 </form>
                             </div>
                         </div>
                     </div>
                     </div>
                    </div>
                </div>
        )
    }
}