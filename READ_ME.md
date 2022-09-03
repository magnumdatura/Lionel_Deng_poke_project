Gotta Catch ‘em All

Hey guys thanks for the opportunity to take this test, it was a really fun challenge, and I used it as an opportunity to learn react-redux, django and djoser, where I'd previously been accustomed to react-context for the frontend and mongoDB / noSQL databases for the backend, with express.js.

This doc runs through the layout of the project and how I understand key concepts in redux and django-djoser

FRONTEND:
Redux solves React's problems of propping and lifting state between parent-child components by creating a global store, which contains a global state and a global reducer function, which mutates the said global state.
The global reducer function (reducers/index.js combines reducers/auth.js) is itself comprised of individual actions (actions/auth.js), which make the API calls and dispatch the response payload which are categorised according to 'types' (actions/types.js).
The data flow is therefore: action/types.js + action/auth.js --> reducers/auth.js + reducers/index.js --> store.js --> wrapped by Redux's Provider which passes store down to all child components as seen in App.js

More complex layout than React-context which I'm used to, but has its own elegance in compartmentalising state-management into reducer-function and all the different api-calls (which would normally be written in the separate child components) into one global actions/dispatch file.

BACKEND: 
Djoser extends the Django REST framework, and here practically writes the JWT authentication endpoints for us. It was a boon and a bane. Because the urls.py and views.py endpoints which we would normally have to write are here hidden from us, it took me awhile to figure out how it handled user authentication + parsed user information to/from the database. But once that was settled, it's super powerful and convenient. It even sends out email confirmation when user is created to activate user account!


Stretch goals:
Frontend: Set up sign-up / account-activate / reset-password pages
Backend: Make the pokemon endpoints protected, so they can only be accessed when user is logged in (authenticated). 
