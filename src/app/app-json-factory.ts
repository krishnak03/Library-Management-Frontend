export interface Book {
    bookId: number;
    bookName: string;
    bookAuthor: string;
    bookGenre: string;
    bookLang: string;
    bookShelfId: string;
    bookQuantity: number;
    bookAvailable: number;
    bookPopularity: number;
}

export interface BookSearchRequest {
    phrase: string;
    genre: string;
    language: string;
}

export interface BookSearchRequest {
    phrase: string;
    genre: string;
    language: string;
}

export interface Borrow {
    borrowId: number;
    userId: number;
    bookId: number;
    issueDate: string;
    returnDate: string;
    fine: number;
}

export interface Genre {
    genreId: number;
    genreName: string;
}

export interface Language {
    languageId: number;
    languageName: string;
}

export interface User {
    userId: number;
    userName: string;
    userPhone: string;
    userEmail: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
}