/**
 * data.js — IPL Fantasy Auction 2027
 * ===================================
 * Single source of truth for all team and player data.
 * Edit team owners, colors, and retained players here.
 *
 * FIELD GUIDE
 * -----------
 * id            : short lowercase identifier used in CSS/JS references
 * name          : full franchise name
 * code          : 2–4 letter abbreviation shown on badges
 * owners        : array of player names who own/manage this fantasy team
 * primaryColor  : main brand hex color (used for card backgrounds, headers)
 * secondaryColor: accent hex color (used for highlights, text contrast)
 * purseTotal    : total purse in Crore (₹) — always 120 Cr per IPL rules
 * leaderboardPoints: current leaderboard score
 * players       : retained players (3–5), each with the fields below
 *
 * PLAYER FIELD GUIDE
 * ------------------
 * name           : cricketer's full name
 * role           : BAT (Batsman) | BOWL (Bowler) | AR (All-Rounder) | WK (Wicket-Keeper)
 * retentionPrice : amount spent retaining this player (Cr) — IPL tiers: 16.5 / 14 / 11 / 7 / 4
 * fantasyPoints  : last-season fantasy points earned (used for stats & bar charts)
 * photoUrl       : transparent player PNG path — leave "" to use a team-colored silhouette
 * logoUrl        : optional team logo PNG path on the team object
 */

