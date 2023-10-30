import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userRegisterForm: FormGroup;
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
    this.userRegisterForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }, {

      // validator: MustMatch('password', 'confirm_password'),

    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.userRegisterForm.controls;
  }
  ngOnInit(): void {

  }

  onResgisterSubmit(): void {
    this.loading = true
    const first_name = this.userRegisterForm.get('firstName')?.value;
    const last_name = this.userRegisterForm.get('lastName')?.value;
    const email = this.userRegisterForm.get('email')?.value;
    const username = this.userRegisterForm.get('userName')?.value;
    const password = this.userRegisterForm.get('password')?.value;
    this.authService.userRegister(first_name, last_name, email, username, password)
      .pipe(first())
      .subscribe((data: any) => {

        this.router.navigate(['/login']);
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
