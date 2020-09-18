import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // NgZorroAntdMobileModule,
    RoutesModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
