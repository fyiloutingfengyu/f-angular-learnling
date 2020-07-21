import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FirstComponent} from './first/first.component';
import {SecondComponent} from './second/second.component';
import {IndexComponent} from './index/index.component';

const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'first-component', component: FirstComponent},
    {path: 'second-component', component: SecondComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
