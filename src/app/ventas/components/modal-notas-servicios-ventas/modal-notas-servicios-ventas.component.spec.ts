import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotasServiciosVentasComponent } from './modal-notas-servicios-ventas.component';

describe('ModalNotasServiciosVentasComponent', () => {
  let component: ModalNotasServiciosVentasComponent;
  let fixture: ComponentFixture<ModalNotasServiciosVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNotasServiciosVentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNotasServiciosVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
