import React from "react"
import './petugas.css'

class DataPetugas extends React.Component{
    render(){
        return(
            <div className="dp">
                <div className="card">
                    <div className="card-contents">
                        <div className="card-titles text-center">
                            <img src={this.props.foto_petugas} width="100px"/>
                            <h5 className="text-light">{this.props.nama_petugas}</h5>
                            <p className="text-light">{this.props.jabatan}</p>
                            <p className="text-light">{this.props.no_telp}</p>
                            <button className="btn btn-sm m-1" onClick={this.props.onEdit}>
                            <i class="lar la-edit la-2x"></i>
                            </button>
                            <button className="btn btn-sm  m-1" onClick={this.props.onDrop}>
                            <i class="lar la-trash-alt la-2x"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DataPetugas;