import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotasServiciosComponent } from './modal-notas-servicios.component';

describe('ModalNotasServiciosComponent', () => {
  let component: ModalNotasServiciosComponent;
  let fixture: ComponentFixture<ModalNotasServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNotasServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNotasServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
