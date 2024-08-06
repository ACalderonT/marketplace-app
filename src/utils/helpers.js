import CryptoJS from "crypto-js";
const { VITE_CRYPTO_SECRET } = import.meta.env

export const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', { style: 'decimal', maximumFractionDigits: 0}).format(value);
}

export const handleCrypt = (token) => {
    return CryptoJS.AES.encrypt(token, String(VITE_CRYPTO_SECRET)).toString()
}

export const handleDecrypt = (encyptedToken) => {
    return CryptoJS.AES.decrypt(encyptedToken, String(VITE_CRYPTO_SECRET)).toString(CryptoJS.enc.Utf8)
}

export const decodeToken = (token) => {
    const tokenPayload = token.split('.')[1];

    return JSON.parse(atob(tokenPayload))
}