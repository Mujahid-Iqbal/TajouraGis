import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormSubmitted?: boolean;
  public loading: boolean = false;
  error?: string;
  constructor(
    public fb: FormBuilder,
    private router: Router,
     private authService: AuthService,
     public toastrService: ToastrService,
     ) {
      this.authService.isLogin =false
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }, {

      // validator: MustMatch('password', 'confirm_password'),

    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {

  }

  onLoginSubmit(): void {
    this.loading = true
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.GetAuthToken(userName, password)
      .pipe(first())
      .subscribe((data: any) => {

        this.router.navigate(['/search']);
        this.loading = false
      },
        error => {
          this.loading = false
          if (error.status === 400) {
            if ('non_field_errors' in error.error) {
              this.error = error.error.non_field_errors[0];
              this.showError(this.error)
            }
          }
        });
  }

  public showError(error: any): void {
    this.toastrService.error(`${error}`);
  }
}

