import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlfqComponent } from './mlfq.component';

describe('MlfqComponent', () => {
  let component: MlfqComponent;
  let fixture: ComponentFixture<MlfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MlfqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MlfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
