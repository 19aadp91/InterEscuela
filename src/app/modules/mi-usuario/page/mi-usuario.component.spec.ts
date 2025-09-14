import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiUsuarioComponent } from './mi-usuario.component';

describe('MiUsuarioComponent', () => {
  let component: MiUsuarioComponent;
  let fixture: ComponentFixture<MiUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
