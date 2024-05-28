import { FaqModule } from './demo/components/view/faq/faq.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { TeacherDashboardComponent } from './demo/components/teacher/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './demo/components/student/student-dashboard/student-dashboard.component';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { AdminDashboardComponent } from './demo/components/admin/admin-dashboard/admin-dashboard.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'dashboard', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },

                ]
            },
            {path:'login',component:LoginComponent},

            {
              path: 'admin', component:AdminDashboardComponent ,
              children: [
                { path: '', loadChildren: () => import('./demo/components/teacher/add-quiz/add-quiz.module').then(m => m.AddQuizModule) },
                { path: 'ad-category', loadChildren: () => import('./demo/components/admin/ad-category/ad-category.module').then(m => m.AdCategoryModule) },
                { path: 'ad-student', loadChildren: () => import('./demo/components/admin/ad-student/ad-student.module').then(m => m.AdStudentModule) },
                { path: 'ad-teacher', loadChildren: () => import('./demo/components/admin/ad-teacher/ad-teacher.module').then(m => m.AdTeacherModule) },

         
              ]
          },
            {
              path: 'teacher', component:TeacherDashboardComponent ,
              children: [
                { path: 'quiz', loadChildren: () => import('./demo/components/teacher/add-quiz/add-quiz.module').then(m => m.AddQuizModule) },
                { path: 'cours', loadChildren: () => import('./demo/components/teacher/cours/cours.module').then(m => m.CoursModule) },
                { path: 'formation', loadChildren: () => import('./demo/components/teacher/formation/formation.module').then(m => m.FormationModule) },
                { path: 'student', loadChildren: () => import('./demo/components/teacher/my-student/my-student.module').then(m => m.MyStudentModule) },
                { path: 'profil', loadChildren: () => import('./demo/components/teacher/teacher-profil/teacher-profil.module').then(m => m.TeacherProfilModule) },
                { path: 'my-quizs', loadChildren: () => import('./demo/components/teacher/teacher-quizzes/teacher-quizzes.module').then(m => m.TeacherQuizzesModule) }

              ]
          },
          {
            path: 'student', component:StudentDashboardComponent ,
            children: [
              { path: 'cours', loadChildren: () => import('./demo/components/student/cours-list/cours-list.module').then(m => m.CoursListModule) },
              { path: 'formations', loadChildren: () => import('./demo/components/student/formations-list/formations-list.module').then(m => m.FormationsListModule) },
              { path: 'Abonnements', loadChildren: () => import('./demo/components/student/mes-abonnements/mes-abonnements.module').then(m => m.MesAbonnementsModule) },
              { path: 'quizs/quiz', loadChildren: () => import('./demo/components/student/my-quiz/my-quiz.module').then(m => m.MyQuizModule) },
              { path: 'quiz', loadChildren: () => import('./demo/components/student/my-quiz-list/my-quiz-list.module').then(m => m.MyQuizListModule) },
              { path: 'profil', loadChildren: () => import('./demo/components/student/student-profil/student-profil.module').then(m => m.StudentProfilModule) },
              { path: 'teachers', loadChildren: () => import('./demo/components/student/teachers-list/teachers-list.module').then(m => m.TeachersListModule) }


            ]
        },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },

            { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },

       // AppRoutingModule
{
    path: '',
    loadChildren: () => import('../app/demo/components/view/landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'blogs',
    loadChildren: () => import('../app/demo/components/view/blogs-view/blogs-view.module').then(m => m.BlogsViewModule),
  },

  {
    path: 'section',
    loadChildren: () => import('../app/demo/components/view/sections-view/sections-view.module').then(m => m.SectionsViewModule),
  },

  {
    path: 'faq',
  loadChildren: () => import('../app/demo/components/view/faq/faq.module').then(m=>m.FaqModule)  },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
