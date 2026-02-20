# Fetch API

A virtual pet dashboard where you and your colleagues take care of **Biscuit**, a pixel-art dog that lives in your office. Feed, pet, and walk Biscuit to keep their stats up while simulated coworkers chip in too.

## Tech Stack

Basically to-be vibe coded with:

| Layer         | Technology                                                                    |
| ------------- | ----------------------------------------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org/) (App Router)                                |
| Language      | TypeScript 5.7                                                                |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) (New York style) with Radix UI primitives |
| Styling       | Tailwind CSS v4 with OKLCH color system                                       |
| Fonts         | Nunito (sans), Geist Mono (mono)                                              |
| Icons         | Lucide React                                                                  |
| Graphics      | HTML5 Canvas (pixel art, frame-based animation)                               |
| Analytics     | Vercel Analytics                                                              |

## Development Setup

### Prerequisites

- Node.js 18+
- npm (or your preferred package manager)

### Getting Started

```bash
# Install dependencies
npm install

# Start dev
npm run dev
```

App will be available at [http://localhost:3000](http://localhost:3000).

Other commands:

- `npm run build` - production build
- `npm run start` - serve the build
- `npm run lint` - run linting (probably has issues)

## Ideas for later

- Save state: Right now Biscuit resets every refresh which is pretty annoying
- Actual multiplayer: Replace with real people
- More animals: Cats, birds, maybe dragons? Different personalities and animations
- Customisation: Hats, different colors, name changes
- Achievements: "Fed Biscuit for a week straight" type stuff
- Notifications: Slack bot to guilt trip people when Biscuit's dying
- Mobile version: Currently looks shit on phones

Probably won't do most of these but they'd be cool.
