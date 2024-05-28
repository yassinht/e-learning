import { Component, OnInit } from '@angular/core';
import { AbonnementService } from 'src/app/demo/service/abonnement.service';
import { CategoryService } from 'src/app/demo/service/category.service';
import { FormationService } from 'src/app/demo/service/formation.service';

@Component({
  selector: 'app-formations-list',
  templateUrl: './formations-list.component.html',
  styleUrls: ['./formations-list.component.scss']
})
export class FormationsListComponent implements OnInit {
  formations = [];
  filteredFormations = [];
  categories = [];
  searchTerm = '';
  selectedCategory : any;

  constructor( private categorService:CategoryService ,private formationService: FormationService, private abonnementService: AbonnementService) {}
  ngOnInit() {
    this.formationService.getFormations().subscribe(data => {
      this.formations = data;
      this.filteredFormations = data;
    });
    this.categorService.getCategories().subscribe(data => {
      this.categories = data.map(category => ({ label: category.name, value: category._id }));
    });
    
  }

  filterFormations() {
    this.filteredFormations = this.formations.filter(formation => {
      console.log(this.selectedCategory) 
      console.log(formation)
      return (!this.searchTerm || formation.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
             (!this.selectedCategory || formation.category.name === this.selectedCategory.label);
    });
  }
  resetDropdown() {
    this.selectedCategory = null;
    this.searchTerm = null
    this.filterFormations();
  }
  enterFormation(formation) {
    this.abonnementService.checkSubscription(formation._id).subscribe(res => {
      if (res.isValid) {
        // Logic to navigate to the formation details page
      } else {
        alert('You do not have an active subscription for this formation.');
      }
    });
  }
}