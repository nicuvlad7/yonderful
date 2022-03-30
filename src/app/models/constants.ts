export enum Role {
    User = 0,
    Admin = 1
}

export class RouteValues {
    static readonly DEFAULT = ''
    static readonly LOGIN = 'login'
    static readonly REGISTER = 'register'
    static readonly ADMINISTRATE_CATEGORIES = 'administrate-categories'
    static readonly CREATE_EDIT_EVENT = 'create-edit-event'
    static readonly CATEGORY_NEW = 'category/new'
    static readonly CATEGORY_ID = 'category/:id'
    static readonly EVENT_DETAILS_ID = 'event-details/:id'
    static readonly USER_DETAILS = 'user-details';
    static readonly DASHBOARD = 'dashboard'
};

export class RouteEndpoints {
    static readonly EVENT = 'Event';
};