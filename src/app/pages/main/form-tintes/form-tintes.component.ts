import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-tintes',
  templateUrl: './form-tintes.component.html',
  styleUrls: ['./form-tintes.component.scss']
})
export class FormTintesComponent implements OnInit {


  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // Define tus campos del formulario y las validaciones aquí
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // ... otros campos
    });
  }

  onSubmit() {
    // Lógica para manejar la presentación del formulario
    if (this.form.valid) {
      console.log('Formulario válido', this.form.value);
      // Puedes enviar los datos a través de un servicio, etc.
    } else {
      console.log('Formulario inválido');
    }
  }
  ngOnInit(): void {
  }

}
