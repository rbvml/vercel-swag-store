# Vercel Swag Store

`vercel-swag-store` is a small ecommerce experience built for the Vercel certification using Next.js 16, React 19, the App Router, and Cache Components.

## Local Development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `API_URL` and, when needed for protected preview deployments, `API_BYPASS_TOKEN`.
4. Start the app with `npm run dev`.

## Architecture

- The app uses Server Components by default for page rendering and data fetching.
- Product, category, promotion, and store configuration reads go through `src/lib/api.ts` and are cached explicitly with `use cache`, `cacheLife`, and `cacheTag` where freshness requirements allow it.
- Cart mutations use Server Actions in `src/lib/cart-actions.ts`; the cart token is stored in an `httpOnly` cookie and `updateTag("cart")` keeps the cart badge in sync after writes.
- Interactive UI is isolated to the smallest possible client surface area, mainly navigation state and form interactions.

## Why This Structure

- The router keeps data fetching close to the route or server component that needs it, which keeps the code easy to trace during review.
- Async boundaries are used only where they provide value, such as streaming the cart badge and stock state independently from the rest of the page.
- Request-time values like `params` and `searchParams` stay behind `Suspense` boundaries so Cache Components can still prerender a static shell.
- Mutation inputs are validated on the server before calling the backend API so action behavior is explicit and defendable.
- The image pipeline uses `next/image`, and the app config restricts remote image hosts through `next.config.ts`.

## Verification

- `npm run lint`
- `npm run build`
