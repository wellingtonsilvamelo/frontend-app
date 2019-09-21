import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormValidations } from '../shared/form-validations';
import { User } from '../auth/user';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VerificaEmailService } from '../form-data-driven/services/verifica-email.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService,
    private verificaEmailService: VerificaEmailService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]/*, this.validarEmail.bind(this)*/],
      senha: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmarSenha: [null, [FormValidations.equalTo('senha')]],
    }); 
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

  onSubmit(){
    if (this.formulario.valid){
      //TODO - Construir factory
      this.user = new User();
      this.user.fullname = this.formulario.get('nome').value;
      this.user.username = this.formulario.get('username').value;
      this.user.email = this.formulario.get('email').value;
      this.user.password = this.formulario.get('senha').value;

      this.authService.register(this.user).subscribe((res: any) => {
        this.router.navigateByUrl('login');
        this.toastr.success(res.data);
      });
    }
  }

  validarEmail(formControl: FormControl){
    /*return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(
        map(exists => exists ? { emailInvalid : true } : null)
      );*/
  }
}
