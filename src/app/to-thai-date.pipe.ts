import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'toThaiDate'
})
export class ToThaiDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    moment.locale('th');
    if (moment(value, 'YYYY-MM-DD').isValid() && value.length <= 10) {
      const thaiDate = `${moment(value).format('DD MMM')} ${moment(value).get('year') + 543}`;
      return thaiDate;
    } else if (moment(value, 'x').isValid()) {
      const thaiDate = `${moment(value, 'x').format('DD MMM')} ${moment(value, 'x').get('year') + 543}`;
      return thaiDate;
    } else {
      return '-';
    }

  }

}
