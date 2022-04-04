export enum Role {
    User = 0,
    Admin = 1
}

export class RouteValues {
    static readonly DEFAULT = ''
    static readonly LOGIN = 'login'
    static readonly REGISTER = 'register'
    static readonly ADMINISTRATE_CATEGORIES = 'administrate-categories'
    static readonly CREATE_EVENT = 'new-event';
    static readonly EVENT_ID = 'event/:id'
    static readonly CATEGORY_NEW = 'category/new'
    static readonly CATEGORY_ID = 'category/:id'
    static readonly CATEGORY = 'category';
    static readonly EVENT_DETAILS_ID = 'event-details/:id'
    static readonly USER_DETAILS = 'user-details';
    static readonly DASHBOARD = 'dashboard'
    static readonly ALL_EVENTS = 'all-events'
    static readonly NOT_FOUND = 'not-found'
};

export class RouteEndpoints {
    static readonly EVENT = 'Event';
    static readonly FUTURE_EVENTS = 'Event/getFutureEvents'
    static readonly CATEGORY = 'Category';
    static readonly USER = 'User'
};

export class SidenavItems
{
    static readonly CATEGORIES = 'Categories';
};