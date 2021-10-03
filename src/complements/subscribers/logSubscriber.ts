import EventEmitter from "events";

export const logEvent = new EventEmitter();

export enum LOG_EVENTS {
  ERROR = "LOG_ERROR",
}

logEvent.on(LOG_EVENTS.ERROR, (e: Error) => {
  console.log(e);
});
