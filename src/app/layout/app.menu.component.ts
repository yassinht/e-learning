import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        // Fetch role from localStorage
        const role = localStorage.getItem('role');

        // Define menus based on the role
        switch (role) {
            case 'student':
                this.loadStudentMenus();
                break;
            case 'teacher':
                this.loadTeacherMenus();
                break;
            case 'admin':
                this.loadAdminMenus();
                break;
            default:
                // Handle default case here
                break;
        }
    }

    loadStudentMenus() {
        this.model = [
            {
                label: 'student',
                items: [
                    { label: 'cours', icon: 'pi pi-fw pi-id-card', routerLink: ['/student/cours'] },
                    { label: 'formations', icon: 'pi pi-fw pi-home', routerLink: ['/student/formations'] },
                    { label: 'Abonnements', icon: 'pi pi-fw pi-check-square', routerLink: ['/student/Abonnements'] },
                    { label: 'quiz', icon: 'pi pi-fw pi-home', routerLink: ['/student/quiz'] },
                    { label: 'profil', icon: 'pi pi-fw pi-home', routerLink: ['/student/profil'] },
                    { label: 'teachers', icon: 'pi pi-fw pi-home', routerLink: ['/student/teachers'] }


                ]
            },
            {
                label: 'Content Management',
                items: [
                    { label: 'Logout', icon: 'pi pi-fw pi-id-card', routerLink: ['/dashboard/pages/team'] },
                ]
            }
        ];
    }

    loadTeacherMenus() {
        this.model = [
            {
                label: 'teacher',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Content Management',
                items: [
                    { label: 'Quiz', icon: 'pi pi-fw pi-id-card', routerLink: ['/teacher/quiz'] },
                    { label: 'Cours', icon: 'pi pi-fw pi-id-card', routerLink: ['/teacher/cours'] },
                    { label: 'Formations', icon: 'pi pi-fw pi-id-card', routerLink: ['/teacher/formation'] },
                    { label: 'Students', icon: 'pi pi-fw pi-check-square', routerLink: ['/teacher/student/'] },
                    { label: 'profil', icon: 'pi pi-fw pi-check-square', routerLink: ['/teacher/profil'] },
                    { label: 'my-quizs', icon: 'pi pi-fw pi-check-square', routerLink: ['/teacher/my-quizs'] }


                ]
            }
        ];
    }
    

    loadAdminMenus() {
        this.model = [
            {
                label: 'admin',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Content Management',
                items: [
                    { label: 'Categories', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/ad-category'] },
                    { label: 'Students', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/ad-student'] },
                    { label: 'Teachers', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/ad-teacher'] },


                ]
            }
        ];
    }
}
