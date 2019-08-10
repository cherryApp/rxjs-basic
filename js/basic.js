// Reference to rxjs.
const Rx = rxjs;

// Get an html element.
const button = document.querySelector('#jumboBtn');

// Create Observables from events.
const btnClickObservable = Rx.fromEvent(button, "click");
const windowLoadObservable = Rx.fromEvent(window, "load");

// Subscribe to window load event.
const windowSubscription = windowLoadObservable.subscribe(
    event => console.log(event),
    err => console.error(err),
    () => console.log('Completed, the window subscription has been ended.')
);
    
// Subscribe to mouseClick event.
const btnSubscription = btnClickObservable.subscribe(
    event => console.log(event),
    err => console.error(err),
    () => console.log('Completed, the button subscription has been ended.')
);

// Combine more Observables.
Rx.combineLatest(
    btnClickObservable,
    windowLoadObservable
).subscribe(
    events => {
        console.log(events);
        windowSubscription.complete();
        btnSubscription.unsubscribe();
    },
    err => console.error(err),
    () => console.log('Combined subscription has been completed.')
);