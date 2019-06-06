import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiServiceService } from "../services/api-service.service";

const NOMBRE_TABLA = "clientes";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(public crudService: ApiServiceService) { }

  ngOnInit() {
  }

  readData(cedula) {
    this.crudService.readOne(NOMBRE_TABLA, "cedula", cedula);
  }

  readAll(e) {
    this.crudService.readAll(NOMBRE_TABLA);
  }

  create(cedula, nombre, apellido, fechaNacimiento) {

    this.readData(cedula);
    if (this.validarCampos(cedula, nombre, apellido, fechaNacimiento) == true) {

     
      let data = {
        "cedula": cedula,
        "nombre": nombre,
        "apellido": apellido,
        "fecha_nacimiento": fechaNacimiento
      }
      this.crudService.createClient(NOMBRE_TABLA, data);
    }

  }

  update(e) {
    let data = {
      "cedula": 1144191140,
      "nombre": "Carlos Alberto",
      "apellido": "Martinez Parra",
      "fecha_nacimiento": "2015-12-05"
    }
    this.crudService.updateClient(NOMBRE_TABLA, data);
  }

  delete(e) {
    this.crudService.delete(NOMBRE_TABLA, "cedula", 1144191140);
  }

  validarCampos(cedula, nombre, apellido, fechaNacimiento): boolean {

    if (!this.validarCedula(cedula)) {
      return false;
    }

    if (!this.validarNombre(nombre)) {
      return false;
    }

    if (!this.validarApellido(apellido)) {
      return false;
    }

    if (!this.validarFechaNacimiento(fechaNacimiento)) {
      return false;
    }

    return true;
  }

  validarCedula(cedula): boolean {

    if (cedula.length <= 0) {
      this.showMensajeError("El numero de cédula es obligatorio");
      document.getElementById("cedula").focus();
      return false;
    }

    var regexpFormatoCedula = /^\d+$/;
    if (!regexpFormatoCedula.test(cedula)) {
      this.showMensajeError("En el campo cédula solo debe digitar números");
      document.getElementById("cedula").focus();
      return false;
    }

    return true;
  }

  validarNombre(nombre): boolean {

    if (nombre.length <= 0) {
      this.showMensajeError("El campo nombre es obligatorio");
      document.getElementById("nombre").focus();
      return false;
    }

    return true;
  }

  validarApellido(apellido): boolean {

    if (apellido.length <= 0) {
      this.showMensajeError("El campo apellido es obligatorio");
      document.getElementById("apellido").focus();
      return false;
    }

    return true;
  }

  validarFechaNacimiento(fechaNacimiento): boolean {

    if (fechaNacimiento.length <= 0) {
      this.showMensajeError("El campo fecha de nacimiento es obligatorio");
      document.getElementById("fechaNacimiento").focus();
      return false;
    }

    var valorinput = fechaNacimiento;
    var fecha = fechaNacimiento.split('-');
    var fechaFormat = new Date(fecha[0], fecha[1] - 1, fecha[2], 0, 0, 0);

    var regExpFormatoFecha = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/

    if (isNaN(fechaFormat.getTime()) || (!regExpFormatoFecha.test(valorinput))) {
      this.showMensajeError("Formato de fecha incorrecto");
      document.getElementById("fechaNacimiento").focus();
      return false;
    }

    var fechaMayor18 = new Date(2001, 5, 30, 0, 0, 0);
    if (fechaFormat > fechaMayor18) {
      this.showMensajeError("La fecha de nacimiento ingresada no es de alguien mayor de 18 años");
      document.getElementById("fechaNacimiento").focus();
      return false;
    }

    return true;
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
