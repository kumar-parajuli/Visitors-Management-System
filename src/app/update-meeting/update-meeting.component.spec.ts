import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMeetingComponent } from './update-meeting.component';

describe('UpdateMeetingComponent', () => {
  let component: UpdateMeetingComponent;
  let fixture: ComponentFixture<UpdateMeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMeetingComponent]
    });
    fixture = TestBed.createComponent(UpdateMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
