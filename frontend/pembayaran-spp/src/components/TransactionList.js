import React from "react";

export default class TransactionList extends React.Component{
    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }
    render(){
        return (
            <div>
            <div className="card col-sm-12 my-1 mb-3">
                <div className="card-body row">
                    <div className="col-lg-3 col-sm-12">
                        <small className="text-info">NISN</small>
                        <h6>{this.props.nisn}</h6>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                        <small className="text-info">Bulan Dibayar</small>
                        <h6>{this.props.bulan_dibayar}</h6>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                        <small className="text-info">Tahun Dibayar</small>
                        <h6>{this.props.tahun_dibayar}</h6>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                        <small className="text-info">Jumlah Bayar</small>
                        <h6 className="text-danger">Rp {this.props.jumlah_bayar}</h6>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                        <small className="text-bold text-info"> Time:</small>
                        <h6 className="text-danger">{ this.convertTime(this.props.time) }</h6>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}