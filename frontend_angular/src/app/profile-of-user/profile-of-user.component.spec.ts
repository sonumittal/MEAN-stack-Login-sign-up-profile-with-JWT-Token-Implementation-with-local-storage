import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOfUserComponent } from './profile-of-user.component';

describe('ProfileOfUserComponent', () => {
  let component: ProfileOfUserComponent;
  let fixture: ComponentFixture<ProfileOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOfUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
