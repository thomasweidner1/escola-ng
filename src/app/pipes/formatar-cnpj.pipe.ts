import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarCnpj'
})
export class FormatarCnpjPipe implements PipeTransform {

    transform(cnpj: string, ...args: unknown[]): unknown {
    if(cnpj.length === 18)
      return cnpj;

    return cnpj.substring(0, 2) + "." + cnpj.substring(2, 5) + "." + cnpj.substring(5, 8) + "/" + cnpj.substring(8, 12) + "-" + cnpj.substring(12, 14);
  }

}

// 82.575.812/0001-20