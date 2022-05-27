import React from "react"
import './siswa.css'

class DataSiswa extends React.Component{
    render(){
        return (
            <div className="data">
                    <div className= "card-content">
                        <div className="card-title">
                            <img className="img" src={this.props.foto_siswa} width="100px"/>
                            <p>NISN: {this.props.nisn}</p>
                            <p>Nama: {this.props.nama}</p>
                            <p>Alamat: {this.props.alamat}</p>
                            <p>No.Hp: {this.props.no_telp}</p>
                            <button className="btn btn-sm m-1" onClick={this.props.onEdit}>
                            <i class="lar la-edit la-2x"></i>
                            </button>
                            <button className="btn btn-sm  m-1" onClick={this.props.onDrop}>
                            <i class="lar la-trash-alt la-2x"></i>
                            </button>
                        </div>
                    </div>
                </div>
        )
    }
}
export default DataSiswa;