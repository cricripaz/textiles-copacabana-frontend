import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchTablePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if (!args) return value;
    args = args.toString().toLowerCase()

    return value.filter(
      (item : any) => {
      return JSON.stringify(item).toLowerCase().includes(args)
    }
    )


  }

}
