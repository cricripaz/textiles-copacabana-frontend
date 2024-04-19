import {Component, Inject, OnInit} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {RecipeApiService} from "../../../../services/recipe-api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recipeServices: RecipeApiService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>
  ) { }

  ngOnInit(): void {
  }


  deleteRecipe() {
    let id = this.data.recipeRegistry_id;


    this.recipeServices.deleteRecipe(id).subscribe(() => {
      // Cerrar el modal
      this.dialogRef.close();

      // Mostrar el toast de éxito
      this.toast.success('Receta Eliminada Correctamente');
    }, error => {
      console.error('Error al eliminar receta:', error);
    });

  }

}
