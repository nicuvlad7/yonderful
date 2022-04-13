import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class TokenDecoder {
    private currentUserId: number;

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    initializeTokenInfo() {
        var token = JSON.parse(localStorage.getItem('currentUser')).token;
        this.currentUserId = this.getDecodedAccessToken(token).UserID;
    }

    getCurrentUserId(): number {
        return this.currentUserId;
    }

    resetToken() {
        this.currentUserId = null;
    }
}