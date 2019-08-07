import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: FormGroup;
  passwordDisplay = true;
  appUrl: string = environment.appUrl;
  previousUrl: string;
  userNameDuplicate: boolean;
  userEmailDuplicate: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profile = this.fb.group({
      userName: ['', [Validators.required]],
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
      ]
    });
  }

  deleteUserNameWarningMessage() {
    this.userNameDuplicate = false;
  }

  deleteEmailWarningMessage() {
    this.userEmailDuplicate = false;
  }

  inputDivClicked(inputDiv: HTMLDivElement) {
    inputDiv.style.border = '1px solid #87CEFA';
  }

  inputDivUnclicked(inputDiv: HTMLDivElement) {
    inputDiv.style.border = '1px solid #f1f1f1';
  }

  passwordClicked() {
    this.passwordDisplay = false;
  }

  onSubmit(
    userName: HTMLInputElement,
    userEmail: HTMLInputElement,
    userFirstName: HTMLInputElement,
    userLastName: HTMLInputElement,
    userDescription: HTMLInputElement,
    userImage: HTMLInputElement
  ) {}

  get userName() {
    return this.profile.get('userName');
  }

  get userEmail() {
    return this.profile.get('userEmail');
  }

  get userFirstName() {
    return this.profile.get('userFirstName');
  }

  get userLastName() {
    return this.profile.get('userLastName');
  }

  get userPassword() {
    return this.profile.get('userPassword');
  }

  get userDescription() {
    return this.profile.get('userDescription');
  }

  get userImage() {
    return this.profile.get('userImage');
  }
}
