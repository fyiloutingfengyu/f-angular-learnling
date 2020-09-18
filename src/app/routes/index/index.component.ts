import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  envObj = environment;
  name = '选择';
  value = new Date();

  ngOnInit(): void {

  }

  currentDateFormat(date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${ n }` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }

  onOk(result: Date): void {
    this.name = this.currentDateFormat(result);
    this.value = result;
  }

  formatIt(date: Date, form: string): string {
    const pad = (n: number) => (n < 10 ? `0${ n }` : n);
    const dateStr = `${ date.getFullYear() }-${ pad(date.getMonth() + 1) }-${ pad(date.getDate()) }`;
    const timeStr = `${ pad(date.getHours()) }:${ pad(date.getMinutes()) }`;
    if (form === 'YYYY-MM-DD') {
      return dateStr;
    }
    if (form === 'HH:mm') {
      return timeStr;
    }
    return `${ dateStr } ${ timeStr }`;
  }


}
