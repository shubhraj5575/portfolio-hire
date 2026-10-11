# portfolio-hire

The **Hire** version of Shubhraj Bhartiya's portfolio. One of three sites, each written for a different reader:
`portfolio-work` (recruiters), `portfolio-story` (personal brand) and `portfolio-hire` (clients).

| | |
|---|---|
| For | Businesses with work to automate |
| Look | Emerald glass; one 3D object that takes a new shape per section |
| Order | What I build, three shipped cases, process, proof, contact |

## Where things live

- `src/content.ts` — every fact, number and sentence on the site. Edit here.
- `src/pages/index.astro` — the page.
- `src/styles/hire.css` — the look.
- `src/scripts/morph.ts` — the animation.

`person` and `facts` in `src/content.ts` are repeated in the other two repos. When one of those values changes, change it in all three.
`sites` holds the addresses of the three versions; a link to another version appears only once its address is filled in.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

The build is fully static (Astro), needs no environment variables, and can be hosted anywhere that serves files.
