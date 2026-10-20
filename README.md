# CS 4201 Week 7 Portfolio Server: State and Safe Notes

The Week 6 project server with two additions. The browser remembers a theme
preference in a cookie, and the server accepts and stores short visitor notes.

## Open it in StackBlitz

https://stackblitz.com/github/BrianBalint/CS4201-800-Portfolio-state-assignment

## Routes

- `/` serves `public/index.html` through `express.static`
- `/projects` returns all three projects as JSON
- `/projects/:id` returns one project, or a 404 with a message if the id does not exist
- `/notes` returns the saved notes as JSON
- `POST /notes` saves a note, or returns a 400 if it is empty or over 200 characters

## Two kinds of state

The theme is client-side state. It lives in a cookie in the browser, and the
server never reads it.

The notes are server-side state. They live in a plain array in the memory of the
Node process, so they are shared by every visitor and they are cleared whenever
the server restarts.

## Safe output

Notes are written to the page with `textContent`, not `innerHTML`. A note
containing a script tag is displayed as text rather than executed.

## Run it locally

```
npm install
npm start
```

Then open http://localhost:3010/
