// Get an html element.
const button = document.querySelector('#jumboBtn');

// Create an Observable from event
const observable = rxjs.fromEvent(button, "click");

// Subscribe to begin listening for async result
const subscription = observable.subscribe(
    event => console.log(event),
    err => console.error(err),
    () => console.log('Completed, the subscription has been ended.')
);