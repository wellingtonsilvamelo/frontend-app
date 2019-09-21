import { EstadoBr } from './../model/estado-br';
import { DropdownService } from './../services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { catchError, tap, map, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-form-data-driven',
  templateUrl: './form-data-driven.component.html',
  styleUrls: ['./form-data-driven.component.css']
})
export class FormDataDrivenComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdown: DropdownService,
    private verificaEmailService: VerificaEmailService,
    private cepService: ConsultaCepService
    ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email], this.validarEmail.bind(this)],
      senha: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmarSenha: [null, [FormValidations.equalTo('senha')]],
    });    
  }

  onSubmit() {

    let valueSubmit = Object.assign({}, this.formulario.value);

    if (this.formulario.valid){
      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .pipe(
        map(res => res)
      ).subscribe(dados => {
        console.log(dados);
        console.log(this.formulario.valid);
        this.formulario.enable();
        this.formulario.reset();
      },
      (error: any) => alert('Error'));
    } else {
      this.verificarValidacaoForm(this.formulario);
      this.formulario.enable();
    }

  }

  reset(){
    this.formulario.reset();
  }

  applyCssErr(field: string){
    return {
      'is-invalid': this.isInvalidAndTouched(field)
    }
  }

  isInvalidAndTouched(field: string){
    return this.formulario.get(field).invalid && (this.formulario.get(field).touched || this.formulario.get(field).dirty);
  }

  verificarValidacaoForm(form: FormGroup){
    Object.keys(form.controls).forEach(element => {
      const control = form.get(element);
      control.markAsTouched();
      if(control instanceof FormGroup){
        this.verificarValidacaoForm(control);
      }
    });
  }

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(
        map(exists => exists ? { emailInvalid : true } : null)
      );
  }
}
