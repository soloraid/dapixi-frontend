import {Pipe, PipeTransform} from '@angular/core';
import {count} from 'rxjs/operators';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const str = value;
    const tempStr = str.split(' ');
    tempStr[0] = tempStr[0].split('-').reverse().join('-').concat('T');
    tempStr[1] = tempStr[1].concat(':00.000-0000');
    const creationDate = new Date(tempStr[0].concat(tempStr[1]));
    if (creationDate) {
      const seconds = Math.floor((+new Date() -  +creationDate) / 1000);
      if (seconds < 59)
      {
        return 'هم اکنون';
      }
      const intervals = {
        سال: 31536000,
        ماه: 2592000,
        هفته: 604800,
        روز: 86400,
        ساعت: 3600,
        دقیقه: 60,
        ثانیه: 1
      };
      let counter;
      // tslint:disable-next-line:forin
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          return counter + ' ' + i + ' قبل';
        }
      }
    }
    return creationDate;
  }

}
