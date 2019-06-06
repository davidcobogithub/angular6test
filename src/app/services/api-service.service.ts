import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  createClient(nameTable, dataCreate) {
    this.http.post('/apiConnection/version.php?action=createClient&table=' + nameTable, dataCreate).subscribe(data => {
      this.callBackCreate(data);
    });
  }

  createSolicitud(nameTable, dataCreate) {
    this.http.post('/apiConnection/version.php?action=createSolicitud&table=' + nameTable, dataCreate).subscribe(data => {
      this.callBackCreate(data);
    });
  }

  callBackCreate(response) {
    if (response == 1) {
      this.showMensajeExito("Nuevo cliente registrado correctamente ");
    } else {
      console.log(response)
      this.showMensajeError("Error al registrar nuevo cliente ");
    }
  }

  readOne(nameTable, nameColumn, id) {

    this.http.get('/apiConnection/version.php?action=readOne&table=' + nameTable + '&column=' + nameColumn + '&id=' + id).subscribe(data => {
      this.callBackReadOne(data);
    });

  }

  callBackReadOne(response) {

    console.log(response)

    if(response){
      this.showMensajeError("Ya ha sido creado un cliente con cédula "+response[0].cedula);
    }
  }

  readAll(nameTable) {

    this.http.get('/apiConnection/version.php?action=readAll&table=' + nameTable).subscribe(data => {
      this.callBackReadAll(data);
    });
  }

  callBackReadAll(response) {

    console.log(response);
  }

  updateClient(nameTable, dataUpdate) {
    this.http.post('/apiConnection/version.php?action=updateClient&table=' + nameTable, dataUpdate).subscribe(data => {
      this.callBackUpdate(data);
    });
  }

  updateSolicitud(nameTable, dataUpdate) {
    this.http.post('/apiConnection/version.php?action=updateSolicitud&table=' + nameTable, dataUpdate).subscribe(data => {
      this.callBackUpdate(data);
    });
  }

  callBackUpdate(response) {
    console.log(response)
  }

  delete(nameTable, nameColumn, id) {
    return this.http.delete('/apiConnection/version.php?action=delete&table=' + nameTable + '&column=' + nameColumn + '&id=' + id).subscribe(data => {
      this.callBackDelete(data);
    });
  }

  callBackDelete(response) {
    console.log(response);
  }

  showMensajeExito(mensaje) {

    document.getElementById("mensaje").style.color = "green";
    document.getElementById("mensaje").innerHTML = mensaje;

    setTimeout(function () {
      document.getElementById("mensaje").innerHTML = "";
    }, 4000)
  }

  showMensajeError(mensaje) {
    document.getElementById("mensaje").style.color = "red";
    document.getElementById("mensaje").innerHTML = mensaje;

    setTimeout(function () {
      document.getElementById("mensaje").innerHTML = "";
    }, 4000)
  }
}
