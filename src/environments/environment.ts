export const environment = {
    production: true,
    BASE_URL: 'http://localhost:8080/',
    SECRET_KEY: CryptoJS.enc.Utf8.parse('3Dxgo1NroyWLeRctxPZ1RaXo7ufZcDod'), // Replace with your actual secret key
    IV: CryptoJS.enc.Utf8.parse('0000000000000000'), // IV with 16 bytes of zeros
};