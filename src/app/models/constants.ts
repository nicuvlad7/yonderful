export enum Role{
    User=0,
    Admin=1
}

export class RouteValues
{
    static readonly DEFAULT = ''
    static readonly LOGIN = 'login'
    static readonly REGISTER = 'register'
    static readonly ADMINISTRATE_CATEGORIES = 'administrate-categories'
    static readonly CREATE_EDIT_EVENT = 'create-edit-event'
    static readonly CATEGORY_NEW = 'category/new'
    static readonly CATEGORY_ID = 'category/:id'
    static readonly CATEGORY = 'category';
    static readonly EVENT_DETAILS_ID = 'event-details/:id'
    static readonly DASHBOARD = 'dashboard'
};

export class RouteEndpoints
{
    static readonly EVENT = 'Event';
};

export class SidenavItems
{
    static readonly CATEGORIES = 'Categories';
};