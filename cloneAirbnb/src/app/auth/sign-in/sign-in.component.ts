import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { SignInObj } from 'src/app/core/interface/signIn.interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  singIn: FormGroup;
  previousUrl: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private urlRemember: UrlRememberService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.singIn = this.fb.group({
      userEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
          )
        ]
      ],
      userPassword: ['', [Validators.required]]
    });
  }

  onSubmit(userId: HTMLInputElement, userPassword: HTMLInputElement) {
    this.previousUrl = this.urlRemember.currentUrl;

    const payload: SignInObj = {
      username: userId.value,
      password: userPassword.value
    };

    this.authService.getToken(payload).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate([this.previousUrl]);
      },
      err => {
        console.log('fail', err);
      }
    );
  }

  inputDivClicked(inputDiv: HTMLDivElement) {
    inputDiv.style.border = '1px solid #87CEFA';
  }

  inputDivUnclicked(inputDiv: HTMLDivElement) {
    inputDiv.style.border = '1px solid #bbb';
  }

  get userEmail() {
    return this.singIn.get('userEmail');
  }

  get userPassword() {
    return this.singIn.get('userPassword');
  }
}
