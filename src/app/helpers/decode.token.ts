import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class DecodeToken {
    token = JSON.parse(localStorage.getItem('currentUser')).token;
    tokenInfo: any;

    constructor() {
        this.initialiseLocalStorage();
    }

    getDecodedAccessToken(token: string): any {
        try {
        return jwt_decode(token);
        } catch(Error) {
        return null;
        }
    }

    getCurrentUserId(): number {
        return this.tokenInfo.UserID;
    }

    initialiseLocalStorage() {
        this.tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    }
}