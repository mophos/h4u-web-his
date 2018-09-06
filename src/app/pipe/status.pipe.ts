import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusToTh'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 'waiting') {
      return 'รออนุมัติ';
    } else if (value === 'approved') {
      return 'อนุมัติ';
    } else if (value === 'cancel') {
      return 'ไม่อนุมัติ';
    } else if (value === 'nodata') {
      return 'ไม่มีข้อมูล';
    } else {
      return '-';
    }

  }

}


