import { NgModule } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AppEmailDirective } from './validators/app-email.directive';

@NgModule({
  declarations: [LoaderComponent, AppEmailDirective],
  imports: [CommonModule],
  exports: [LoaderComponent, AppEmailDirective, SlicePipe],
})
export class SharedModule {}
