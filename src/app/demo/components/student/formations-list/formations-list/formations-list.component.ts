import { Component, OnInit } from '@angular/core';
import { AbonnementService } from 'src/app/demo/service/abonnement.service';
import { CategoryService } from 'src/app/demo/service/category.service';
import { FormationService } from 'src/app/demo/service/formation.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formations-list',
  templateUrl: './formations-list.component.html',
  styleUrls: ['./formations-list.component.scss'],
  providers: [MessageService] // Ensure MessageService is provided
})
export class FormationsListComponent implements OnInit {
  formations = [];
  filteredFormations = [];
  categories = [];
  searchTerm = '';
  selectedCategory: any;
  idStudent: string;

  constructor(
    private categorService: CategoryService,
    private formationService: FormationService,
    private abonnementService: AbonnementService,
    private messageService: MessageService, // Inject MessageService
    private router: Router // Inject Router
    ) {}

  ngOnInit() {
    this.idStudent = localStorage.getItem('id_student');

    this.formationService.getFormations().subscribe(data => {
      this.formations = data;
      this.filteredFormations = data;
    });

    this.categorService.getCategories().subscribe(data => {
      this.categories = data.map(category => ({ label: category.name, value: category._id }));
    });
  }

  filterFormations() {
    this.filteredFormations = this.formations.filter(formation =>
      (!this.searchTerm || formation.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedCategory || formation.category.name === this.selectedCategory.label)
    );
  }

  resetDropdown() {
    this.selectedCategory = null;
    this.searchTerm = '';
    this.filterFormations();
  }

  enterFormation(formation: any) {
    this.abonnementService.checkSubscription(this.idStudent).subscribe(res => {
      console.log(res); // Check response from API

      switch (res.status) {
        case 'valid':
          console.log(`Navigating to formation details for ${formation.name}`);
          this.messageService.add({
            severity: 'success',
            summary: 'Subscription Valid',
            detail: `Navigating to formation details for ${formation.name}`,
            life: 3000
          });
          this.router.navigate(['/student/formation-details', formation._id]); // Navigate to formation details

          break;
        case 'expired':
          this.messageService.add({
            severity: 'error',
            summary: 'Subscription Expired',
            detail: 'Your subscription for this formation has expired.',
            life: 3000
          });
          break;
        case 'no_subscription':
          this.messageService.add({
            severity: 'error',
            summary: 'No Active Subscription',
            detail: 'You do not have an active subscription for this formation.',
            life: 3000
          });
          break;
        default:
          console.error('Unknown subscription status:', res.status);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to check subscription status. Please try again later.',
            life: 3000
          });
          break;
      }
    }, error => {
      console.error('Error checking subscription:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to check subscription status. Please try again later.',
        life: 3000
      });
    });
  }
}
