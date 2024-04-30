import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleIdToName',
  standalone: true
})
export class RoleIdToNamePipe implements PipeTransform {

  transform(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'admin';
      case 2:
        return 'operador';
      case 3:
        return 'tintor';
      default:
        return 'Desconocido'; // Puedes cambiar este retorno para manejar IDs desconocidos como prefieras
    }
  }

}
