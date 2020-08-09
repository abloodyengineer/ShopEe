import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductForm2Component } from './product-form2.component';

describe('ProductForm2Component', () => {
  let component: ProductForm2Component;
  let fixture: ComponentFixture<ProductForm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductForm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
