import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  singIn: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.singIn = this.fb.group({
      userEmail: ['', [Validators.required]],
      userPassword: ['', [Validators.required]]
    })
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
}
