import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * To be imported for EVERY page module
 */
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class SharedNgCommonModule {}
