import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-products-nav',
  templateUrl: './products-nav.component.html',
  styleUrl: './products-nav.component.scss'
})
export class ProductsNavComponent {
  public linksData : {label : string, link : string[]}[] = [
    { label : 'Articles', link : ['private','products', 'article']},
    { label : 'Catégorie', link : ['private','products', 'category']}
  ]
  public activeLink : string
  constructor(
    private _router: Router
  ) {}

  ngOnInit() {
    this.setActiveLink(this._router.url);

    // Listen for navigation events and update active link accordingly
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setActiveLink(this._router.url);
    });
  }

  private setActiveLink(url: string) {
    const currentRoute = this.linksData.find(linkData =>
      url.includes(linkData.link.join('/'))
    );
    if (currentRoute) {
      this.activeLink = currentRoute.label;
    }
  }

  public navigate(linkTree: string[]): void {
    this._router.navigate(linkTree).then(() => {
      this.setActiveLink(this._router.url);
    });
  }


}
