import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { SolicitudPrestamoComponent } from './solicitud-prestamo/solicitud-prestamo.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    SolicitudPrestamoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
