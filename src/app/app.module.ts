import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon'
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { NotasComponent } from './notas/notas.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalProductosComponent } from './components/modal-productos/modal-productos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalProveedoresComponent } from './proveedores/components/modal-proveedores/modal-proveedores.component';
import { ModalClientesComponent } from './clientes/components/modal-clientes/modal-clientes.component';
import { MatCardModule } from '@angular/material/card';
import { ModalKardexComponent } from './notas/modal-kardex/modal-kardex.component';
import { MatSelectModule } from '@angular/material/select';
import { ModalNotasComponent } from './notas/modal-notas/modal-notas.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ComprasComponent } from './compras/compras.component';
import { ModalComprasComponent } from './compras/components/modal-compras/modal-compras.component';
import { ModalNotasServiciosComponent } from './compras/components/modal-notas-servicios/modal-notas-servicios.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import { VentasComponent } from './ventas/ventas.component';
import { ModalVentasComponent } from './ventas/components/modal-ventas/modal-ventas.component';
import { ModalNotasServiciosVentasComponent } from './ventas/components/modal-notas-servicios-ventas/modal-notas-servicios-ventas.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    NavbarComponent,
    HomeComponent,
    CustomersComponent,
    ProvidersComponent,
    PageNotFoundComponent,
    ProveedoresComponent,
    NotasComponent,
    ModalProductosComponent,
    ModalProveedoresComponent,
    ModalClientesComponent,
    ModalKardexComponent,
    ModalNotasComponent,
    ComprasComponent,
    ModalComprasComponent,
    ModalNotasServiciosComponent,
    VentasComponent,
    ModalVentasComponent,
    ModalNotasServiciosVentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}