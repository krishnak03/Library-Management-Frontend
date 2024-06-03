import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { BLANK, EndPointsRefs } from '../../contants';
import { Book, Genre, Language } from '../app-json-factory'
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminLoginComponent } from '../admin-login/admin-login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  allBooksList: Book[] = [];
  allLanguagesList: Language[] = [{
    'language_id': 0,
    'language_name': 'Language'
  }];

  allGenresList: Genre[] = [{
    'genre_id': 0,
    'genre_name': 'Genre'
  }];
  bookSearchResults: Book[] = [];
  showBooksTable = false;
  showFilters = false;
  searchInput = BLANK;
  selectedLanguage = BLANK;
  selectedGenre = BLANK;

  constructor(
    private appService: AppService,
    private toaster: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllLanguages();
    this.getAllGenres();
  }

  adminLogin() {
    this.dialog.open(AdminLoginComponent, {
      width: '500px',
    });
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

  getAllGenres() {
    this.appService.getDataFromServer(EndPointsRefs.GENRES).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.allGenresList = [...this.allGenresList, ...response]
        } else {
          this.toaster.error('Failed to load genres', 'Error!');
        }
      },
      error: () => {
        this.toaster.error('Something went wrong, Please try later.', 'Error!');
      }
    });
  }

  getAllLanguages() {
    this.appService.getDataFromServer(EndPointsRefs.LANGUAGES).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.allLanguagesList = [...this.allLanguagesList, ...response]
        } else {
          this.toaster.error('Failed to load languages', 'Error!');
        }
      },
      error: () => {
        this.toaster.error('Something went wrong, Please try later.', 'Error!');
      }
    });
  }

  selectLanguage(language: Language) {
    if (language.language_name === 'Language') {
      this.selectedLanguage = BLANK;
      return;
    }
    this.selectedLanguage = language.language_name;
  }

  selectGenre(genre: Genre) {
    if (genre.genre_name === 'Genre') {
      this.selectedGenre = BLANK;
      return;
    }
    this.selectedGenre = genre.genre_name;
  }

  search(searchInput: string, selectedGenre?: string, selectedLanguage?: string) {
    if (searchInput.length > 3) {
      this.appService.getDataFromServer(EndPointsRefs.SEARCH + '?phrase=' + searchInput + '&genre=' + selectedGenre + '&language=' + selectedLanguage).subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.bookSearchResults = response;
            this.showBooksTable = true;
          } else {
            this.toaster.error(response.message, 'Error!');
          }
        },
        error: () => {
          this.toaster.error('Something went wrong, Please try later.', 'Error!');
        }
      });
    } else {
      this.toaster.error('Please enter more than 3 characters to search', 'Error!')
    }
  }

  // searchBooks() {
  //   if (this.searchInput.length >= 3) {
  //     this.bookSearchResults = this.allBooksList.filter((element) => {
  //       console.log(element);
  //       // Check if the book_name matches the search query (case-insensitive)
  //       return element.book_name.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase());
  //     });

  //     // Check if there are any search results
  //     if (this.bookSearchResults.length > 0) {
  //       this.showBooksTable = true;
  //     } else {
  //       this.toaster.error('No books found matching the search query.', 'Error!');
  //     }
  //   } else {
  //     this.toaster.error('Please enter more than 3 characters to search', 'Error!')
  //   }
  // }

}
