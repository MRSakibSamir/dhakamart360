import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent {

  /** Category being edited, passed from parent */
  @Input() editCategory: { id: number; name: string } | null = null;

  /** Custom category name if "custom" is selected */
  customCategoryName: string = '';

  /** Emit the updated category back to parent */
  @Output() saveCategory = new EventEmitter<{ id: number; name: string }>();

  /** Emit cancel action to parent */
  @Output() cancelEdit = new EventEmitter<void>();

  constructor() { }

  /** Save edited category */
  save() {
    if (!this.editCategory) return;

    let updatedName = this.editCategory.name;

    // If custom category, use customCategoryName
    if (updatedName === 'custom') {
      if (!this.customCategoryName.trim()) {
        alert('Please enter a custom category name.');
        return;
      }
      updatedName = this.customCategoryName.trim();
    }

    this.saveCategory.emit({
      id: this.editCategory.id,
      name: updatedName
    });

    // Clear custom name input
    this.customCategoryName = '';
  }

  /** Cancel editing */
  cancel() {
    this.cancelEdit.emit();
    this.customCategoryName = '';
  }
}
