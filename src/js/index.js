// CSS import 
import "../scss/main.scss"; 

// Listeners import

import "./modules/listeners.js";

// Storage import 

import "./modules/storage.js";


// To make sure that we are in development mode
if (process.env.NODE_ENV !== 'production') {
    console.log("----------------------");
    console.log('Looks like we are in development mode!');
    console.log("----------------------");
}