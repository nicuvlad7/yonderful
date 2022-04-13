import { Injectable } from "@angular/core";
import { NumberValueAccessor } from "@angular/forms";
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from "rxjs";
import { loginUser } from "../models/loginUser";

@Injectable({ providedIn: 'root' })
export class AppStateService {
    private readonly sessionInfo$: BehaviorSubject<loginUser | null> = new BehaviorSubject<loginUser | null>(<loginUser><unknown>localStorage.getItem('currentUser'));

    observerSessionInfo(): BehaviorSubject<loginUser | null> {
        return this.sessionInfo$;
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    updateSessionInfo(session: loginUser) {
        this.sessionInfo$.next(session);
    }

    getCurrentUserId(): number {
        var token = JSON.parse(localStorage.getItem('currentUser')).token;
        var currentUserId = this.getDecodedAccessToken(token).UserID; // decode token and get userId
        return currentUserId;
    }
}