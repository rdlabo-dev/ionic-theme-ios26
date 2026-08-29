import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioPage } from './radio.page';
import { testConfig } from '../../../../../util/test.config';

describe('RadioPage', () => {
  let component: RadioPage;
  let fixture: ComponentFixture<RadioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(RadioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should demonstrate one radio group across multiple inset lists', () => {
    const radioGroup = fixture.nativeElement.querySelector('ion-radio-group:has(> ion-list)');

    expect(radioGroup).not.toBeNull();
    expect(radioGroup.querySelectorAll(':scope > ion-list')).toHaveLength(2);
    expect(radioGroup.querySelectorAll(':scope > ion-list > ion-item-group')).toHaveLength(2);
  });
});
