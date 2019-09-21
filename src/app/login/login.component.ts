import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormValidations } from '../shared/form-validations';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { User } from '../auth/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      senha: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
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
      this.user = new User();
      this.user.username = this.formulario.get('username').value;
      this.user.password = this.formulario.get('senha').value;

      this.authService.singIn(this.user).subscribe((res)=>{
        console.log("Logged in!");
        this.router.navigateByUrl('home');
      }); 
    }
  }
}
