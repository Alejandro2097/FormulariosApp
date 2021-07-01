import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {


  get emailErrorMsg():string{
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required){
      return 'Email es obligatorio';
    }else if(errors?.pattern){
      return 'El valor ingresado no tiene formato de correo electronico';
    }else if(errors?.emailTomado){
      return 'El email ya fue tomado';
    }
    return 'Holis';
  }
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, ]]
  },{
    validators: [ this.validatorService.camposIguales('password', 'password2') ]
  });
  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private emailValidator: EmailValidatorService) { }

          
  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Alejandro Huertas',
      email: 'test1@test.com',
      username: 'Krauser',
      password: '123456',
      password2: '123456'
    })
  }
  campoNoValido( campo:string){
    return this.miFormulario.get(campo)?.invalid
          && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched()
  }
}
