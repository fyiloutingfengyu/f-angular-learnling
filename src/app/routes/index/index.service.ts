import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import commonApi from '../../common/api/common';
import { RequestService } from '../../common/http-interceptors/request.service';

@Injectable()
export class IndexService {
  heroesUrl = commonApi.getCode.url + '/15811561085';

  constructor(
    private http: RequestService) {
  }

  test(data: any): Observable<any> {
    return this.http.request({
      method: 'get',
      url: this.heroesUrl,
      cancelToken: true
    });
  }
}
