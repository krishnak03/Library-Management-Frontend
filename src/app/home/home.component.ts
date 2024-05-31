import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { BLANK, EndPointsRefs, NavigationUrls } from '../../contants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  searchInput = BLANK;
  allBooksList: any;
  bookSearchResults: any;
  showBooksTable = false;

  constructor(
    private router: Router,
    private appService: AppService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  adminLogin() {
    this.router.navigate([NavigationUrls.ADMIN_PAGE]);
  }

  getAllBooks() {
    this.appService.getDataFromServer(EndPointsRefs.BOOKS).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.allBooksList = response;
        } else {
          this.toaster.error('Failed to load books', 'Error!');
        }
      },
      error: () => {
        this.toaster.error('Something went wrong, Please try later.', 'Error!');
      }
    });
  }

  searchBooks() {
    if (this.searchInput.length >= 3) {
      this.bookSearchResults = this.allBooksList.filter((element: { book_name: string }) => {
        // Check if the book_name matches the search query (case-insensitive)
        return element.book_name.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase());
      });

      // Check if there are any search results
      if (this.bookSearchResults.length > 0) {
        this.showBooksTable = true;
      } else {
        this.toaster.error('No books found matching the search query.', 'Error!');
      }
    } else {
      this.toaster.error('Please enter more than 3 characters to search', 'Error!')
    }
  }

}
