import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { SignInObj } from 'src/app/core/interface/signIn.interface';



// 네이티브 앱 키
// 8cf99291f680339b20fcb552d490a147
// REST API 키
// 7e1bb736ba4363fcf6b5ae5016bad2ea
// JavaScript 키
// 71f4d8c641095d4ff1ba79b80a471bf5
// Admin 키
// 49e4fe1fdc604e24a147a640e020fa4e
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  singIn: FormGroup;
  previousUrl: string;
  signInFail = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private urlRemember: UrlRememberService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.singIn = this.fb.group({
      userEmail: ['', [Validators.required]],
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
        localStorage.setItem('userId', res.user);
        this.router.navigate([this.previousUrl]);
      },
      err => {
        this.signInFail = true;
        userId.value = '';
        userPassword.value = '';
      }
    );
  }

  inputDivClicked(inputDiv: HTMLDivElement) {
    inputDiv.style.border = '1px solid #87CEFA';
  }

  inputDivUnclicked(inputDiv: HTMLDivElement) {
    inputDiv.style.border = '1px solid #f1f1f1';
  }

  toSignUp() {
    this.router.navigate(['signUp']);
  }

  get userEmail() {
    return this.singIn.get('userEmail');
  }

  get userPassword() {
    return this.singIn.get('userPassword');
  }
}
