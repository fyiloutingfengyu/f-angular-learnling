import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastService } from 'ng-zorro-antd-mobile';
import { CommonService } from '../../shared/services/common.service';

// 请求地址
const baseUrl = environment.baseUrl;

@Injectable()
export class RequestService {
  constructor(private http: HttpClient, public toast: ToastService, private commonService: CommonService) {
  }

  public request(reqConfig): Observable<any> {
    reqConfig = Object.assign({isShowLoading: true}, reqConfig);

    // 统一加上服务端前缀
    let url = reqConfig.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = baseUrl + url;
    }
    // tslint:disable-next-line
    let newReq = JSON.parse(JSON.stringify(reqConfig));

    newReq.url = url;

    // 此处设置额外的头部，token常用于登陆令牌
    if (!reqConfig.cancelToken) {
      const accessToken = localStorage.getItem('Authorization');
      if (!accessToken) {
        this.commonService.toLogin();
      } else {
        // todo f
        newReq.options.headers = newReq.headers.set('Authorization', accessToken);
      }
    }
    // todo f 添加和移除loading
    if (reqConfig.isShowLoading) {
      // this.toast.loading('Loading...', 0);
    }
    return this.http.request(newReq.method, newReq.url, newReq.options);
  }
}
