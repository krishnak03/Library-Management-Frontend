export interface Book {
    book_id: number;
    book_name: string;
    book_author: string;
    book_genre: string;
    book_lang: string;
    book_shelf_id: string;
    book_quantity: number;
    book_available: number;
    book_popularity: number;
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
    genre_id: number;
    genre_name: string;
}

export interface Language {
    language_id: number;
    language_name: string;
}

export interface User {
    user_id: number;
    user_name: string;
    user_phone: string;
    user_email: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
}