// ─────────────────────────────────────────────
// Edit team data here
// ─────────────────────────────────────────────
window.IPL_DATA = {
  teams: [

    // ── 1. GUJARAT TITANS ──────────────────────────────────────────────────
    {
      id: "gt",
      name: "Gujarat Titans",
      code: "GT",
      owners: ["Saksham"],
      primaryColor: "#396aa2",
      secondaryColor: "#D9B34A",
      logoUrl: "Gujarat Titans Crest Logo.png",
      purseTotal: 120,
      leaderboardPoints: 0,

      // Edit players here
      players: [
        {
          name: "KL Rahul",
          role: "WK",
          retentionPrice: 24.5,
          fantasyPoints: 876,
          photoUrl: "KL Rahul in Gujarat Titans Jersey.png"
        },
        {
          name: "Shubman Gill",
          role: "BAT",          // opener & captain
          retentionPrice: 21.5, // Tier-1 retention
          fantasyPoints: 912,
          photoUrl: "Shubman Gill in Gujarat Titans Jersey.png"
        },
        {
          name: "Jasprit Bumrah",
          role: "BOWL",
          retentionPrice: 20,
          fantasyPoints: 948,
          photoUrl: "Jasprit Bumrah in Gujarat Titans Jersey.png"
        }
      ]
      // totalSpent, purseRemaining, totalFantasyPoints — auto-computed below
    },

    // ── 2. DELHI CAPITALS ──────────────────────────────────────────────────
    {
      id: "dc",
      name: "Delhi Capitals",
      code: "DC",
      owners: ["Sujal"],
      primaryColor: "#004C97",
      secondaryColor: "#EF3340",
      logoUrl: "DC.webp",
      purseTotal: 120,
      leaderboardPoints: 0,

      players: [
        {
          name: "Sai Sudharsan",
          role: "BAT",
          retentionPrice: 18.5,
          fantasyPoints: 0, // No fantasy-points value provided yet
          photoUrl: "Sai sudharshan.png"
        },
        {
          name: "Phil Salt",
          role: "WK",
          retentionPrice: 16,
          fantasyPoints: 0, // No fantasy-points value provided yet
          photoUrl: "Phil Salt.png"
        },
        {
          name: "Arshdeep Singh",
          role: "BOWL",
          retentionPrice: 12.5,
          fantasyPoints: 793,
          photoUrl: "Arshdeep Singh.png"
        }
      ]
    },

    // ── 3. PUNJAB KINGS ────────────────────────────────────────────────────
    {
      id: "pbks",
      name: "Punjab Kings",
      code: "PBKS",
      owners: ["Jagdeep"],
      primaryColor: "#AA1E2C",
      secondaryColor: "#FFFFFF",
      logoUrl: "PBKS.webp",
      purseTotal: 120,
      leaderboardPoints: 0,

      players: [
        {
          name: "Yashasvi Jaiswal",
          role: "BAT",
          retentionPrice: 15,
          fantasyPoints: 0, // No fantasy-points value provided yet
          photoUrl: "Yashasvi Jaiswal.png"
        },
        {
          name: "Finn Allen",
          role: "WK",
          retentionPrice: 12,
          fantasyPoints: 0, // No fantasy-points value provided yet
          photoUrl: "FIn Allen.png"
        },
        {
          name: "Tilak Verma",
          role: "BAT",
          retentionPrice: 13.5,
          fantasyPoints: 0, // No fantasy-points value provided yet
          photoUrl: "Tilak Verma.png"
        }
      ]
    },

    // ── 4. MUMBAI INDIANS ──────────────────────────────────────────────────
    {
      id: "mi",
      name: "Mumbai Indians",
      code: "MI",
      owners: ["Rajdeep"],
      primaryColor: "#004BA0",
      secondaryColor: "#D1AB3E",
      logoUrl: "MI logo.png",
      purseTotal: 120,
      leaderboardPoints: 0,

      players: [
        {
          name: "Ishan Kishan",
          role: "WK",
          retentionPrice: 18,
          fantasyPoints: 712,
          photoUrl: "Ishan Kishan in Mumbai Indians Jersey.png"
        },
        {
          name: "Abhishek Sharma",
          role: "BAT",
          retentionPrice: 20,
          fantasyPoints: 0, // No fantasy-points value provided yet
          photoUrl: "Abhishek Sharma in MI.png"
        },
        {
          name: "Prabhsimran Singh",
          role: "WK",
          retentionPrice: 7,
          fantasyPoints: 0, // No fantasy-points value provided yet
          photoUrl: "Prabhsimran Singh in MI.png"
        }
      ]
    },

    // ── 5. KOLKATA KNIGHT RIDERS ───────────────────────────────────────────
    {
      id: "kkr",
      name: "Kolkata Knight Riders",
      code: "KKR",
      owners: ["Kartik", "Pratik"],
      primaryColor: "#3A225D",
      secondaryColor: "#F5D130",
      logoUrl: "Kolkata-Knight-Riders-Logo.png",
      purseTotal: 120,
      leaderboardPoints: 0,

      players: [
        {
          name: "Heinrich Klaasen",
          role: "WK",
          retentionPrice: 17.5,
          fantasyPoints: 889,
          photoUrl: "Heinrich Klaasen in KKR Purple.png"
        },        
        {
          name: "MD Siraj",
          role: "BOWL",
          retentionPrice: 15,
          fantasyPoints: 889,
          photoUrl: "Mohammed Siraj in KKR Purple Jersey.png"
        },
        
        {
          name: "Varun Chakravarthy",
          role: "BOWL",
          retentionPrice: 15,
          fantasyPoints: 752,
          photoUrl: "Varun Chakaravarthy in KKR Purple.png"
        }
      ]
    },

    // ── 6. SUNRISERS HYDERABAD ─────────────────────────────────────────────
    {
      id: "srh",
      name: "Sunrisers Hyderabad",
      code: "SRH",
      owners: ["Akash"],
      primaryColor: "#f77321",
      secondaryColor: "#ff4800",
      logoUrl: "SRH.webp",
      purseTotal: 120,
      leaderboardPoints: 0,

      players: [
        {
          name: "Shreyas Iyer",
          role: "BAT",
          retentionPrice: 20,
          fantasyPoints: 858,
          photoUrl: "Shreyas Iyer in SRH Orange and Black.png"
        },
        {
          name: "Jos Buttler",
          role: "WK",
          retentionPrice: 19,
          fantasyPoints: 814,
          photoUrl: "Jos Buttler in SRH Jersey Cutout.png"
        },
        {
          name: "Kagiso Rabada",
          role: "BOWL",
          retentionPrice: 17.5,
          fantasyPoints: 876,
          photoUrl: "Sunrisers Hyderabad Cricket Portrait.png"
        }
        // totalSpent = 51.5 Cr
      ]
    },

    // ── 7. LUCKNOW SUPER GIANTS ────────────────────────────────────────────
    {
      id: "lsg",
      name: "Lucknow Super Giants",
      code: "LSG",
      owners: ["Suyash"],
      primaryColor: "#7A1735",
      secondaryColor: "#35A9E8",
      logoUrl: "LSG.png",
      purseTotal: 120,
      leaderboardPoints: 0,

      players: [
        {
          name: "Sanju Samson",
          role: "WK",
          retentionPrice: 25,
          fantasyPoints: 896,
          photoUrl: "Sanju Samson.png"
        },
        {
          name: "Priyansh Arya",
          role: "BAT",
          retentionPrice: 8.5,
          fantasyPoints: 0,
          photoUrl: "Priyansh Arya in LSG Jersey.png"
        }
      ]
    },

    // ── 8. ROYAL CHALLENGERS BENGALURU ────────────────────────────────────
    {
      id: "rcb",
      name: "Royal Challengers Bengaluru",
      code: "RCB",
      owners: ["Ketan"],
      primaryColor: "#C8102E",
      secondaryColor: "#FFD700",
      logoUrl: "RCB.png",
      purseTotal: 120,
      leaderboardPoints: 0,

      players: [
        {
          name: "Virat Kohli",
          role: "BAT",
          retentionPrice: 31,
          fantasyPoints: 942,
          photoUrl: "Virat Kohli in RCB Jersey.png"
        },
        {
          name: "Hardik Pandya",
          role: "AR",
          retentionPrice: 25.5,
          fantasyPoints: 867,
          photoUrl: "Hardik Pandya in RCB Jersey.png"
        },
        {
          name: "Rajat Patidar",
          role: "BAT",
          retentionPrice: 8,
          fantasyPoints: 0, // No fantasy-points value provided yet
          photoUrl: "Rajat Patidar in RCB Jersey.png"
        }
      ]
    },

    // ── 9. RAJASTHAN ROYALS ────────────────────────────────────────────────
    {
      id: "rr",
      name: "Rajasthan Royals",
      code: "RR",
      owners: ["Jayesh"],
      primaryColor: "#2D2A6E",
      secondaryColor: "#FF69B4",
      logoUrl: "RR.webp",
      purseTotal: 120,
      leaderboardPoints: 0,

      players: [
        {
          name: "Jofra Archer",
          role: "BOWL",
          retentionPrice: 6,
          fantasyPoints: 0,
          photoUrl: "Jofra Archer in Rajasthan Royals Jersey.png"
        },
        {
          name: "Ayush Mhatre",
          role: "BAT",
          retentionPrice: 2.8,
          fantasyPoints: 0,
          photoUrl: "Ayush Mhatre.png"
        },
        {
          name: "Krunal Pandya",
          role: "AR",
          retentionPrice: 7,
          fantasyPoints: 0,
          photoUrl: "Krunal Pandya in Rajasthan Royals Jersey.png"
        }
      ]
    },

    // ── 10. CHENNAI SUPER KINGS ────────────────────────────────────────────
    {
      id: "csk",
      name: "Chennai Super Kings",
      code: "CSK",
      owners: ["Rushi"],
      primaryColor: "#FFCB05",
      secondaryColor: "#005BAB",
      logoUrl: "chennai-super-kings-logo-csk-logo-icon-on-transparent-background-free-png.webp",
      purseTotal: 120,
      leaderboardPoints: 0,

      players: [
        {
          name: "Vaibhav Sooryavanshi",
          role: "BAT",
          retentionPrice: 13,
          fantasyPoints: 877,
          photoUrl: "CSK Cricket Player Studio Portrait.png"
        },
        {
          name: "Suryakumar Yadav",
          role: "BAT",
          retentionPrice: 17,
          fantasyPoints: 919,
          photoUrl: "Suryakumar Yadav in Yellow Jersey.png"
        },
        {
          name: "MD Shami",
          role: "BOWL",
          retentionPrice: 9,
          fantasyPoints: 862,
          photoUrl: "Mohammed Shami in CSK Yellow.png"
        }
        // totalSpent = 58 Cr
      ]
    }

  ] // end teams array
}; // end window.IPL_DATA


