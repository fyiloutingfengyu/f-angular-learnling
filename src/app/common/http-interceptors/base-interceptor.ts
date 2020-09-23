import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ToastService } from 'ng-zorro-antd-mobile';
import { CommonService } from '../../shared/services/common.service';

const CODE_MESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  constructor(private commonService: CommonService, private toast: ToastService) {
  }

  private checkStatus(ev: HttpResponseBase): void {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
      return;
    }

    const errorText = CODE_MESSAGE[ev.status] || ev.statusText;
    // todo f 提示错误
  }

  private handleData(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.checkStatus(ev);
    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        if (ev instanceof HttpResponse) {
          const body = ev.body;
          if (body && body.code !== 200) {
            return throwError({});
          } else {
            // 修改 `body` 内容为 `response` 内容
            // return of(new HttpResponse(Object.assign(ev, {body: body.response})));
            // 或者保持完整的数据
            return of(ev);
          }
        }
        break;
      case 401:
        this.commonService.toLogin();
        break;
      case 403:
      case 404:
      case 500:
        this.commonService.goTo(`/exception/${ ev.status }`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          /*console.warn(
            '未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起，请参考 https://ng-alain.com/docs/server 解决跨域问题',
            ev,
          );*/
        }
        break;
    }

    if (ev instanceof HttpErrorResponse) {
      return throwError(ev);
    } else {
      return of(ev);
    }
  }

  intercept(req, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      mergeMap((ev) => {
        // 允许统一对请求错误处理
        if (ev instanceof HttpResponseBase) {
          return this.handleData(ev, req, next);
        } else {
          // 若一切都正常，则后续操作
          return of(ev);
        }
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err, req, next)),
    );
  }
}

