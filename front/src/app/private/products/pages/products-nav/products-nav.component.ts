import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(
    private _router : Router
  ){}
  public activeLink : string = 'Articles'

  public navigate(linkTree : string[]) :void {
    this._router.navigate(linkTree)
  }
}