// ─────────────────────────────────────────────────────────────────────────────
// AUTO-COMPUTED STATS — do not edit below this line
// These values are derived automatically every time the page loads.
// ─────────────────────────────────────────────────────────────────────────────

(function computeStats() {
  const teams = window.IPL_DATA.teams;

  // Step 1: compute per-team aggregates
  teams.forEach(function (team) {
    // Sum of retention prices paid for all retained players
    team.totalSpent = team.players.reduce(function (sum, p) {
      return sum + p.retentionPrice;
    }, 0);
    // Round to 2 decimal places to avoid floating-point drift (e.g. 16.5 + 14 + ...)
    team.totalSpent = Math.round(team.totalSpent * 100) / 100;

    // Remaining auction purse
    team.purseRemaining = Math.round((team.purseTotal - team.totalSpent) * 100) / 100;

    // Total fantasy points across all retained players
    team.totalFantasyPoints = team.players.reduce(function (sum, p) {
      return sum + p.fantasyPoints;
    }, 0);
  });

  // Step 2: find the global maximum totalFantasyPoints (used for bar chart normalisation)
  var max = teams.reduce(function (m, team) {
    return Math.max(m, team.totalFantasyPoints);
  }, 0);

  teams.forEach(function (team) {
    team.maxFantasyPoints = max; // same value on every team — handy for chart components
  });

  console.log(
    "[IPL_DATA] Loaded " + teams.length + " teams. " +
    "Max totalFantasyPoints = " + max
  );
})();
