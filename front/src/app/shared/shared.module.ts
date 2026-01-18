import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ToastComponent } from './toast/toast/toast.component';
import { InputErrorDirective } from './form-validation/input-error.directive';
import { InputComponent } from './components/input/input.component';
import { LoaderComponent } from './components/loader/loader.component';

import localeFr from '@angular/common/locales/fr';
import { RoundPipe } from './pipes/round/round.pipe';
import { SelectComponent } from './components/select/select.component';
import { NgxEchartsModule } from 'ngx-echarts';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    ButtonComponent,
    TableComponent,
    ToggleButtonComponent,
    DatePickerComponent,
    ToastComponent,
    InputErrorDirective,
    InputComponent,
    RoundPipe,
    SelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    LoaderComponent
  ],
  exports : [
    ReactiveFormsModule,
    ButtonComponent,
    RouterModule,
    ToggleButtonComponent,
    FontAwesomeModule,
    DatePickerComponent,
    ToastComponent,
    InputErrorDirective,
    InputComponent,
    FontAwesomeModule,
    RoundPipe,
    SelectComponent,
    NgxEchartsModule,
    LoaderComponent
  ],
  providers :[
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
})
export class SharedModule { }
