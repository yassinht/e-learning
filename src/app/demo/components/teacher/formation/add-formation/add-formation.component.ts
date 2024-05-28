import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Formation } from 'src/app/demo/api/formation'; // Assuming Formation interface
import { FormationService } from 'src/app/demo/service/formation.service';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.scss'],
  providers: [MessageService, FormationService], // Provide the MessageService and FormationService
})
export class AddFormationComponent implements OnInit {
  formations: Formation[] = [];
  formation: Formation | null = null;
  formationDialog: boolean = false;
  deleteFormationDialog: boolean = false; // Corrected property name
  selectedFormations: Formation[] = [];
  submitted: boolean = false;

  cols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },
    { field: 'image', header: 'Image' },
    { field: 'cours', header: 'Cours' },
    { field: 'actions', header: 'Actions' }
  ];

  constructor(private formationService: FormationService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadFormations();
  }

  loadFormations() {
    this.formationService.getFormations().subscribe((data) => {
      this.formations = data;
    });
  }

  openNew() {
    this.formation = {
      name: '',
      description: '',
      image: '',
      cours: [],
      createdBy: localStorage.getItem('id_teacher') || ''
    };
    this.submitted = false;
    this.formationDialog = true;
  }

  deleteSelectedFormations() {
    if (this.selectedFormations.length === 1) {
      this.deleteFormation(this.selectedFormations[0]);
    } else if (this.selectedFormations.length > 1) {
      this.deleteFormationDialog = true; // Corrected property name
    }
  }

  confirmDeleteSelected() {
    this.deleteFormationDialog = false; // Corrected property name

    const selectedIds = this.selectedFormations.map(formation => formation._id);
    this.formationService.deleteFormations(selectedIds).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Formations Deleted', life: 3000 });
        this.loadFormations();
        this.selectedFormations = [];
      },
      (error) => {
        console.error(error);
        // Handle error, display an error message, etc.
      }
    );
  }
  
  editFormation(formation: Formation) {
    this.formation = { ...formation };
    this.formationDialog = true;
  }

  deleteFormation(formation: Formation) {
    this.deleteFormationDialog = true; // Corrected property name
    this.formation = { ...formation };
  }

  confirmDelete() {
    this.deleteFormationDialog = false; // Corrected property name
    if (this.formation) {
      this.formationService.deleteFormation(this.formation._id).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Formation Deleted', life: 3000 });
        this.loadFormations();
        this.formation = null;
      });
    }
  }

  hideDialog() {
    this.formationDialog = false;
    this.submitted = false;
  }

  saveFormation() {
    this.submitted = true;
    if (this.formation?.name?.trim() && this.formation?.description?.trim()) {
      this.formationService.addFormation(this.formation).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Formation Created', life: 3000 });
          this.loadFormations();
          this.formationDialog = false;
          this.formation = null;
        },
        (error) => {
          console.error('Error:', error);
          // Handle error
        }
      );
    }
  }
}