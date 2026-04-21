# slow-zone-web

Mobile-friendly CTA arrival data. Browse nearby stations, favorite the ones you use, and follow a specific train as it moves down the line.

Built on [React Router 7](https://reactrouter.com/) and deployed to Vercel. Arrival and run data comes from the [`slow-zone`](https://www.npmjs.com/package/slow-zone) package, which wraps the CTA's Train Tracker API.

## Development

```sh
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Environment variables

See `.env.example` for the full list. Of those:

- `CTA_API_KEY` — key for the CTA Train Tracker API. **Required at runtime**; the app will crash on boot without it.
- `GOOGLE_MAPS_STATIC_API_KEY` — key for the Google Maps Static API, used to render station map thumbnails. The map route will fail without it, but the rest of the app works.
- `SENTRY_AUTH_TOKEN` — used by the Sentry Vite plugin to upload source maps during `npm run build`. Only needed for production builds.
- `CHICAGO_DATA_PORTAL_APP_TOKEN` — app token for the Chicago Data Portal, used only by `npm run update-stations`.

### Useful scripts

- `npm run dev` — start the dev server
- `npm run lint` — run ESLint and Stylelint in parallel
- `npm run typecheck` — generate route types and run `tsc`
- `npm run update-stations` — refresh `app/data/stations.json` from the Chicago Data Portal (requires `CHICAGO_DATA_PORTAL_APP_TOKEN`)

## Deployment

Automatically deployed via Vercel's [Git Integration](https://vercel.com/docs/concepts/git). Errors are reported to Sentry.
