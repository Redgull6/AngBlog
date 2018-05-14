import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [ CommonModule, FormsModule, MaterialModule, RouterModule],
  exports: [ CommonModule, FormsModule, MaterialModule, NavbarComponent, RouterModule],
  declarations: [NavbarComponent]
})
export class SharedModule { }
