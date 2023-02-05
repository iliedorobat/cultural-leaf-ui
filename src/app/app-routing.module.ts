import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [];
const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);

@NgModule({
    imports: [routing],
    exports: [RouterModule]
})
export class AppRoutingModule {}
