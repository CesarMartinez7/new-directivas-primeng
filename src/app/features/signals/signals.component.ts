import { Component, inject } from '@angular/core';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SingleFileApiComponent } from '../../components/component-large.component';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
  AutoCompleteDropdownClickEvent,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ToastCloseEvent, ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../services/product.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Checkbox } from 'primeng/checkbox';
import { KeyFilterModule } from 'primeng/keyfilter';

import { HttpClient } from '@angular/common/http';
import { RadioButtonModule } from 'primeng/radiobutton';

import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-signals',
  imports: [
    RadioButtonModule,
    PasswordModule,
    KeyFilterModule,
    InputGroupAddonModule,
    InputGroupModule,
    AutoCompleteModule,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    InputTextModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    FormsModule,
    SelectModule,
    DatePickerModule,
    DialogModule,
    ButtonModule,
    ToggleSwitchModule,
    InputNumberModule,
    FloatLabelModule,
    Checkbox,
    SingleFileApiComponent
  ],
  templateUrl: './signals.component.html',
})
export class SignalsComponent {
  text1 = '';
  number = '';

  ingredient = '';

  

  text2 = '';

  checked = false;
  ProductosServices = inject(ProductService);
  products!: any[];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.products = this.ProductosServices.getProductsData();

    this.form = this.fb.group({
      date: '',
    });
  }

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}
  value = '';
  date = '';

  filteredCountries = ['hello world', 'dsfsdf', 'dsfsdfsf', 'dsfdsfs'];

  selectedCountry = '';

  value1 = '';
  visible = false;

  showDialog(): void {
    this.visible = true;
  }

  countries = [
    { pais: 'Estados Unidos', codigo: 'US' },
    { pais: 'Canadá', codigo: 'CA' },
    { pais: 'México', codigo: 'MX' },
    { pais: 'Brasil', codigo: 'BR' },
    { pais: 'Argentina', codigo: 'AR' },
    { pais: 'España', codigo: 'ES' },
    { pais: 'Francia', codigo: 'FR' },
    { pais: 'Alemania', codigo: 'DE' },
    { pais: 'Italia', codigo: 'IT' },
    { pais: 'Japón', codigo: 'JP' },
  ];

  confirm1(event: MouseEvent) {}

  confirm2(event: MouseEvent) {}

  show() {
    return null;
  }

  selectedCountryId = '';

  // Funcion para manejar la entrada del usuario y tomar cosas como el ID de una lista en vez del nombre

  // La funcion para manejar el tipo de click es onSelect que se encuentra en la documentacion donde se nos explica donde esta todo.

  // https://primeng.org/autocomplete#api.autocomplete.events.AutoCompleteDropdownClickEvent.originalEvent
  onClickSelectedSon(event: AutoCompleteSelectEvent) {
    // Se le pasa el event con el tipo AutoCompleteSelectEvent

    this.selectedCountryId = event.value.codigo;
    console.log(`Este es el codigo seleccionado ${this.selectedCountryId}`);
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[]).length; i++) {
      let country = (this.countries as any[])[i];
      if (country.pais.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        console.log(country.pais);
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
}
