import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendedPostsComponent } from './recomended-posts.component';

describe('RecomendedPostsComponent', () => {
  let component: RecomendedPostsComponent;
  let fixture: ComponentFixture<RecomendedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendedPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
