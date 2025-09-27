import { Component, OnInit } from '@angular/core';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  nextId: number = 4; // Next available ID for new category
  newCategory: Category = { id: 0, name: '' };
  editCategoryData: Category | null = null;

  ngOnInit(): void {
    // Initial sample categories
    this.categories = [
      { id: 1, name: 'Grains' },
      { id: 2, name: 'Bakery' },
      { id: 3, name: 'Dairy' },
      { id: 4, name: 'Fruits' },
    ];
  }

  // --- CREATE ---
  create() {
    if (!this.newCategory.name.trim()) return;

    const categoryToAdd: Category = { 
      ...this.newCategory, 
      id: this.nextId++ 
    };

    this.categories.push(categoryToAdd);
    this.newCategory = { id: 0, name: '' };
  }

  // --- READ (VIEW) ---
  read(id: number) {
    const category = this.categories.find(c => c.id === id);
    if (category) {
      alert(`Category Details:\nName: ${category.name}`);
    }
  }

  // --- EDIT ---
  edit(category: Category) {
    this.editCategoryData = { ...category }; // create a copy for editing
  }

  // --- SAVE EDIT ---
  saveEdit() {
    if (this.editCategoryData) {
      this.categories = this.categories.map(c =>
        c.id === this.editCategoryData!.id ? this.editCategoryData! : c
      );
      this.editCategoryData = null;
    }
  }

  // --- CANCEL EDIT ---
  cancelEdit() {
    this.editCategoryData = null;
  }

  // --- DELETE ---
  delete(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categories = this.categories.filter(c => c.id !== id);
    }
  }
}