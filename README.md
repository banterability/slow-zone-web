# slow-zone-web

Mobile-friendly CTA arrival data. Browse nearby stations, jump back to recents and favorites, and follow a specific train as it moves down the line.

Arrival and run data via [`slow-zone`](https://www.npmjs.com/package/slow-zone), which wraps the [CTA's Train Tracker API](https://www.transitchicago.com/developers/traintracker/).

Station data (names, locations, lines, accessibility) are sourced from the [Chicago Data Portal](https://data.cityofchicago.org/resource/8pix-ypme.json). The app's cache of station information is updated weekly by [a scheduled GitHub Action](.github/workflows/update-station-data.yml) when something changes in the physical world.

## Development

Install Node 24, `cp .env.example .env`, and set at least `CTA_API_KEY`. Then:

```sh
pnpm run dev
```

### Environment variables

See `.env.example` for the full list. Of those:

- `CTA_API_KEY` — key for the CTA Train Tracker API. **Required at runtime**. Passed through to `slow-zone`.
- `GOOGLE_MAPS_STATIC_API_KEY` — key for the Google Maps Static API. Used to render station map thumbnails. The maps won't show up without it, but the rest of the app works.
- `CHICAGO_DATA_PORTAL_APP_TOKEN` — app token for the Chicago Data Portal. Only needed if you run `pnpm run update-stations` locally.
- `SENTRY_AUTH_TOKEN` — used by the Sentry Vite plugin to create releases & upload source maps during `pnpm run build`. Only needed for production builds.

## Deployment

Automatically deployed via Vercel's [Git Integration](https://vercel.com/docs/concepts/git). Errors are reported to Sentry.
