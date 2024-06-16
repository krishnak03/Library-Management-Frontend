import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { BLANK, EndPointsRefs, Patterns } from '../../constants';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  isMobile = false;
  getUserClicked = false;
  addUserClicked = false;
  updateUserClicked = false;
  deleteUserClicked = false;

  constructor(
    private form_builder: FormBuilder,
    private appService: AppService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.appService.isMobileView.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  addUserForm = this.form_builder.group({
    name: [BLANK, [Validators.required, Validators.maxLength(30), Validators.minLength(3), Validators.pattern(Patterns.NAME)]],
    phone: [BLANK, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(Patterns.PHONE)]],
    email: [BLANK, [Validators.required, Validators.pattern(Patterns.EMAIL)]]
  });

  addUser() {
    const requestJson = {
      "user_name": this.addUserForm.controls.name.value,
      "user_phone": this.addUserForm.controls.phone.value,
      "user_email": this.addUserForm.controls.email.value
    }
    this.appService.postDataToServer(EndPointsRefs.USERS, requestJson).subscribe({
      next: (response) => {
        if (response?.success) {
          this.toaster.success(response.message, "Success");
        }
      },
      error: (error) => {
        this.toaster.error(error.message);
      }
    });
  }

  toggleButton(buttonName: string) {
    switch (buttonName) {
      case 'addUserClicked':
        this.addUserClicked = true;
        break;
      case 'getUserClicked':
        this.getUserClicked = true;
        break;
      case 'updateUserClicked':
        this.updateUserClicked = true;
        break;
      case 'deleteUserClicked':
        this.deleteUserClicked = true;
        break;
    }
  }

}
