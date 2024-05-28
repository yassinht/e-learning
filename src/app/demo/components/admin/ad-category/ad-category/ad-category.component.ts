import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/demo/api/category'; // Assuming you have a Category interface
import { CategoryService } from 'src/app/demo/service/category.service';

@Component({
  selector: 'app-ad-category',
  templateUrl: './ad-category.component.html',
  styleUrls: ['./ad-category.component.scss'],
  providers: [MessageService, CategoryService], // Provide the MessageService and CategoryService
})
export class AdCategoryComponent implements OnInit {
  categories: Category[] = [];
  category: Category | null = null;
  categoryDialog: boolean = false;
  deleteCategoryDialog: boolean = false;
  selectedCategories: Category[] = [];
  submitted: boolean = false;

  cols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' }
  ];

  constructor(private categoryService: CategoryService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  openNew() {
    this.category = {
      name: '',
      description: ''
    };
    this.submitted = false;
    this.categoryDialog = true;
  }

  deleteSelectedCategories() {
    if (this.selectedCategories.length === 1) {
      this.deleteCategory(this.selectedCategories[0]);
    } else {
      this.deleteCategoryDialog = true;
    }
  }

  confirmDeleteSelected() {
    this.deleteCategoryDialog = false;
    const selectedIds = this.selectedCategories.map(category => category._id);
    this.categoryService.deleteCategory(selectedIds).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000 });
        this.loadCategories();
        this.selectedCategories = [];
      },
      (error) => {
        console.error(error);
        // Handle error, display an error message, etc.
      }
    );
  }
  
  editCategory(category: Category) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteCategory(category: Category) {
    this.deleteCategoryDialog = true;
    this.category = { ...category };
  }

  confirmDelete() {
    this.deleteCategoryDialog = false;
    this.categoryService.deleteCategory(this.category._id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
      this.loadCategories();
      this.category = null;
    });
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  saveCategory() {
    this.submitted = true;
    if (this.category.name?.trim() && this.category.description?.trim()) {
      this.categoryService.addCategory(this.category).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
          this.loadCategories();
          this.categoryDialog = false;
          this.category = null;
        },
        (error) => {
          console.error('Error:', error);
          // Handle error
        }
      );
    }
  }
}
