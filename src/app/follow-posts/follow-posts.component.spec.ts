import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowPostsComponent } from './follow-posts.component';

describe('FollowPostsComponent', () => {
  let component: FollowPostsComponent;
  let fixture: ComponentFixture<FollowPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
