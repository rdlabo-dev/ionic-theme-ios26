import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchbarPage } from './searchbar.page';
import { testConfig } from '../../../../../util/test.config';
import { supportSeachbarCancelButtonIcon } from '../../../../../../src/searchbar';

describe('SearchbarPage', () => {
  let component: SearchbarPage;
  let fixture: ComponentFixture<SearchbarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(SearchbarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('supports refresh, cleanup, and registration again without replacing Ionic content', async () => {
    const bar = document.createElement('ion-searchbar');
    bar.className = 'ios';
    bar.cancelButtonIcon = 'first-icon';
    bar.innerHTML = '<button class="searchbar-cancel-button"><div>検索を閉じる</div></button>';
    const content = bar.querySelector('div')!;
    const text = content.firstChild;
    const support = supportSeachbarCancelButtonIcon(bar);
    expect(supportSeachbarCancelButtonIcon(bar)).toBe(support);
    expect(content.querySelector('ion-icon')?.icon).toBe('first-icon');
    bar.cancelButtonIcon = 'second-icon';
    support.refresh();
    expect(content.querySelector('ion-icon')?.icon).toBe('second-icon');
    bar.classList.add('ios-theme-disabled');
    await Promise.resolve();
    expect(content.querySelector('ion-icon')).toBeNull();
    bar.classList.remove('ios-theme-disabled');
    await Promise.resolve();
    expect(content.querySelectorAll('ion-icon').length).toBe(1);
    support.destroy();
    support.destroy();
    support.refresh();
    expect(content.querySelector('ion-icon')).toBeNull();
    expect(content.firstChild).toBe(text);
    const next = supportSeachbarCancelButtonIcon(bar);
    expect(next).not.toBe(support);
    expect(content.querySelectorAll('ion-icon').length).toBe(1);
    next.destroy();
  });
});
