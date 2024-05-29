import { Component, OnInit } from '@angular/core';
import { AbonnementService } from 'src/app/demo/service/abonnement.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mes-abonnements',
  templateUrl: './mes-abonnements.component.html',
  styleUrls: ['./mes-abonnements.component.scss'],
  providers: [MessageService]
})
export class MesAbonnementsComponent implements OnInit {
  studentId
  constructor(private abonnementService: AbonnementService, private messageService: MessageService) {}

  ngOnInit(): void {
    
    this.studentId = localStorage.getItem('id_student')
    this.getAbonnementsByStudent()
  }
  noAbonnement: boolean = true;  // Assume initially no abonnement is found
  newAbonnement: any = {
    firstName: '',
    lastName: '',
    duration: null
  };
  abonnements: any[] = [];  // This should be filled with actual abonnement data
  durationOptions: any[] = [
    { label: '1 mois', value: '1 mois' },
    { label: '3 mois', value: '3 mois' },
    { label: 'annuel', value: 'annuel' }
  ];

  createAbonnement() {
    this.newAbonnement.startDate = new Date(); // Set start date to current date
    this.newAbonnement.endDate = this.calculateEndDate(this.newAbonnement.duration); // Calculate end date

    this.abonnementService.createAbonnement(this.newAbonnement).subscribe(
      (data) => {
        this.abonnements.push(data);
        this.noAbonnement = false;
        this.clearForm(); // Clear the form after successful creation
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Abonnement created successfully' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create abonnement' });
      }
    );
  }

  clearForm() {
    this.newAbonnement = {
      student: 'studentId123',  // Replace with actual student ID logic
      startDate: null,
      endDate: null,
      validated: true,
      firstName: '',
      lastName: '',
      duration: null
    };
  }
  
  calculateEndDate(duration: string): Date {
    let endDate = new Date();
    switch (duration) {
      case '1 mois':
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case '3 mois':
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case 'annuel':
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
    }
    return endDate;
  }

  getAbonnementsByStudent() {
    this.abonnementService.getAbonnementsByStudent(this.studentId).subscribe((res) => {
      this.abonnements = res[0];
      console.log(this.abonnements)
      this.noAbonnement = this.abonnements.length === 0;
    }, (error) => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to fetch abonnements'});
    });
  }
  // getAbonnementStatus(): string {
  //   const today = new Date();
  //   const endDate = new Date(abonnement.endDate);
  //   return endDate > today ? 'Active' : 'Expired';
  // }
}
