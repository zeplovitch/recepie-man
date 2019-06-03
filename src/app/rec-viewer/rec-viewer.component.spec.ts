import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecViewerComponent } from './rec-viewer.component';

describe('RecViewerComponent', () => {
  let component: RecViewerComponent;
  let fixture: ComponentFixture<RecViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
