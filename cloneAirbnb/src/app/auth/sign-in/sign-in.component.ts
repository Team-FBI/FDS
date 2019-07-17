import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  singIn: FormGroup;
  previousUrl: string;

  constructor(private fb: FormBuilder, private location: Location) {}

  ngOnInit() {
    this.singIn = this.fb.group({
      userEmail: ['', [Validators.required]],
      userPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.location.back();
  }

  inputDivClicked(inputDiv: HTMLDivElement) {
    inputDiv.style.border = '1px solid #87CEFA';
  }

  inputDivUnclicked(inputDiv: HTMLDivElement) {
    inputDiv.style.border = '1px solid #bbb';
  }
}
