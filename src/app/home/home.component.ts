import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private appService: AppService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  adminLogin() {
    this.router.navigate(['admin-login']);
  }

  getAllBooks() {
    this.appService.getDataFromServer('books').subscribe({
      next: (response) => {
        if (response) {
          this.toaster.success('Successfully Loaded all books', 'Success!');
        } else {
          this.toaster.error('Failed to load books', 'Error!');
        }
      },
      error: () => {
        this.toaster.error('Something went wrong, Please try later.', 'Error!');
      }
    });
  }

}
