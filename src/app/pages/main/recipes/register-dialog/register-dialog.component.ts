import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})


export class RegisterDialogComponent implements OnInit {

  ingredients: { name: string, weight: number, note: string }[] = [];

  constructor() { }

  ngOnInit(): void {

    this.ingredients.push({ name: '', weight: 0, note: '' });
  }

  onSubmit(DataUserForm: NgForm) {

    console.log(DataUserForm.value)

  }

  addIngredient() {
    this.ingredients.push({ name: '', weight: 0, note: '' });
  }

}




