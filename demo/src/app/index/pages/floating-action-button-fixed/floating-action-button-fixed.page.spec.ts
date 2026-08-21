import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloatingActionButtonFixedPage } from './floating-action-button-fixed.page';
import { testConfig } from '../../../../../util/test.config';

describe('FloatingActionButtonPage', () => {
  let component: FloatingActionButtonFixedPage;
  let fixture: ComponentFixture<FloatingActionButtonFixedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(FloatingActionButtonFixedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
