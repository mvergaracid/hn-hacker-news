import { NgModule } from '@angular/core';

import {
   MatButtonModule,
   MatExpansionModule,
   MatFormFieldModule,
   MatInputModule,
   MatToolbarModule
//    MatToolbarModule,
//    MatIconModule,
//    MatBadgeModule,
//    MatSidenavModule,
//    MatListModule,
//    MatGridListModule,
//    MatFormFieldModule,
//    MatInputModule,
//    MatSelectModule,
//    MatRadioModule,
//    MatDatepickerModule,
//    MatNativeDateModule,
//    MatChipsModule,
//    MatTooltipModule,
//    MatTableModule,
//    MatPaginatorModule,
//    MatCardModule
} from '@angular/material';

import { MatIconModule } from '@angular/material/icon'

const MaterialComponent = [
   MatButtonModule,
   MatExpansionModule,
   MatFormFieldModule,
   MatInputModule,
   MatToolbarModule,
   MatIconModule
//    MatToolbarModule,
//    MatIconModule,
//    MatBadgeModule,
//    MatSidenavModule,
//    MatListModule,
//    MatGridListModule,
//    MatFormFieldModule,
//    MatInputModule,
//    MatSelectModule,
//    MatRadioModule,
//    MatDatepickerModule,
//    MatNativeDateModule,
//    MatChipsModule,
//    MatTooltipModule,
//    MatTableModule,
//    MatPaginatorModule,
//    MatCardModule
]

@NgModule({
   imports: [MaterialComponent],
   exports: [MaterialComponent],
   providers: [
    //   MatDatepickerModule,
   ]
})

export class AngularMaterialModule { }