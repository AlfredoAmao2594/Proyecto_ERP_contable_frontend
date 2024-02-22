import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotasComponent } from './modal-notas.component';

describe('ModalNotasComponent', () => {
  let component: ModalNotasComponent;
  let fixture: ComponentFixture<ModalNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
