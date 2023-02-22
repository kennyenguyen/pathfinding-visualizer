import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixgridComponent } from './matrixgrid.component';

describe('MatrixgridComponent', () => {
  let component: MatrixgridComponent;
  let fixture: ComponentFixture<MatrixgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixgridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
