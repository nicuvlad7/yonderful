export enum Role {
    User = 0,
    Admin = 1
}

export class RouteValues {
    static readonly DEFAULT = ''
    static readonly LOGIN = 'login'
    static readonly REGISTER = 'register'
    static readonly ADMINISTRATE_CATEGORIES = 'administrate-categories'
    static readonly CREATE_EVENT = 'new-event'
    static readonly EVENT = 'event'
    static readonly EVENT_ID = 'event/:id'
    static readonly CATEGORY_NEW = 'category/new'
    static readonly CATEGORY_ID = 'category/:id'
    static readonly CATEGORY = 'category'
    static readonly EVENT_DETAILS_ID = 'event-details/:id'
    static readonly USER_DETAILS = 'user-details'
    static readonly DASHBOARD = 'dashboard'
    static readonly ALL_EVENTS = 'all-events'
    static readonly JOINED_EVENTS = 'joined-events'
    static readonly NOT_FOUND = 'not-found'
    static readonly EVENT_DETAILS = 'event-details'
    static readonly MY_HISTORY = 'my-history'
    static readonly HOSTED_EVENTS = 'hosted-events'
};

export class RouteEndpoints {
    static readonly EVENT = 'Event';
    static readonly FUTURE_EVENTS = 'Event/getFutureEvents'
    static readonly FILTERED_EVENTS = 'Event/getFilteredEvents'
    static readonly CATEGORY = 'Category'
    static readonly USER = 'User'
    static readonly ATTENDANCE = 'Attendance'
    static readonly ATTENDANCE_GET_PARTICIPANTS = 'Attendance/GetParticipants'
    static readonly DASHBOARD_EVENTS = 'Event/GetDashboardEvents'
    static readonly JOINED_EVENTS = 'Event/GetJoinedEventsForUser'
    static readonly NOT_ENDED_EVENTS = 'Event/GetNotEndedEvents'
};

export class SidenavItems {
    static readonly CATEGORIES = 'Categories';
};