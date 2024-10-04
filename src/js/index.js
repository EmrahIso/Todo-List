import "../css/style.css"; 
import "./modules/listeners.js";

// To make sure that we are in development mode
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}