import { NgModule } from '@angular/core';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { RoutesRoutingModule } from './routes-routing.module';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RoutesRoutingModule,
    FormsModule,
    NgZorroAntdMobileModule
  ],
  declarations: [
    FirstComponent,
    SecondComponent,
    IndexComponent
  ],
  entryComponents: []
})
export class RoutesModule {
}
