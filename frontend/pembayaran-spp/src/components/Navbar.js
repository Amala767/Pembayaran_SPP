import React from "react"
import './navbar.css'
class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }
    render(){
        return(
            <div>
                <div className="sidebar">
                    <header><i className="las la-wallet"></i>SppPayment</header>
                    <ul>
                        <li><a href="/" className="active">
                            <i className="lab la-trello"></i>Dashboard</a>
                        </li>
                        <li><a href="/siswa">
                            <i className="las la-graduation-cap"></i>Siswa</a>
                        </li>
                        <li><a href="/kelas">
                            <i className="las la-chalkboard"></i>Kelas</a>
                        </li>
                        <li><a href="/petugas">
                            <i className="las la-user"></i>Petugas</a>
                        </li>
                        <li><a href="/spp">
                            <i className="las la-coins"></i>Spp</a>
                        </li>
                        <li><a href="/transaksi">
                            <i className="las la-donate"></i>Form Transaksi</a>
                        </li>
                        <li><a href="/riwayatTransaksi">
                            <i className="las la-clipboard-list"></i>Riwayat Transaksi</a>
                        </li>
                        <li><a href="/login" onClick={() => this.Logout()}>
                            <i className="las la-door-open"></i>Logout</a>
                        </li>
                    </ul>
                </div>
                <div className="main-content">
                    <header>
                        <div className="search-wrapper">
                            <i className="las la-search"></i>
                            <input type="search" placeholder="Search Here" />
                        </div>
                    </header>
                </div>
            </div>
        )
    }
}
export default Navbar;