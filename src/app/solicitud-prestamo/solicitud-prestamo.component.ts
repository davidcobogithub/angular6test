import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "../services/api-service.service";

const NOMBRE_TABLA = "solicitud_prestamo";

@Component({
  selector: 'app-solicitud-prestamo',
  templateUrl: './solicitud-prestamo.component.html',
  styleUrls: ['./solicitud-prestamo.component.css']
})
export class SolicitudPrestamoComponent implements OnInit {

  constructor(public crudService: ApiServiceService) { }

  ngOnInit() {
  }

  readData(e) {
    this.crudService.readOne(NOMBRE_TABLA, "nit_empresa", 800900);
  }

  readAll(e) {
    this.crudService.readAll(NOMBRE_TABLA);
  }

  create(nit_empresa, nombre, salario_actual, fecha_ingreso) {
    let data = {
      "nit_empresa": 800900,
      "nombre": "CaliSoft",
      "salario_actual": 2000000,
      "fecha_ingreso_empresa": "2019-05-12",
      "respuesta_solicitud": "APROBADA"
    }
    this.crudService.createSolicitud(NOMBRE_TABLA, data);
  }

  update(e) {
    let data = {
      "nit_empresa": 800900,
      "nombre": "GPS",
      "salario_actual": 3000000,
      "fecha_ingreso_empresa": "2019-05-28",
      "respuesta_solicitud": "RECHAZADA"
    }
    this.crudService.updateSolicitud(NOMBRE_TABLA, data);
  }

  delete(e) {
    this.crudService.delete(NOMBRE_TABLA, "nit_empresa",800900);
  }

  showSolicitudPanel(e){
    document.getElementById("divSolicitud_ID").style.display = "block";
  }

  validarCampos(nit_empresa, nombre, salario_actual, fecha_ingreso): boolean {

    if (!this.validarNit(nit_empresa)) {
      return false;
    }

    if (!this.validarNombre(nombre)) {
      return false;
    }

    if (!this.validarSalario(salario_actual)) {
      return false;
    }

    if (!this.validarFechaIngreso(fecha_ingreso)) {
      return false;
    }

    return true;
  }

  validarNit(nit_empresa): boolean {

    if (nit_empresa.length <= 0) {
      this.showMensajeError("El numero NIT es obligatorio");
      document.getElementById("nit_empresa").focus();
      return false;
    }

    var regexpFormatoCedula = /^\d+$/;
    if (!regexpFormatoCedula.test(nit_empresa)) {
      this.showMensajeError("En el campo NIT Empresa solo debe digitar números");
      document.getElementById("nit_empresa").focus();
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

  validarSalario(salario_actual): boolean {

    if (salario_actual.length <= 0) {
      this.showMensajeError("El campo salario actual es obligatorio");
      document.getElementById("salario_actual").focus();
      return false;
    }

    var regexpFormatoCedula = /^\d+$/;
    if (!regexpFormatoCedula.test(salario_actual)) {
      this.showMensajeError("En el campo salario actual solo debe digitar números");
      document.getElementById("salario_actual").focus();
      return false;
    }

    if ((salario_actual*1) < 0) {
      this.showMensajeError("En el campo salario actual no puede digitar un valor negativo");
      document.getElementById("salario_actual").focus();
      return false;
    }

    if ((salario_actual*1) > 100000000) {
      this.showMensajeError("En el campo salario actual debe digitar un valor menor $100.000.000");
      document.getElementById("salario_actual").focus();
      return false;
    }

    return true;
  }


  validarFechaIngreso(fecha_ingreso): boolean {

    if (fecha_ingreso.length <= 0) {
      this.showMensajeError("El campo fecha de ingreso es obligatorio");
      document.getElementById("fecha_ingreso").focus();
      return false;
    }

    var valorinput = fecha_ingreso;
    var fecha = fecha_ingreso.split('-');
    var fechaFormat = new Date(fecha[0], fecha[1] - 1, fecha[2], 0, 0, 0);

    var regExpFormatoFecha = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/

    if (isNaN(fechaFormat.getTime()) || (!regExpFormatoFecha.test(valorinput))) {
      this.showMensajeError("Formato de fecha incorrecto");
      document.getElementById("fecha_ingreso").focus();
      return false;
    }

    var fechaActual = new Date();
    var fechaActualFormat = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate(), 0, 0, 0);

    if (fechaFormat >= fechaActualFormat) {
      this.showMensajeError("La fecha de ingreso no puede ser igual a la del dia de hoy o superior");
      document.getElementById("fecha_ingreso").focus();
      return false;
    }

    return true;
  }

  showMensajeExito(mensaje) {

    document.getElementById("mensajeSolicitud").style.color = "green";
    document.getElementById("mensajeSolicitud").innerHTML = mensaje;

    setTimeout(function () {
      document.getElementById("mensajeSolicitud").innerHTML = "";
    }, 4000)
  }

  showMensajeError(mensaje) {
    document.getElementById("mensajeSolicitud").style.color = "red";
    document.getElementById("mensajeSolicitud").innerHTML = mensaje;

    setTimeout(function () {
      document.getElementById("mensajeSolicitud").innerHTML = "";
    }, 4000)
  }

  validarRespuestaSolicitud(nit_empresa, nombre, salario_actual, fecha_ingreso){

    if(this.validarCampos(nit_empresa, nombre, salario_actual, fecha_ingreso)){

      if(!this.validarSalarioMayor800(salario_actual)){
        this.showMensajeError("Solicitud RECHAZADA. Su salario es menor a $800.000");
        return false;
      }
      
      if(!this.validarTrabajoMasDeAnoMedio(fecha_ingreso)){
        this.showMensajeError("Solicitud RECHAZADA. La fecha de ingreso no evidencia más de año y medio");
        return false;
      }

      if((salario_actual*1) >= 800000 && (salario_actual*1) < 1000000){
        this.showMensajeExito("Solicitud APROBADA. Su valor aprobado será de $5.000.000");
      }

      if((salario_actual*1) >= 1000000 && (salario_actual*1) < 4000000){
        this.showMensajeExito("Solicitud APROBADA. Su valor aprobado será de $20.000.000");
      }

      if((salario_actual*1) >= 4000000){
        this.showMensajeExito("Solicitud APROBADA. Su valor aprobado será de $50.000.000");
      }
    }
  }

  validarTrabajoMasDeAnoMedio(fecha_ingreso){

    var fecha = fecha_ingreso.split('-');
    var fechaFormat = new Date(fecha[0], fecha[1] - 1, fecha[2], 0, 0, 0);
    var fechaMasAnoMedio = new Date(2017, 11, 30, 0, 0, 0);
    if (fechaFormat > fechaMasAnoMedio) {
      return false;
    }

    return true;
  }

  validarSalarioMayor800(salario_actual){

    if ((salario_actual*1) < 800000) {
      return false;
    }

    return true;
  }

}
