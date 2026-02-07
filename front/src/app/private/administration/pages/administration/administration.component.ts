import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent {

  constructor(
    private _breadcrumbService: BreadcrumbService
  ) {
    this._breadcrumbService.setBreadCrumb(
      [
        {
          label: 'Administration',
          link: 'private/administration'
        }
      ]
    )
  }
}
