import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewCommentComponent } from './admin-view-comment.component';

describe('AdminViewCommentComponent', () => {
  let component: AdminViewCommentComponent;
  let fixture: ComponentFixture<AdminViewCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
