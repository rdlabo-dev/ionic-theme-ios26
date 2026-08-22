import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocsPage } from './docs-page.component';
import { testConfig } from '../../../util/test.config';

describe('DocsPage', () => {
  let component: DocsPage;
  let fixture: ComponentFixture<DocsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(DocsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the generated Markdown documentation', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('article.docs-content h1')?.textContent).toContain('Special markup and classes');
    expect(element.querySelectorAll('.code-block-container pre.shiki code').length).toBeGreaterThan(0);
    expect(element.querySelector('.code-block-container code span[style*="color"]')).not.toBeNull();
    expect(element.querySelectorAll('figure.docs-example').length).toBe(7);
    const classicSearchPreview = element.querySelector('figure.docs-example > .ion-page');
    expect(classicSearchPreview?.querySelector('ion-content ion-list[inset="true"] > ion-item-group > ion-item')).not.toBeNull();
    expect(classicSearchPreview?.textContent).toContain('Recent item 10');
  });
});
