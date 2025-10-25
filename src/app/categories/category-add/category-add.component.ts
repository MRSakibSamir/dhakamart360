import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';



@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category = { name: '' };
  editCategoryData?: Category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(res => this.categories = res);
  }

  create() {
    if (!this.newCategory.name?.trim()) return;

    this.categoryService.createCategory(this.newCategory).subscribe(res => {
      this.categories.push(res);
      this.newCategory = { name: '' };
    });
  }
  edit(category: Category) {
    this.editCategoryData = {
      ...category,
      parentCategory: category.parentCategory || undefined
    };
  }



  saveEdit() {
    if (!this.editCategoryData) return;

    this.categoryService.updateCategory(this.editCategoryData.id!, this.editCategoryData)
      .subscribe(updated => {
        const index = this.categories.findIndex(c => c.id === updated.id);
        if (index > -1) this.categories[index] = updated;
        this.editCategoryData = undefined;
      });
  }

  cancelEdit() {
    this.editCategoryData = undefined;
  }

  delete(id?: number) {
    if (!id || !confirm('Are you sure you want to delete this category?')) return;
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(c => c.id !== id);
    });
  }

  read(id?: number) {
    if (!id) return;
    const category = this.categories.find(c => c.id === id);
    if (category) alert(`Category: ${category.name}\nDescription: ${category.description || 'N/A'}`);
  }
}
