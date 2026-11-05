# Complete the Lyrics

A React Router laboratory activity. Each singer button navigates to its own URL, and the page is rendered by one reusable component.

## Tech Stack

- React (Vite)
- react-router-dom

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

Then open http://localhost:5173/singer

## Routes

| Path | View |
| --- | --- |
| `/` | Home: title and four singer buttons |
| `/singer` | Same as home |
| `/singer/:singerId` | Singer page (`first`, `second`, `third`, `fourth`) |
| `/singer/unknown` | "Singer Not Found" message with Home link |
| `*` | 404 Not Found page with Home link |

## Project Structure

```
src/
  main.jsx               BrowserRouter setup
  App.jsx                Route definitions
  index.css              Styles
  data/singers.js        Singer data (id, name, color)
  components/SingerNav.jsx   NavLink buttons
  pages/Layout.jsx       Shared layout (title, buttons, lyrics box)
  pages/SingerPage.jsx   Reusable singer page (uses useParams)
  pages/NotFound.jsx     404 page
```

## Screenshots

### Home page (`/singer`)
![Home](screenshots/home.png)

### First singer (`/singer/first`)
![First Singer](screenshots/first.png)

### Second singer (`/singer/second`)
![Second Singer](screenshots/second.png)

### Third singer (`/singer/third`)
![Third Singer](screenshots/third.png)

### Fourth singer (`/singer/fourth`)
![Fourth Singer](screenshots/fourth.png)

## How `useParams` Works

The route `/singer/:singerId` contains a dynamic segment. When the URL is `/singer/second`, React Router stores `singerId = "second"`. Inside `SingerPage`, calling `useParams()` returns that value:

```jsx
const { singerId } = useParams();
const singer = singers.find((s) => s.id === singerId);
```

The component uses the id to look up the matching singer in the data array. This lets one component serve every singer. If no singer matches, a "Singer Not Found" message is shown instead.

## How `Link` / `NavLink` Works

`Link` and `NavLink` render an anchor tag but intercept the click, so the browser URL changes without a full page reload. React Router then re-renders only the matching route.

`NavLink` also knows whether its `to` path matches the current URL. It passes an `isActive` value, which is used to give the selected singer a visible active style:

```jsx
<NavLink
  to={`/singer/${s.id}`}
  className={({ isActive }) => "singer-btn" + (isActive ? " active" : "")}
>
  {s.name}
</NavLink>
```

## Testing Done

- Clicked every singer button and confirmed the URL changes each time
- Used browser Back and Forward buttons
- Refreshed on a singer URL (e.g. `/singer/third`) and the correct page loaded
- Entered `/singer/unknown` and saw "Singer Not Found"
- Entered an invalid path (e.g. `/abc`) and saw the 404 page

## Reflection Questions

### 1. Why is switching singer views with useState alone not equivalent to routing?

With `useState`, the browser URL never changes. Back and Forward buttons don't work, refreshing resets the page, and you can't bookmark or share a link to a specific singer. Routing ties the view to the URL, so each singer has its own address that works on refresh, in history, and when opened directly.

### 2. How does useParams allow a single component to support multiple singers?

The route `/singer/:singerId` has a dynamic part. `useParams()` reads that part from the URL (for example `"second"`), and the component uses it to find the matching singer in the data array. The component's code stays the same and only the data it looks up changes, so one `SingerPage` serves every singer.

### 3. What happens when a user opens /singer/unknown directly?

The route still matches `/singer/:singerId`, with `singerId = "unknown"`. The lookup in the singers array finds nothing, so the page shows a "Singer Not Found" message with a Home link instead of crashing.

### 4. Why should navigation use Link/NavLink rather than ordinary anchor tags for internal routes?

An ordinary `<a>` tag makes the browser request a whole new page, which reloads the app and resets its state. `Link` and `NavLink` change the URL without a reload, and React Router re-renders only the matching route. `NavLink` also tells you which link is active, which is how the selected singer gets highlighted.