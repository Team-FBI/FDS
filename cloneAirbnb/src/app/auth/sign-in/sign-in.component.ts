import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { SignInObj } from 'src/app/core/interface/signIn.interface';
import { MenuService } from 'src/app/core/service/menu.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  singIn: FormGroup;
  previousUrl: string;
  signInFail = false;
  menuOpen = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private urlRemember: UrlRememberService,
    private authService: AuthService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.singIn = this.fb.group({
      userEmail: ['', [Validators.required]],
      userPassword: ['', [Validators.required]]
    });

    this.menuService.menuOpen.subscribe((booleanValue: boolean) => {
      this.menuOpen = booleanValue;
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
