import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoutesModule } from './routes/routes.module';
import { httpInterceptorProviders } from './common/http-interceptors';
import { AppComponent } from './app.component';
import { CommonService } from './shared/services/common.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutesModule,
    FormsModule,
    RouterModule
  ],
  providers: [httpInterceptorProviders, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
