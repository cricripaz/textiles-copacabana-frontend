import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeDye',
  pure: false
})
export class TypeDyePipe implements PipeTransform {

  transform(value : number) : any {
    if (value === 10 ){
      return 'COLORANTE'
    }else if (value === 20){
      return 'ENVASE'
    }else if (value ===  30){
      return 'QUIMICO'
    }
  }

}
