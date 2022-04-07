import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class DecodeToken {
    token: string;
    tokenInfo: any;

    constructor() {
    }

    getDecodedAccessToken(token: string): any {
        try {
        return jwt_decode(token);
        } catch(Error) {
        return null;
        }
    }

    getCurrentUserId() {
        return this.tokenInfo.UserID;
    }

    initializeTokenInfo() {
        this.token = JSON.parse(localStorage.getItem('currentUser')).token;
        this.tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    }

    resetToken() {
        this.tokenInfo = '';
    }
}