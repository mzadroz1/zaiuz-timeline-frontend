import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {LoginRequest} from "../../models/login-request";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private loginService: LoginService
  ) {
    this.loginFormGroup = formBuilder.group(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      }
    )
  }

  ngOnInit(): void {
  }

  login() : void {
    const loginRequest: LoginRequest = {
      username: this.loginFormGroup.get('username')?.value,
      password: this.loginFormGroup.get('password')?.value
    }

    this.loginService.login(loginRequest).subscribe({
      next: response => {
        this.cookieService.set("access_token", response.access_token.toString())
      }
    })

  }
}
