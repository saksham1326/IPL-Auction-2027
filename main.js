/**
 * main.js — IPL Fantasy Auction 2027
 * ====================================
 * Orchestrates all JS for the single-page site:
 *  1. Smooth scroll (Lenis) + GSAP ScrollTrigger registration
 *  2. Custom cursor
 *  3. DOM building from window.IPL_DATA
 *  4. Hero timeline animation
 *  5. Marquee ticker
 *  6. Per-team scroll animations (player spotlight, header, watermark)
 *  7. Counter count-up animation
 *  8. Scoreboard leaderboard build + animation
 *  9. Countdown timer
 * 10. prefers-reduced-motion safety
 *
 * Dependencies (globals from CDN, loaded before this script):
 *   gsap, ScrollTrigger, Lenis, window.IPL_DATA
 */

"use strict";

/* ─────────────────────────────────────────────────────────────────────────────
   0. REDUCED-MOTION GUARD
   ───────────────────────────────────────────────────────────────────────────── */

/** @type {boolean} True when the OS accessibility setting disables animations */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HERO_FEATURED_PLAYERS = [
  { teamId: "lsg", name: "Sanju Samson", photoUrl: "Sanju Samson.png" },
  { teamId: "pbks", name: "Yashasvi Jaiswal", photoUrl: "Yashasvi Jaiswal.png" },
  { teamId: "rr", name: "Krunal Pandya", photoUrl: "Krunal Pandya in Rajasthan Royals Jersey.png" },
  { teamId: "dc", name: "Sai Sudharsan", photoUrl: "Sai sudharshan.png" },
  { teamId: "gt", name: "Shubman Gill", photoUrl: "Shubman Gill in Gujarat Titans Jersey.png" },
  { teamId: "rcb", name: "Virat Kohli", photoUrl: "Virat Kohli in RCB Jersey.png" },
  { teamId: "srh", name: "Shreyas Iyer", photoUrl: "Shreyas Iyer in SRH Orange and Black.png" },
  { teamId: "mi", name: "Abhishek Sharma", photoUrl: "Abhishek Sharma in MI.png" },
  { teamId: "kkr", name: "Heinrich Klaasen", photoUrl: "Heinrich Klaasen in KKR Purple.png" },
  { teamId: "csk", name: "Vaibhav Sooryavanshi", photoUrl: "CSK Cricket Player Studio Portrait.png" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   1. LENIS + GSAP INIT
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Registers ScrollTrigger and syncs responsive Lenis scrolling with GSAP.
 */
function initScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);

  if (reducedMotion) return;

  const lenis = new Lenis({
    lerp: 0.14,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. DOM BUILDER — TEAM SECTIONS
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Renders the HTML string for a single broadcast-style player spotlight.
 * @param {Object} player  - Player data object.
 * @param {number} index   - Zero-based index within the team's player list.
 * @param {Object} team - Team details used for code, colors, and optional logo.
 * @returns {string} HTML string for the player-spotlight element.
 */
function buildPlayerSpotlight(player, index, team) {
  const revealRank = index === 0 ? 0 : index === 2 ? 1 : index === 1 ? 2 : index;
  const portraitClass = player.photoUrl ? "has-portrait" : "";
  const roleIcons = {
    BAT: { label: "Batsman", src: "White Cricket Bat Icon Transparent.png" },
    BOWL: { label: "Bowler", src: "White Cricket Ball with Scalloped Seams.png" },
    WK: { label: "Wicket-Keeper", src: "White Wicketkeeper Gloves Icon.png" },
    AR: {
      label: "All-Rounder",
      icons: [
        "White Cricket Bat Icon Transparent.png",
        "White Cricket Ball with Scalloped Seams.png",
      ],
    },
  };
  const role = roleIcons[player.role] || { label: player.role };
  const roleContent = role.src
    ? `<img class="role-icon" src="${role.src}" alt="" aria-hidden="true" decoding="async">`
    : role.icons
      ? role.icons.map((src) => `<img class="role-icon" src="${src}" alt="" aria-hidden="true" decoding="async">`).join("")
      : player.role;
  const portrait = player.photoUrl
    ? `<img class="player-cutout" src="${player.photoUrl}" alt="" loading="lazy" decoding="async">`
    : "";
  const logo = team.logoUrl
    ? `<img class="team-logo-image" src="${team.logoUrl}" alt="${team.name} logo" loading="lazy" decoding="async">`
    : `<span class="team-logo-placeholder" aria-hidden="true">${team.code}</span>`;

  return /* html */ `
    <article class="player-spotlight ${portraitClass}" data-index="${index}" style="--reel-delay:${revealRank * 140}ms">
      <div class="player-visual" aria-hidden="true"></div>
      <div class="spotlight-beams" aria-hidden="true"></div>
      <div class="player-figure" aria-hidden="true">
        <span class="player-figure__head"></span>
        <span class="player-figure__body"></span>
      </div>
      ${portrait}
      <div class="spotlight-smoke" aria-hidden="true"></div>
      <div class="team-logo-mark" aria-hidden="true">
        ${logo}
      </div>
      <div class="spotlight-topline">
        <span class="role-badge" aria-label="${role.label}">${roleContent}</span>
      </div>
      <span class="spotlight-team-code" aria-hidden="true">${team.code}</span>
      <div class="spotlight-content">
        <h3 class="player-name">${player.name}</h3>
        <div class="stat-row">
          <span class="retention-price">&#8377;${player.retentionPrice}Cr</span>
        </div>
      </div>
    </article>`;
}

/**
 * Renders the summary strip for a team.
 * @param {Object} team - Team data object (with pre-computed totalSpent and purseRemaining).
 * @returns {string} HTML string for the team-summary element.
 */
function buildTeamSummary(team) {
  return /* html */ `
    <div class="team-summary">
      <div class="summary-box">
        <span class="summary-label">Players</span>
        <span class="summary-value">${team.players.length}</span>
      </div>
      <div class="summary-box">
        <span class="summary-label">Spent</span>
        <span class="summary-value">&#8377;${team.totalSpent.toFixed(1)}Cr</span>
      </div>
      <div class="summary-box">
        <span class="summary-label">Purse Left</span>
        <span class="summary-value purse-remaining">&#8377;${team.purseRemaining.toFixed(1)}Cr</span>
      </div>
    </div>`;
}

/**
 * Reads window.IPL_DATA.teams, builds a <section> for every team,
 * and inserts them all into <main id="teams-container">.
 * Also sets initial hidden states for GSAP scroll animations.
 */
function buildTeamSections() {
  const container = document.getElementById("teams-container");
  if (!container) {
    console.error("buildTeamSections: #teams-container not found in DOM.");
    return;
  }

  const { teams } = window.IPL_DATA;

  teams.forEach((team) => {
    const section = document.createElement("section");
    section.className = "team-section";
    section.id = `team-${team.id}`;
    section.style.setProperty("--team-primary", team.primaryColor);
    section.style.setProperty("--team-secondary", team.secondaryColor);

    // Build player cards HTML
    const spotlightsHtml = team.players
      .map((player, i) => buildPlayerSpotlight(player, i, team))
      .join("");
    const teamHeaderMark = team.logoUrl
      ? `<img class="team-header-logo" src="${team.logoUrl}" alt="${team.name} logo" decoding="async">`
      : `<span class="team-code-outline" aria-hidden="true">${team.code}</span>`;

    section.innerHTML = /* html */ `
      <div class="team-bg-code" aria-hidden="true">${team.code}</div>
      <div class="team-header">
        ${teamHeaderMark}
        <div class="team-name-block">
          <h2 class="team-name">${team.name}</h2>
          <span class="team-owner-badge">${team.owners.join(" &amp; ")}</span>
        </div>
      </div>
      <div class="players-grid${team.players.length === 2 ? " players-grid--two" : ""}">
        ${spotlightsHtml}
      </div>
      ${buildTeamSummary(team)}`;

    container.appendChild(section);

    // Set initial states for scroll animation (unless reduced motion)
    if (!reducedMotion) {
      gsap.set(section.querySelector(".team-bg-code"), { opacity: 0, scale: 1.5 });
      gsap.set(section.querySelector(".team-header"), { x: -80, opacity: 0 });
      gsap.set(section.querySelectorAll(".player-spotlight"), {
        y: 70,
        opacity: 0,
        scale: 0.94,
        transformOrigin: "50% 100%",
      });
      gsap.set(section.querySelectorAll(".player-name"), {
        y: 24,
        opacity: 0,
        scale: 0.9,
        transformOrigin: "0 100%",
      });
      gsap.set(section.querySelector(".team-summary"), { y: 40, opacity: 0 });
    }
  });
}

function buildTeamDirectory() {
  const directory = document.getElementById("team-directory");
  const detail = document.getElementById("team-detail");
  if (!directory || !detail) {
    console.error("buildTeamDirectory: required team directory elements not found.");
    return;
  }

  const roles = [
    { key: "BAT", title: "BATTERS" },
    { key: "WK", title: "WICKET-KEEPERS" },
    { key: "AR", title: "ALL-ROUNDERS" },
    { key: "BOWL", title: "BOWLERS" },
  ];
  const teams = window.IPL_DATA.teams;
  const buttons = new Map();

  function showTeam(team) {
    buttons.forEach((button, teamId) => {
      button.setAttribute("aria-pressed", String(teamId === team.id));
    });

    detail.style.setProperty("--team-primary", team.primaryColor);
    detail.style.setProperty("--team-secondary", team.secondaryColor);
    detail.hidden = false;

    const teamHeaderMark = team.logoUrl
      ? `<img class="team-header-logo" src="${team.logoUrl}" alt="${team.name} logo" decoding="async">`
      : `<span class="team-code-outline" aria-hidden="true">${team.code}</span>`;
    const roleGroups = roles.map(({ key, title }) => {
      const players = team.players.filter((player) => player.role === key);
      const cards = players
        .map((player, index) => buildPlayerSpotlight(player, index, team))
        .join("");
      const gridSizeClass = players.length === 1
        ? " players-grid--one"
        : players.length === 2
          ? " players-grid--two"
          : "";

      return /* html */ `
        <section class="team-role-group" aria-label="${title}">
          <div class="team-role-heading">
            <h3>${title}</h3>
            <span>${players.length}</span>
          </div>
          ${players.length
            ? `<div class="players-grid${gridSizeClass}">${cards}</div>`
            : `<p class="team-role-empty">No retained players in this role.</p>`}
        </section>`;
    }).join("");

    detail.innerHTML = /* html */ `
      <div class="team-bg-code" aria-hidden="true">${team.code}</div>
      <div class="team-header">
        ${teamHeaderMark}
        <div class="team-name-block">
          <h2 class="team-name" id="team-detail-title">${team.name}</h2>
          <span class="team-owner-badge">${team.owners.join(" &amp; ")}</span>
        </div>
      </div>
      <div class="team-role-groups">${roleGroups}</div>
      ${buildTeamSummary(team)}`;
    initSpotlightTilt(detail);
  }

  teams.forEach((team) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "team-select";
    button.setAttribute("aria-pressed", "false");
    button.style.setProperty("--team-primary", team.primaryColor);
    button.style.setProperty("--team-secondary", team.secondaryColor);

    const logo = team.logoUrl
      ? `<img class="team-select__logo" src="${team.logoUrl}" alt="" loading="lazy" decoding="async">`
      : `<span class="team-select__code" aria-hidden="true">${team.code}</span>`;
    button.innerHTML = `${logo}<span class="team-select__name">${team.name}</span>`;
    button.addEventListener("click", () => {
      showTeam(team);
      detail.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });

    directory.appendChild(button);
    buttons.set(team.id, button);
  });

  if (teams.length > 0) showTeam(teams[0]);
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. SCOREBOARD BUILDER
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Builds an alphabetically ordered team leaderboard inside #scoreboard-grid.
 */
function buildScoreboard() {
  const board = document.getElementById("scoreboard-grid");
  if (!board) return;

  const teams = [...window.IPL_DATA.teams].sort((a, b) => a.name.localeCompare(b.name));
  const rows = teams.map((team, index) => {
    const logo = team.logoUrl
      ? `<img class="leaderboard-team-logo" src="${team.logoUrl}" alt="" loading="lazy" decoding="async">`
      : `<span class="leaderboard-team-code" aria-hidden="true">${team.code}</span>`;
    const points = Number.isFinite(team.leaderboardPoints) ? team.leaderboardPoints : 0;

    return /* html */ `
      <li class="leaderboard-row" style="--team-primary:${team.primaryColor};--team-secondary:${team.secondaryColor}">
        <span class="leaderboard-rank">${index + 1}</span>
        <span class="leaderboard-emblem">${logo}</span>
        <span class="leaderboard-team-name">${team.name}</span>
        <span class="leaderboard-points">${points}</span>
      </li>`;
  }).join("");

  board.innerHTML = /* html */ `
    <div class="leaderboard-head" aria-hidden="true">
      <span>RANK</span>
      <span></span>
      <span>TEAM</span>
      <span>POINTS</span>
    </div>
    <ol class="leaderboard-list" aria-label="Team rankings">${rows}</ol>`;
}

/**
 * Builds the featured-player lineup with the IPL trophy between both teams.
 */
function buildHeroLineup() {
  const lineup = document.getElementById("hero-lineup");
  if (!lineup) {
    console.error("buildHeroLineup: #hero-lineup not found in DOM.");
    return;
  }

  const teamsById = new Map(window.IPL_DATA.teams.map((team) => [team.id, team]));
  const featuredPlayers = HERO_FEATURED_PLAYERS.flatMap((player) => {
    const team = teamsById.get(player.teamId);
    if (!team) {
      console.error(`buildHeroLineup: team "${player.teamId}" not found.`);
      return [];
    }

    return [{ ...player, team }];
  });
  const midpoint = Math.ceil(featuredPlayers.length / 2);
  const renderPlayer = ({ name, photoUrl, team }, layer) => `
    <a class="hero-player" href="#team-${team.id}" style="--hero-team-color:${team.primaryColor};--hero-player-layer:${layer}" aria-label="${name}, ${team.name}">
      <img class="hero-player__portrait" src="${photoUrl}" alt="${name}" decoding="async">
      <span class="hero-player__meta">
        <span class="hero-player__team">${team.code}</span>
        <span class="hero-player__name">${name}</span>
      </span>
    </a>`;
  const trophy = `
    <div class="hero-trophy">
      <span class="hero-trophy__glow" aria-hidden="true"></span>
      <img class="hero-trophy__image" src="IPl.png" alt="IPL trophy" decoding="async">
      <span class="hero-trophy__label">THE IPL TROPHY</span>
    </div>`;
  const renderSide = (players, side) => `
    <div class="hero-lineup__side hero-lineup__side--${side}">
      ${players.map((player, index) => {
        const layer = side === "left" ? index + 1 : players.length - index;
        return renderPlayer(player, layer);
      }).join("")}
    </div>`;

  lineup.innerHTML = [
    renderSide(featuredPlayers.slice(0, midpoint), "left"),
    trophy,
    renderSide(featuredPlayers.slice(midpoint), "right"),
  ].join("");
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. HERO ANIMATION
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Runs the hero entrance timeline:
 * background fade → title slide-up → "2027" slam with bounce → subtitle → scroll cue.
 * Skipped entirely when reducedMotion is true.
 */
function animateHero() {
  if (reducedMotion) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from("#hero", { opacity: 0, duration: 0.6 })
    .from(
      ".hero-badge",
      { y: 30, opacity: 0, duration: 0.6 },
      "-=0.2"
    )
    .from(
      ".hero-title .hero-line",
      { y: 60, opacity: 0, duration: 0.7, stagger: 0.1 },
      "-=0.3"
    )
    .from(
      ".hero-subtitle",
      { y: 20, opacity: 0, duration: 0.6 },
      "-=0.3"
    )
    .from(
      ".hero-player",
      { y: 50, opacity: 0, duration: 0.55, stagger: 0.06 },
      "-=0.2"
    )
    .from(
      ".hero-trophy",
      { y: 24, scale: 0.92, opacity: 0, duration: 0.7, ease: "back.out(1.4)" },
      "-=0.6"
    )
    .from(
      ".scroll-cue",
      { y: -10, opacity: 0, duration: 0.5 },
      "-=0.2"
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   6. MARQUEE
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Animates .marquee-track with an infinite left-scroll loop using GSAP.
 * The track is expected to contain duplicated content so the loop is seamless.
 * Skipped when reducedMotion is true (CSS fallback handles it).
 */
function animateMarquee() {
  if (reducedMotion) return;

  const track = document.querySelector(".marquee-track");
  if (!track) return;

  // Calculate total scrollable width (half, since content is duplicated)
  gsap.to(track, {
    x: "-50%",
    duration: 20,
    ease: "none",
    repeat: -1,
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   7. TEAM SECTION SCROLL ANIMATIONS
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Creates a ScrollTrigger for each .team-section that:
 *  1. Fades + scales in the giant background code watermark
 *  2. Slides in the team header from the left
 *  3. Reveals each player spotlight with a short stagger
 *  4. Slides up the team summary strip
 * Skipped when reducedMotion is true.
 */
function initTeamScrollAnimations() {
  if (reducedMotion) return;

  document.querySelectorAll(".team-section:not(.team-detail)").forEach((section) => {
    const bgCode = section.querySelector(".team-bg-code");
    const header = section.querySelector(".team-header");
    const spotlights = Array.from(section.querySelectorAll(".player-spotlight"));
    const revealOrder = [
      ...spotlights.filter((spotlight) => spotlight.dataset.index === "0"),
      ...spotlights.filter((spotlight) => spotlight.dataset.index === "2"),
      ...spotlights.filter((spotlight) => spotlight.dataset.index === "1"),
      ...spotlights.filter((spotlight) => Number(spotlight.dataset.index) > 2),
    ];
    const summary = section.querySelector(".team-summary");

    gsap.to(bgCode, {
      y: -70,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    const revealTeam = () => {
      spotlights.forEach((spotlight) => spotlight.classList.add("is-live"));

      const tl = gsap.timeline();
      tl.to(bgCode, {
          opacity: 0.07,
          scale: 1,
          duration: 0.45,
          ease: "power2.out",
        }, 0)
        .to(
          header,
          { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
          0
        )
        .to(
          revealOrder,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            stagger: 0.14,
            ease: "back.out(1.35)",
          },
          0.05
        )
        .to(
          revealOrder.map((spotlight) => spotlight.querySelector(".player-name")),
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.32,
            stagger: 0.14,
            ease: "back.out(1.8)",
          },
          0.38
        );

        tl.to(
          summary,
          { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
          0.1
        );
    };

    const resetTeam = () => {
      const names = spotlights.map((spotlight) => spotlight.querySelector(".player-name"));
      gsap.killTweensOf(bgCode, "opacity,scale");
      gsap.killTweensOf([header, ...spotlights, ...names, summary]);
      spotlights.forEach((spotlight) => spotlight.classList.remove("is-live"));
      gsap.set(bgCode, { opacity: 0, scale: 1.5 });
      gsap.set(header, { x: -80, opacity: 0 });
      gsap.set(spotlights, {
        y: 70,
        opacity: 0,
        scale: 0.94,
        transformOrigin: "50% 100%",
      });
      gsap.set(names, { y: 24, opacity: 0, scale: 0.9, transformOrigin: "0 100%" });
      gsap.set(summary, { y: 40, opacity: 0 });
    };

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: revealTeam,
      onEnterBack: revealTeam,
      onLeaveBack: resetTeam,
    });
  });
}

function initSpotlightTilt(root = document) {
  if (reducedMotion) return;

  root.querySelectorAll(".player-spotlight:not([data-tilt-ready])").forEach((spotlight) => {
    spotlight.dataset.tiltReady = "true";
    const tiltX = gsap.quickTo(spotlight, "rotationX", {
      duration: 0.35,
      ease: "power2.out",
    });
    const tiltY = gsap.quickTo(spotlight, "rotationY", {
      duration: 0.35,
      ease: "power2.out",
    });

    function setTilt(event) {
      const bounds = spotlight.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      tiltX(y * -8);
      tiltY(x * 10);
    }

    spotlight.addEventListener("pointermove", setTilt);
    spotlight.addEventListener("pointerleave", () => {
      tiltX(0);
      tiltY(0);
    });
    spotlight.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "touch") return;
      setTilt(event);
      gsap.delayedCall(0.5, () => {
        tiltX(0);
        tiltY(0);
      });
    });
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   8. COUNTER COUNT-UP ANIMATION
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * For every .counter element, creates a ScrollTrigger that counts
 * from 0 up to data-target when the element enters the viewport.
 * Uses a GSAP proxy object to update innerHTML each frame.
 * Skipped when reducedMotion is true (target value shown immediately).
 */
function initCounters() {
  document.querySelectorAll(".counter").forEach((el) => {
    const target = parseInt(el.dataset.target, 10) || 0;

    if (reducedMotion) {
      el.textContent = target;
      return;
    }

    const proxy = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(proxy, {
          val: target,
          duration: 1.6,
          ease: "power1.out",
          onUpdate: () => {
            el.textContent = Math.round(proxy.val);
          },
        });
      },
    });
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   9. SCOREBOARD SCROLL ANIMATION
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Animates the scoreboard when it scrolls into view:
 *  - Rows slide in from the left with stagger
 * Skipped when reducedMotion is true.
 */
function initScoreboardAnimation() {
  const board = document.getElementById("scoreboard-grid");
  if (!board) return;

  const rows = board.querySelectorAll(".leaderboard-row");
  if (reducedMotion) return;

  ScrollTrigger.create({
    trigger: board,
    start: "top 75%",
    once: true,
    onEnter: () => {
      // Rows slide in
      gsap.from(rows, {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   10. COUNTDOWN TIMER
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Updates the four countdown elements (#cd-days, #cd-hours, #cd-mins, #cd-secs)
 * every second, counting down to the IPL 2027 auction date.
 */
function initCountdown() {
  const targetDate = new Date("2027-02-15T10:00:00");

  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs"),
  };

  // Bail gracefully if elements aren't in the HTML
  if (!els.days || !els.hours || !els.mins || !els.secs) return;

  /**
   * Pads a number to at least 2 digits.
   * @param {number} n
   * @returns {string}
   */
  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const now = Date.now();
    const diff = targetDate.getTime() - now;

    if (diff <= 0) {
      els.days.textContent = "00";
      els.hours.textContent = "00";
      els.mins.textContent = "00";
      els.secs.textContent = "00";
      return; // stop ticking
    }

    const totalSecs = Math.floor(diff / 1000);
    const days = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    els.days.textContent = pad(days);
    els.hours.textContent = pad(hours);
    els.mins.textContent = pad(mins);
    els.secs.textContent = pad(secs);

    setTimeout(tick, 1000);
  }

  tick();
}

/* ─────────────────────────────────────────────────────────────────────────────
   11. NAV HIGHLIGHT (bonus UX)
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Highlights the active nav link as each team section scrolls into view.
 * Relies on <nav> anchor links matching team section IDs (#team-gt, etc.).
 */
function initNavHighlight() {
  document.querySelectorAll(".team-section:not(.team-detail)").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: ({ isActive }) => {
        const id = section.id; // e.g. "team-gt"
        const link = document.querySelector(`nav a[href="#${id}"]`);
        if (link) link.classList.toggle("nav-active", isActive);
      },
    });
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   12. STATIC FALLBACK for reducedMotion
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * When prefers-reduced-motion is active, ensures all elements that would
 * normally be hidden by GSAP initial states are instead visible.
 */
function applyStaticFallback() {
  // Make sure nothing stays invisible from inline styles
  document.querySelectorAll(
    ".team-bg-code, .team-header, .player-spotlight, .player-name, .team-summary, " +
    ".hero-eyebrow, .hero-title, .hero-year, .hero-subtitle, .scroll-cue"
  ).forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });

  // Set all counter elements to their target values
  document.querySelectorAll(".counter").forEach((el) => {
    el.textContent = el.dataset.target || "0";
  });

}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN ENTRY POINT
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Main initialisation — called after DOMContentLoaded.
 * Runs builders, then kicks off animations in dependency order.
 */
function init() {
  // Guard: data must be present
  if (!window.IPL_DATA || !window.IPL_DATA.teams) {
    console.error("main.js: window.IPL_DATA not found. Ensure data.js is loaded first.");
    return;
  }

  // ── Build DOM ──
  if (document.getElementById("hero-lineup")) buildHeroLineup();
  if (document.getElementById("teams-container")) buildTeamSections();
  if (document.getElementById("team-directory")) buildTeamDirectory();
  if (document.getElementById("scoreboard-grid")) buildScoreboard();

  // ── Smooth scroll + ScrollTrigger ──
  initScrollTrigger();

  if (reducedMotion) {
    applyStaticFallback();
  } else {
    // ── Hero entrance ──
    if (document.querySelector("#hero")) animateHero();

    // ── Marquee ──
    if (document.querySelector(".marquee-track")) animateMarquee();

    // ── Team scroll animations ──
    if (document.querySelector(".team-section:not(.team-detail)")) initTeamScrollAnimations();

    // ── Spotlight pointer tilt ──
    if (document.querySelector(".player-spotlight")) initSpotlightTilt();

    // ── Counter count-up ──
    initCounters();

    // ── Scoreboard ──
    if (document.getElementById("scoreboard-grid")) initScoreboardAnimation();

    // ── Nav highlight ──
    if (document.querySelector(".team-section:not(.team-detail)")) initNavHighlight();
  }

  // ── Countdown (always runs, no animation) ──
  initCountdown();

  // After all ScrollTriggers are set up, recalculate positions
  ScrollTrigger.refresh();
}

// Kick off after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
