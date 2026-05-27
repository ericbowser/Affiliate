# Western Rockhound

Gear reviews and field guides for rockhounding in the American West — built by Eric Bowser, Salt Lake City, UT.

## What it is

A React/Vite affiliate site covering metal detectors, rock hammers, tumblers, GPS units, field gear, and books — focused on Utah BLM land and Western desert terrain. Includes an interactive Detector Match Quiz that scores detectors against user answers and returns a ranked recommendation.

## Stack

- React + Vite
- Tailwind CSS
- React Router v6
- Hosted at execute-engrave.com

## Structure

```
src/
├── components/       # Page components (Landing, Category, Review, etc.)
├── data/             # products.js — single source of truth for all products
├── tools/
│   └── detectorMatch/  # Quiz engine, questions, attrs, UI
└── App.jsx           # Routes
```

## Key routes

| Route | Page |
|---|---|
| `/` | Homepage |
| `/category/:slug` | Category listing |
| `/review/:id` | Product review |
| `/tools/detector-match` | Detector Match Quiz |
| `/about` | About |

## Adding a product

1. Add an entry to `src/data/products.js`
2. If it's a metal detector, add scoring attrs to `src/tools/detectorMatch/detectorAttrs.js`
3. All affiliate URLs use Amazon SiteStripe short links (`amzn.to/...`)

## Business

Execute & Engrave LLC — Salt Lake City, UT
Amazon Associates: westernrockhound tag
