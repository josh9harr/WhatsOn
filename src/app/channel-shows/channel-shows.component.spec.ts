import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelShowsComponent } from './channel-shows.component';

describe('ChannelShowsComponent', () => {
  let component: ChannelShowsComponent;
  let fixture: ComponentFixture<ChannelShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
