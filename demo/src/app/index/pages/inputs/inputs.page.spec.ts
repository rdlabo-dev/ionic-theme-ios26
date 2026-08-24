import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputsPage } from './inputs.page';
import { testConfig } from '../../../../../util/test.config';

describe('InputsPage', () => {
  let component: InputsPage;
  let fixture: ComponentFixture<InputsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(InputsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render helper and error input patterns', () => {
    const element = fixture.nativeElement as HTMLElement;
    const helperInput = element.querySelector('ion-input[helpertext]');
    const errorInput = element.querySelector('ion-input[errortext]');
    const helperTextarea = element.querySelector('ion-textarea[helpertext]');
    const errorTextarea = element.querySelector('ion-textarea[errortext]');

    expect(helperInput?.getAttribute('helpertext')).toBe('This is helper text');
    expect(errorInput?.getAttribute('errortext')).toBe('This is error text');
    expect(errorInput?.classList.contains('ion-invalid')).toBe(true);
    expect(errorInput?.classList.contains('ion-touched')).toBe(true);
    expect(helperTextarea?.getAttribute('helpertext')).toBe('This is helper text');
    expect(errorTextarea?.getAttribute('errortext')).toBe('This is error text');
    expect(errorTextarea?.classList.contains('ion-invalid')).toBe(true);
    expect(errorTextarea?.classList.contains('ion-touched')).toBe(true);
  });

  it('should render outlined helper and error patterns', () => {
    const element = fixture.nativeElement as HTMLElement;
    const outlinedInputs = element.querySelectorAll('ion-input[fill="outline"]');
    const outlinedTextareas = element.querySelectorAll('ion-textarea[fill="outline"]');

    expect(outlinedInputs).toHaveLength(4);
    expect(outlinedInputs[2].getAttribute('helpertext')).toBe('This is helper text');
    expect(outlinedInputs[3].getAttribute('errortext')).toBe('This is error text');
    expect(outlinedInputs[3].classList.contains('ion-invalid')).toBe(true);
    expect(outlinedInputs[3].classList.contains('ion-touched')).toBe(true);
    expect(outlinedTextareas).toHaveLength(4);
    expect(outlinedTextareas[2].getAttribute('helpertext')).toBe('This is helper text');
    expect(outlinedTextareas[3].getAttribute('errortext')).toBe('This is error text');
    expect(outlinedTextareas[3].classList.contains('ion-invalid')).toBe(true);
    expect(outlinedTextareas[3].classList.contains('ion-touched')).toBe(true);
  });
});
