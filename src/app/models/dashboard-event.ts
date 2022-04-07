import { IEvent } from "./event";

export interface IDashboardEvents {
    hostedEvents: IEvent[];
    joinedEvents: IEvent[];
  }