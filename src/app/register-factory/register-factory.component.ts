import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register-factory',
  imports: [StepsModule , ButtonModule , ReactiveFormsModule , CommonModule],
  templateUrl: './register-factory.component.html',
  styleUrl: './register-factory.component.css'
})
export class RegisterFactoryComponent {
  items: MenuItem[] | undefined;
  active: number = 0;
  formStep1: FormGroup;
  selectedFiles: { [key: string]: string | File } = {};  


  constructor(private apiService: ApiService) {
    this.formStep1 = new FormGroup({
      // Sección 1
      comercialName: new FormControl('', Validators.required),
      socialRazon: new FormControl('', Validators.required),
      foundation_year: new FormControl('', Validators.required),
      processing_type: new FormControl('', Validators.required),
      nroEmployeeActivity: new FormControl('', Validators.required),
      representName: new FormControl('', Validators.required),
      charge: new FormControl('', Validators.required),
      numberIdentification: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      nameDirection: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      social_facebook: new FormControl('', Validators.required),
      social_instagram: new FormControl('', Validators.required),
      social_linkedin: new FormControl('', Validators.required),

      // Sección 2
      productsDescription: new FormControl('', Validators.required),
      areaGeographics: new FormControl('', Validators.required),
      capacityProduction: new FormControl(''), 
      documentIdentificationRepresentLegal: new FormControl('', Validators.required),
      documentNITorRUC: new FormControl('', Validators.required),
      documentLegalCertification: new FormControl(''),
      certificationExistencia: new FormControl(''),
      certificationQuality: new FormControl(''),
      licenseOperation: new FormControl(''),
      consent_privacy_policy: new FormControl(false, Validators.requiredTrue),
      consent_terms_conditions: new FormControl(false, Validators.requiredTrue),
      signal: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.items = [
      { label: 'Datos Generales' },
      { label: 'Datos de la Planta' },
    ];
  }

  goToStep(step: number) {
    if (step === 1 && this.isSection1Valid()) {
      this.active = step;
    } else if (step === 2 && this.isSection2Valid()) {
      this.active = step;
    }
  }

  isSection1Valid(): boolean {
    return this.formStep1.get('comercialName')!.valid &&
      this.formStep1.get('socialRazon')!.valid &&
      this.formStep1.get('foundation_year')!.valid &&
      this.formStep1.get('processing_type')!.valid &&
      this.formStep1.get('nroEmployeeActivity')!.valid &&
      this.formStep1.get('representName')!.valid &&
      this.formStep1.get('charge')!.valid &&
      this.formStep1.get('numberIdentification')!.valid &&
      this.formStep1.get('email')!.valid &&
      this.formStep1.get('phone')!.valid &&
      this.formStep1.get('nameDirection')!.valid &&
      this.formStep1.get('city')!.valid &&
      this.formStep1.get('country')!.valid &&
      this.formStep1.get('website')!.valid &&
      this.formStep1.get('social_facebook')!.valid &&
      this.formStep1.get('social_instagram')!.valid &&
      this.formStep1.get('social_linkedin')!.valid;
  }

  isSection2Valid(): boolean {
    return this.formStep1.get('productsDescription')!.valid &&
      this.formStep1.get('areaGeographics')!.valid &&
      this.formStep1.get('capacityProduction')!.valid &&
      this.formStep1.get('documentIdentificationRepresentLegal')!.valid &&
      this.formStep1.get('documentNITorRUC')!.valid &&
      this.formStep1.get('documentLegalCertification')!.valid &&
      this.formStep1.get('certificationExistencia')!.valid &&
      this.formStep1.get('certificationQuality')!.valid &&
      this.formStep1.get('licenseOperation')!.valid &&
      this.formStep1.get('consent_privacy_policy')!.valid &&
      this.formStep1.get('consent_terms_conditions')!.valid &&
      this.formStep1.get('signal')!.valid;
  }

  onFileSelected(event: any, fieldName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];  
      this.selectedFiles[fieldName] = file;  // Guardar el archivo en selectedFiles
  
      const reader = new FileReader();
      
      // Validar si el archivo es una imagen o PDF
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        reader.onload = () => {
          // Cuando el archivo se ha leído, almacenamos el Base64
          const base64String = reader.result as string;
          
          // Si es una imagen o PDF, lo almacenamos como Base64
          this.selectedFiles[fieldName] = base64String.split(',')[1]; // Quitar la cabecera "data:image/png;base64," o "data:application/pdf;base64,"
          
          console.log(`Archivo convertido a Base64 para ${fieldName}:`, this.selectedFiles[fieldName]);
        };
  
        reader.readAsDataURL(file);  // Convertir el archivo a Base64
      } else {
        console.error('Tipo de archivo no soportado. Solo se permiten imágenes o PDFs.');
      }
    }
  }
  
  onSubmit() {
    console.log("Datos del formulario:", this.formStep1.value);
    console.log("Archivos seleccionados:", this.selectedFiles);
  
    // Crear el objeto params con los valores del formulario
    let params: any = {};
  
    Object.keys(this.formStep1.value).forEach(key => {
      params[key] = this.formStep1.value[key]; 
    });
  
    // Agregar archivos como Base64 en los campos correspondientes
    for (let fieldName in this.selectedFiles) {
      if (this.selectedFiles[fieldName]) {
        params[fieldName] = this.selectedFiles[fieldName]; // Base64 ya está limpio
      }
    }
  
    // Enviar la solicitud
    this.apiService.createCarries({ params }).subscribe({
      next: (response) => console.log('Formulario enviado con éxito:', response),
      error: (error) => console.error('Error al enviar el formulario:', error),
    });
  }
 
}
