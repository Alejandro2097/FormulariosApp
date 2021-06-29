import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormualrio') miFormulario!: NgForm;

  initForm = {
    producto: 'RTX 3090TI',
    precio: 1500,
    existencias: 500
  }
  constructor() { }

  ngOnInit(): void {
  }
  nombreValido():boolean{
    return this.miFormulario?.controls.producto?.invalid 
          && this.miFormulario?.controls.producto?.touched;
  }
  precioValido():boolean{
    return this.miFormulario?.controls.precio?.value < 0
    && this.miFormulario?.controls.precio?.touched;
  }

  //guardar(miFormualrio:NgForm){
  guardar(){
    //console.log(this.miFormulario);
    console.log('Posteo correcto');
    this.miFormulario.resetForm({
      precio: 0,
      existencias: 0
    });
  }
}
