export enum Role{
    User=0,
    Admin=1
}

export class RouteValues
{
    static readonly DEFAULT = '';
    static readonly LOGIN = 'login';
    static readonly REGISTER = 'register';
    static readonly ADMINISTRATE_CATEGORIES = 'administrate-categories'
    static readonly CREATE_EDIT_EVENT = 'create-edit-event';
    static readonly CREATE_EDIT_EVENT_ID = 'create-edit-event/:id'
    static readonly CATEGORY_NEW = 'category/new'
    static readonly CATEGORY_ID = 'category/:id'
    static readonly EVENT_DETAILS_ID = 'event-details/:id'
};

export class RouteEndpoints
{
    static readonly EVENT = 'Event';
};