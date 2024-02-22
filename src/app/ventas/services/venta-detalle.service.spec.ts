import { TestBed } from '@angular/core/testing';

import { VentaDetalleService } from './venta-detalle.service';

describe('VentaDetalleService', () => {
  let service: VentaDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
