import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { NotasComponent } from './notas/notas.component';
import { ComprasComponent } from './compras/compras.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
    { path: 'clientes', component: ClientesComponent},
    { path: 'proveedores', component: ProveedoresComponent},
    { path: 'notas', component: NotasComponent},
    { path: 'compras', component: ComprasComponent},
    { path: 'ventas', component: VentasComponent},
   
  ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
