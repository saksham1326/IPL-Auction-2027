# 🏏 IPL Fantasy Auction 2027

A slick, animated website for your **private IPL Fantasy Auction** among friends. The homepage features the IPL trophy and team players; Retentions, Teams, and Leaderboard each have their own page. Team details group retained players by role, and the leaderboard starts alphabetically with zero points.

**Stack:** Pure HTML · CSS · Vanilla JS · [GSAP](https://gsap.com/) (animations) · [Lenis](https://lenis.studiofreight.com/) (smooth scroll)

> **No build step needed.** Just open `index.html` in a browser — or drag the folder onto Netlify.

---

## 📂 File Structure

```
├── index.html      # Homepage
├── retentions.html # Retained player overview
├── teams.html      # Team directory and role-based roster details
├── leaderboard.html # Alphabetical team leaderboard
├── style.css       # All styles — colours, layout, animations
├── main.js         # Animations & dynamic DOM building
├── data.js         # ← EDIT THIS FILE to update teams & players
├── photos/         # (create this folder) player headshots go here
└── README.md
```

---

## ✏️ How to Edit Data (`data.js`)

Open `data.js` — it's the **only file you need to edit** to change teams, players, and purse numbers.

### Team object fields

```js
{
  id: "gt",                    // Short unique ID (lowercase, no spaces)
  name: "Gujarat Titans",      // Full team name
  code: "GT",                  // 2–3 letter abbreviation shown on badges
  owners: ["Saksham"],         // Owner name(s) — shown on the team card
  primaryColor: "#1C1C1C",     // Team's primary brand colour (hex)
  secondaryColor: "#DAA520",   // Team's accent / secondary colour (hex)
  purseTotal: 120,             // Total purse in Crores (Cr) — usually 120
  leaderboardPoints: 0,        // Current leaderboard points
  players: [ ... ]             // Array of retained player objects (see below)
}
```

### Player object fields

```js
{
  name: "Shubman Gill",        // Player's full name
  role: "BAT",                 // Role code — see table below
  retentionPrice: 16.5,        // Amount spent retaining them (in Cr)
  fantasyPoints: 892,          // Last-season player fantasy points
  photoUrl: ""                 // Transparent player cutout, e.g. "photos/shubman-gill.png"
                               // Leave "" to show the silhouette placeholder
}
```

You can optionally add `logoUrl: "photos/gt-logo.png"` to a team object to replace the team-code badge on each spotlight with that team's logo PNG. Leave it out until you have the logo file; the badge placeholder is shown automatically.

### Role codes

| Code | Meaning         |
|------|-----------------|
| `BAT`  | Batsman         |
| `BOWL` | Bowler          |
| `AR`   | All-Rounder     |
| `WK`   | Wicket-Keeper   |

BAT, BOWL, and WK roles display the matching cricket bat, ball, and wicketkeeper-glove icons. AR displays both the bat and ball icons.

### 💰 Purse rules

- All prices are in **Crores (Cr)**
- **Do not let the total retention cost exceed 85 Cr per team** — that's the IPL rule.  
  The site will still display whatever you enter, but keep it realistic!
- `purseRemaining` is **auto-calculated** by the JS — you don't set it manually.

---

## 📸 How to Add Player Photos

1. Create a folder called `photos/` inside your project folder.
2. Save each player cutout as a transparent `.png` — e.g. `shubman-gill.png`.
3. In `data.js`, set the player's `photoUrl`:
   ```js
   photoUrl: "photos/shubman-gill.png"
   ```
4. **Recommended format:** transparent PNG cutout, with the player facing forward and full upper body visible.  
   The image is contained over the team-colored placeholder, so transparent edges blend into the spotlight.

> If `photoUrl` is left as `""`, the site shows a team-colored player silhouette. If a team has no `logoUrl`, a team-code badge is used instead. Team sections and player-name accents use each team's `primaryColor` and `secondaryColor`. The spotlight reveal replays when scrolling back into a team, and spotlights tilt on pointer movement.

The motion effect is built with CSS and GSAP, not AI-generated video. To show real player-specific portraits, set `photoUrl` for each player. Reduced-motion preferences disable the effects and keep the content visible.

---

## 🚀 How to Deploy (Free)

### Option A — GitHub Pages *(simplest, fully free)*

1. Create a free account at [github.com](https://github.com) and make a new repository.
2. Upload all project files (drag & drop in the GitHub web UI).
3. Go to **Settings → Pages → Source** → select `main` branch → Save.
4. After ~1 minute you'll get a URL like `https://yourname.github.io/ipl-auction-2027/` — share it!

### Option B — Netlify *(drag & drop, instant)*

1. Go to [netlify.com](https://netlify.com) → click **"Deploy manually"** (no account needed for a quick test).
2. Drag your entire project **folder** onto the drop zone.
3. You instantly get a live URL like `https://random-name.netlify.app` — paste it in the WhatsApp group!

### Option C — Vercel

1. Install the Vercel CLI (requires Node.js):
   ```bash
   npm i -g vercel
   ```
2. Open a terminal in your project folder and run:
   ```bash
   vercel
   ```
3. Follow the prompts — it deploys automatically and gives you a URL.

---

## 📅 How to Change the Auction Countdown Date

Open `main.js` and find this line near the top:

```js
const AUCTION_DATE = new Date("2027-02-15T10:00:00");
```

Replace `2027-02-15T10:00:00` with your actual auction date and time in the format `YYYY-MM-DDTHH:MM:SS`. For example:

```js
const AUCTION_DATE = new Date("2027-03-01T14:00:00"); // 1 March 2027, 2 PM
```

Save the file — the countdown on the site updates automatically.

---

## 🎨 Customization Tips

- **Change the background colour:** Edit `--bg-base` in the `:root` block at the top of `style.css`.
- **Change the gold accent colour:** Edit `--accent` in `:root`.
- **Add team logos:** In `main.js`, find where `.team-badge` is built and add an `<img>` tag inside it pointing to your logo file.
- **Add more teams:** Copy an existing team block in `data.js` and fill in the new team's details.
- **Hide the custom cursor** (e.g. on touch devices): Set `.cursor, .cursor-follower { display: none; }` in `style.css`.

---

*IPL Fantasy Auction 2027 · Private League · Built with ❤️*
