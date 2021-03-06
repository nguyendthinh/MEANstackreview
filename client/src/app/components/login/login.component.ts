import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  processing = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.createForm()
  }

  createForm() {
    this.form = this.formBuilder.group({
      //define fields of forms
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  disableForm(){
    this.form.controls.username.disable();
    this.form.controls.password.disable();
  }

  enableForm(){
    this.form.controls.username.enable();
    this.form.controls.password.enable();
  }

  onLoginSubmit(){
    this.processing = true;
    this.disableForm();
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    this.AuthService.login(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.AuthService.storeUserData(data.token, data.user);
        setTimeout(() => {
            this.router.navigate(['/dashboard']); // Navigate to dashboard view
          }, 2000);
      }
    })
  }

  ngOnInit() {
  }

}
