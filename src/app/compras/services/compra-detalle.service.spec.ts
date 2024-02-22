import { TestBed } from '@angular/core/testing';

import { CompraDetalleService } from './compra-detalle.service';

describe('CompraDetalleService', () => {
  let service: CompraDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
