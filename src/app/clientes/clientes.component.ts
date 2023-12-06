import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { ClienteDtp } from './models/cliente-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public loading = false;
  dataList: ClienteDtp[] = [];
  constructor(
    private serviceCliente:ClientesService,

  ){}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    this.loading = true;
    this.dataList = [];
    this.serviceCliente.getAllCLients()
      .subscribe(
        res => {
          this.dataList = res;
          this.loading = false;
        },
        err => {
          this.loading = false;
         
        }
      );
  }

}
