import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCoverComponent } from './playlist-cover.component';

describe('PlaylistCoverComponent', () => {
  let component: PlaylistCoverComponent;
  let fixture: ComponentFixture<PlaylistCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
