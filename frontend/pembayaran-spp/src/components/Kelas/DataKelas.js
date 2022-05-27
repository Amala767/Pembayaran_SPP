import React from "react"
import './kelas.css'
 
class DataKelas extends React.Component{
    render(){
        return(
            <div className="dk">
                    <div className="card-content m-2" >
                        <div className="card-title">
                            <i className="las la-school la-2x mt-3 mb-3"></i>
                            <h5>{this.props.nama_kelas}</h5>
                            <h6>{this.props.kompetensi_keahlian}</h6>
                            <button className="btn btn-sm m-2" onClick={this.props.onEdit}>
                                <i className="las la-edit"></i>
                            </button>
                            <button className="btn btn-sm m-2 " onClick={this.props.onDrop}>
                            <i class="lar la-trash-alt "></i>
                            </button>
                        </div>
                    </div>
                </div>
        )
    }
 }

 export default DataKelas;