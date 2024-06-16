export const BLANK = '';

export const NavigationUrls = {
    HOME: 'Home',
    ADMIN_PAGE: 'admin-login',
    ADMIN_DASHBOARD: 'admin-dashboard',
    USER_DASHBOARD: 'admin-dashboard/users',
    BOOK_DASHBOARD: 'admin-dashboard/books'
}

export const EndPointsRefs = {
    BOOKS: 'books',
    USERS: 'users',
    SEARCH: 'books/search',
    GENRES: 'genres',
    LANGUAGES: 'languages',
    ADMIN_LOGIN: 'admins/login'
}

export const Patterns = {
    NAME: '^[a-zA-Z]+( [a-zA-Z]+)*$',
    PHONE: '^[0-9]+$',
    EMAIL: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
}