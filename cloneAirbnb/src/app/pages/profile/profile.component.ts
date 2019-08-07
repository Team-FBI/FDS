import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
  userId: string;
  userNameFromServer: string;
  userEmailFromServer: string;
  userFirstNameFromServer: string;
  userLastNameFromServer: string;
  userDescriptionFromServer: string;
  userImageFromServer: string;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.http.get(`${this.appUrl}/accounts/user/${this.userId}/`).subscribe(
      (res: any) => {
        console.log(res);
        this.userNameFromServer = res.username;
        this.userEmailFromServer = res.email;
        this.userFirstNameFromServer = res.first_name;
        this.userLastNameFromServer = res.last_name;
        this.userDescriptionFromServer = res.description;
        // this.userImageFromServer = res.image;
      },
      err => {},
      () => {
        this.profile = this.fb.group({
          userName: [this.userNameFromServer, [Validators.required]],
          userEmail: [
            this.userEmailFromServer,
            [
              Validators.required,
              Validators.pattern(
                '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
              )
            ]
          ],
          userFirstName: [
            this.userFirstNameFromServer,
            [
              Validators.required,
              Validators.pattern('[가-힣]{1,4}|[a-zA-Z. ]*[a-zA-Z]{1,60}$')
            ]
          ],
          userLastName: [
            this.userLastNameFromServer,
            [
              Validators.required,
              Validators.pattern('[가-힣]{1,4}|[a-zA-Z. ]*[a-zA-Z]{1,60}$')
            ]
          ]
        });
      }
    );

    this.profile = this.fb.group({
      userName: [this.userNameFromServer, [Validators.required]],
      userEmail: [
        this.userEmailFromServer,
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
          )
        ]
      ],
      userFirstName: [
        this.userFirstNameFromServer,
        [
          Validators.required,
          Validators.pattern('[가-힣]{1,4}|[a-zA-Z. ]*[a-zA-Z]{1,60}$')
        ]
      ],
      userLastName: [
        this.userLastNameFromServer,
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
  ) {
    const payload = {
      username: userName.value,
      email: userEmail.value,
      first_name: userFirstName.value,
      last_name: userLastName.value,
      description: userDescription.value,
      image: userImage.value
    };

    this.http
      .patch(`${this.appUrl}/accounts/user/${this.userId}/`, payload)
      .subscribe(res => {
        console.log(res);
      });
  }

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
