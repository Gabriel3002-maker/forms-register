import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api'; // Para el tipo de opciones
import { Select } from 'primeng/select';
import { RegisterPymesComponent } from "./register-pymes/register-pymes.component";
import { RegisterCarriesComponent } from "./register-carries/register-carries.component";
import { RegisterProducersComponent } from "./register-producers/register-producers.component";
import { RegisterFactoryComponent } from "./register-factory/register-factory.component";

interface Rol {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, Select, CommonModule, RegisterPymesComponent, RegisterCarriesComponent, RegisterProducersComponent, RegisterFactoryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';
  rols: Rol[] = [];
  formGroup!: FormGroup;
  selectedCity: string | null = null;
  dynamicFormGroup: FormGroup | undefined;

  ngOnInit() {
    this.rols = [
      { name: 'Pyme', code: 'PY' },
      { name: 'Carries', code: 'CA' },
      { name: 'Producers', code: 'PR' },
      { name: 'Processing Plants', code: 'PP' },
    ];

    this.formGroup = new FormGroup({
      selectedCity: new FormControl<Rol | null>(null)
    });

    // Inicializamos el formulario dinámico
    this.dynamicFormGroup = new FormGroup({});
  }

  onCityChange() {
    this.selectedCity = this.formGroup.value.selectedCity?.code || null;
  }

 
 

  
}
