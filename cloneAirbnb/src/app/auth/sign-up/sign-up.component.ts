import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  singUp: FormGroup;
  passwordDisplay = true;
  months: number[];
  days: number[];
  years: number[];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.months = [];
    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }

    this.days = [];
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }

    this.years = [];
    for (let i = 2019; i >= 1900; i--) {
      this.years.push(i);
    }

    this.singUp = this.fb.group({
      userEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
          )
        ]
      ],
      userFirstName: [
        '',
        [
          Validators.required,
          Validators.pattern('[가-힣]{1,4}|[a-zA-Z. ]*[a-zA-Z]{1,60}$')
        ]
      ],
      userLastName: [
        '',
        [
          Validators.required,
          Validators.pattern('[가-힣]{1,4}|[a-zA-Z. ]*[a-zA-Z]{1,60}$')
        ]
      ],
      userPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9d$@$!%*?&].{8,}'
          )
        ]
      ],
      monthSelector: ['', [Validators.required]],
      daySelector: ['', [Validators.required]],
      yearSelector: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(1);
  }

  inputDivClicked(inputDiv: HTMLDivElement) {
    inputDiv.style.border = '1px solid #87CEFA';
  }

  inputDivUnclicked(inputDiv: HTMLDivElement) {
    inputDiv.style.border = '1px solid #bbb';
  }

  passwordClicked() {
    this.passwordDisplay = false;
  }

  get userEmail() {
    return this.singUp.get('userEmail');
  }

  get userFirstName() {
    return this.singUp.get('userFirstName');
  }

  get userLastName() {
    return this.singUp.get('userLastName');
  }

  get userPassword() {
    return this.singUp.get('userPassword');
  }
}
