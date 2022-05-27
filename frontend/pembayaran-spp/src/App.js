import React from "react"
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home"
import Siswa from "./pages/Siswa/Siswa"
import Kelas from "./pages/Kelas/Kelas"
import Petugas from "./pages/Petugas/Petugas"
import Spp from "./pages/Spp"
import Transaksi from "./pages/Transaksi"
import RiwayatTransaksi from "./pages/RiwayatTransaksi"
import Login from "./pages/Login/Login"

export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/siswa" component={Siswa} />
        <Route path="/kelas" component={Kelas} />
        <Route path="/petugas" component={Petugas} />
        <Route path="/spp" component={Spp} />
        <Route path="/riwayatTransaksi" component={RiwayatTransaksi} />
        <Route path="/transaksi" component={Transaksi} />
        <Route path="/login" component={Login} />
      </Switch>
    )
  }
}