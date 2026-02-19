# Model Gauge

**How fast does $100 drain across AI models?**

Model Gauge is an interactive cost visualizer that compares AI model pricing using animated gas tank metaphors. Select models from 10+ providers, hit play, and watch your $100 budget drain in real-time — cheaper models last longer, expensive ones empty fast.

Built for [OpenClaw](https://github.com/harperWebServicesLLC).

## Features

- **Animated gas tanks** — Each AI model is a tank that drains at a rate proportional to its per-message cost. Fluid level, wave animations, shimmer effects, and color-coded glow states (green/amber/red) give immediate visual feedback.
- **21 models across 10 providers** — OpenAI, Anthropic, Google, DeepSeek, xAI, Mistral, Meta, Moonshot, MiniMax, and Zhipu AI. Each provider has a unique color.
- **Two usage modes** — *Chat* (500 input / 1,500 output tokens per message) and *Code Gen* (300 input / 3,000 output tokens per message). Switching modes resets the animation.
- **Playback controls** — Play, pause, and reset. Speed multipliers from 0.5x to 10x.
- **Sorting** — Sort tanks by cheapest first, most expensive first, or grouped by provider.
- **Model selector** — Pick individual models or use presets (Flagships, Budget, All). Selections persist in localStorage.
- **Live stats bar** — Shows the cheapest model, most expensive model, and average cost per message across your selection.
- **Hover/tap tooltips** — Tap or hover any tank to see input/output pricing, cost per message, and total messages per $100.
- **Mobile optimized** — Responsive grid layout, touch-friendly controls, smaller tanks on mobile.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (tested on 22.x)
- npm, yarn, pnpm, or bun

### Install

```bash
git clone https://github.com/harperWebServicesLLC/aimeter.git
cd aimeter
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          Root layout, metadata, icons
│   ├── page.tsx            Main page — state management, orchestration
│   ├── globals.css         Theme variables, animations (wave, shimmer, shake)
│   ├── icon.svg            SVG favicon
│   ├── favicon.ico         ICO favicon (48x48)
│   └── apple-icon.png      Apple touch icon (180x180)
├── components/
│   ├── Header.tsx          Title bar with gradient text and fuel icon
│   ├── ModelSelector.tsx   Expandable model picker with presets and provider groups
│   ├── ControlBar.tsx      Play/pause/reset, speed, mode toggle, sort buttons
│   ├── TankGrid.tsx        Responsive grid of GasTank components
│   ├── GasTank.tsx         Individual tank — border, cap, fluid, tooltip, glow
│   ├── TankFluid.tsx       Animated fluid fill with wave SVG and shimmer overlay
│   ├── StatsBar.tsx        Cheapest/expensive/average cost summary
│   └── Legend.tsx          Color-coded provider legend
├── data/
│   └── models.ts           Model definitions, provider metadata, presets
├── hooks/
│   ├── useAnimationEngine.ts   requestAnimationFrame loop, speed control
│   └── useTankState.ts         Derives tank states from elapsed messages
├── lib/
│   ├── calculations.ts     Cost math — costPerMessage, totalMessages, remainingBudget
│   └── constants.ts        Budget ($100), usage profiles, speed options
└── types/
    └── index.ts            TypeScript interfaces and type aliases
```

## How It Works

### The Gas Tank Metaphor

Each AI model gets a gas tank filled with $100. When you press play, every tank drains at its own rate based on how much each message costs. A cheap model like DeepSeek V3 ($0.00028/msg in Chat mode) lasts for ~357,000 messages, while a premium model like o1 ($0.0975/msg) runs dry after ~1,025 messages.

### Cost Calculation

```
cost_per_message = (input_tokens × input_price / 1M) + (output_tokens × output_price / 1M)
total_messages   = floor($100 / cost_per_message)
remaining_budget = max(0, $100 - messages_used × cost_per_message)
fill_percent     = remaining_budget / $100 × 100
```

The two usage modes define token counts per message:

| Mode     | Input Tokens | Output Tokens |
|----------|-------------|---------------|
| Chat     | 500         | 1,500         |
| Code Gen | 300         | 3,000         |

### Animation Engine

The animation uses `requestAnimationFrame` for smooth 60fps updates. A base rate of 2 messages/second is multiplied by the speed setting (0.5x–10x). The elapsed message count drives all tank state calculations reactively through React's `useMemo`.

### Visual States

Tanks change appearance based on fill level:

| Fill Level | Glow Color | Meaning              |
|-----------|------------|----------------------|
| > 75%     | Green      | Plenty of budget     |
| 25–75%    | None/Amber | Getting lower        |
| < 25%     | Amber      | Running low          |
| 0%        | Red + shake| Budget exhausted     |

### Data Flow

```
page.tsx (state owner)
  ├── useAnimationEngine → elapsed message count (via requestAnimationFrame)
  ├── useTankStates(models, mode, elapsed) → TankState[] (remaining, isEmpty, etc.)
  ├── ModelSelector → selected model IDs (persisted to localStorage)
  ├── ControlBar → playState, speed, mode, sort
  ├── StatsBar → derived cheapest/expensive/avg from TankState[]
  └── TankGrid → renders GasTank for each selected model
        └── GasTank → TankFluid (animated fill), tooltip, glow class
```

## Adding a New Model

1. Open `src/data/models.ts`
2. If the provider is new, add it to the `PROVIDERS` object with a `color`, Tailwind classes, and label
3. Add the model to the `MODELS` array:

```ts
{ id: 'model-id', name: 'Display Name', provider: 'providerId', inputPricePerMillion: X, outputPricePerMillion: Y },
```

4. If it's a new provider, add the provider ID to the `ProviderId` union type in `src/types/index.ts`
5. Optionally add the model ID to a preset in `PRESETS`

That's it — the tank grid, stats, legend, and selector all derive from the `MODELS` array automatically.

## Tech Stack

| Technology      | Version | Purpose                        |
|----------------|---------|--------------------------------|
| Next.js        | 16.1    | React framework, app router    |
| React          | 19.2    | UI library                     |
| TypeScript     | 5       | Type safety                    |
| Tailwind CSS   | 4       | Utility-first styling          |
| Framer Motion  | 12.34   | Layout animations, transitions |
| Lucide React   | 0.574   | Icons                          |
