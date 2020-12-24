import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryPostsComponent } from './masonry-posts.component';

describe('MasonryPostsComponent', () => {
  let component: MasonryPostsComponent;
  let fixture: ComponentFixture<MasonryPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasonryPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonryPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
