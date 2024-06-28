import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateTimeFormatPipe} from "../pipes/date-time-format.pipe";
import {SearchTablePipe} from "../pipes/search-table.pipe";

// Importa otros componentes y directivas compartidas aquí

@NgModule({
  declarations: [
    SearchTablePipe,
    // Declara otros componentes y directivas aquí
  ],
  imports: [
    CommonModule,
    DateTimeFormatPipe
  ],
  exports: [
    DateTimeFormatPipe,
    SearchTablePipe,
    // Exporta otros componentes y directivas aquí
  ]
})
export class SharedModule {}
