export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  overview: string;
  contribution?: string;
  features: { title: string; description: string }[];
  decisions?: { title: string; description: string }[];
  results?: {
    changes: { title: string; description: string; href: string }[];
    validation: string;
  };
  links?: { label: string; href: string }[];
  note?: string;
  tools: string[];
  cover: { motif: string; caption: string; image?: string; alt?: string };
};

// Concise draft copy verified against the local project READMEs, October 2026.
// Sources: ~/rescened/README.md, ~/repos/FantasyBball-Analysis/README.md,
// ~/wayoffmars/README.md. These are editorial covers, not product screenshots.
// Add approved images in public/projects and set cover.image + cover.alt here.
export const projects: Project[] = [
  {
    slug: "rescened",
    title: "ReScened",
    category: "music / full-stack",
    summary: "A social music diary and community-curated album catalog.",
    overview: "ReScened gives album listening a lasting record: what you played, when you played it, and what you thought. It brings a personal diary, reviews, collections, and social activity together around a community-curated catalog.",
    contribution: "I work across the React interface and Node/Express API. Recent contributions include review editing and bulk moderation, with fixes for edits across navigation and simultaneous approval actions.",
    features: [
      { title: "Remember a listen", description: "Log albums by date, revisit a calendar, and organize collections on boards. Listening history stays separate from ratings and reviews." },
      { title: "Automatic listens with Last.fm", description: "Eligible users can opt in to automatic album logging from Last.fm’s API. Listening activity is matched against reviewed album mappings and tracklists before qualifying listens enter the diary; manual logging stays available." },
      { title: "Share the experience", description: "Write and edit reviews, discuss albums, and follow listening activity from other people." },
      { title: "Improve the catalog", description: "Submit albums and corrections for moderator review, with a recorded history of catalog changes." },
    ],
    decisions: [
      { title: "Own the album identity", description: "Stable public UUIDs keep diary entries and reviews independent of an external provider. MusicBrainz enriches the local catalog; external search candidates need approval before becoming usable albums." },
      { title: "Make writes safe to repeat", description: "Idempotent diary and review requests prevent duplicates on retry. Moderation uses transactions and revision checks to prevent partial publication or approval of changes a moderator has not reviewed." },
      { title: "Enforce access on the server", description: "Clerk handles authentication; the API checks ownership, profile privacy, and moderator permissions before allowing protected actions." },
    ],
    results: {
      changes: [
        { title: "Review editing · PR #27", description: "Kept pending edits isolated when navigating between reviews or switching accounts. Edits preserve the original date without notifying followers again.", href: "https://github.com/jkind889/rescened/pull/27" },
        { title: "Bulk moderation · PR #28", description: "Added approval of up to 20 suggestions with independent results, and fixed concurrency races in approval interactions.", href: "https://github.com/jkind889/rescened/pull/28" },
      ],
      validation: "Combined validation for PRs #27 and #28, October 28, 2026: 614 unit tests and 241 integration tests passed. Counts describe that revision’s validation run.",
    },
    links: [
      { label: "visit ReScened", href: "https://www.rescened.com/" },
      { label: "source on GitHub", href: "https://github.com/jkind889/rescened" },
    ],
    note: "Product screenshots and a visual walkthrough are still to come.",
    tools: ["MongoDB", "Express", "React", "Vite", "Node.js", "Clerk"],
    cover: { motif: "record", caption: "listening / collecting / remembering" },
  },
  {
    "slug": "fantasybball-analysis",
    "title": "FantasyBball-Analysis",
    "category": "sports / data",
    "summary": "A Python toolkit for reviewing an ESPN fantasy basketball season and planning roster moves.",
    "overview": "A useful pickup depends on more than a player's average: the remaining schedule, available lineup slots, and league rules all matter. FantasyBball-Analysis turns ESPN league data into season reports, player rankings, and roster-aware recommendations for daily head-to-head points leagues.",
    "contribution": "I built the Python reporting pipeline and extended it into draft rankings, start/sit recommendations, and waiver planning. The work connects ESPN data and MySQL storage with pandas analysis, legal lineup optimization, and replayable decision snapshots.",
    "features": [
      {
        "title": "Understand the season",
        "description": "Review draft value, roster changes, breakout players, and lineup efficiency through CSV reports."
      },
      {
        "title": "Compare player value",
        "description": "Blend prior-season and current-season production with available ESPN forecasts into rest-of-season estimates, then rank players against replacement options at their positions."
      },
      {
        "title": "Plan the next move",
        "description": "Compare legal add/drop moves and bounded multi-move streaming plans against holding the roster, with projected gains and daily lineup exports."
      }
    ],
    "decisions": [
      {
        "title": "Count games the lineup can use",
        "description": "SciPy assigns players to eligible daily slots. Waiver plans account for roster locks, player availability, and acquisition budgets before comparing projected points."
      },
      {
        "title": "Make decisions replayable",
        "description": "Deterministic scoring runs on saved snapshots, separate from provider and database access. CSV and JSON exports expose the inputs, assumptions, and lineup contributions behind a recommendation."
      },
      {
        "title": "Keep AI review bounded",
        "description": "Optional Claude review compares supplied plans using dated context. Python validates the selection; Claude cannot change computed points or submit transactions, and invalid responses fall back to deterministic rankings."
      }
    ],
    "links": [
      {
        "label": "source on GitHub · predictive engine",
        "href": "https://github.com/jkind889/FantasyBball-Analysis/tree/predictive-engine"
      },
      {
        "label": "streaming guide / offline replay",
        "href": "https://github.com/jkind889/FantasyBball-Analysis/blob/predictive-engine/docs/streaming_planner.md"
      }
    ],
    "note": "CLI project in active development. Streaming searches a bounded set of plans; projected gains are estimates, not measured results.",
    "tools": [
      "Python",
      "pandas",
      "espn-api",
      "MySQL",
      "SciPy"
    ],
    "cover": {
      "motif": "court",
      "caption": "analyze / project / plan"
    }
  },
  {
    slug: "wayoffmars",
    title: "Wayoffmars",
    category: "type / design tools",
    summary: "A local design library for font previews, images, notes, and searchable PDFs.",
    overview: "Wayoffmars is a local Mac workspace for collecting design material and trying type. Font specimens support custom text and appearance controls, while a local library keeps fonts, images, notes, and searchable PDF text together.",
    features: [
      { title: "Try the type", description: "Preview TTF, OTF, WOFF, and WOFF2 files with adjustable size, tracking, line height, alignment, and colors." },
      { title: "Keep a design library", description: "Collect fonts, images, design notes, and searchable PDF text in a local workspace." },
      { title: "Keep it local", description: "The library uses local SQLite storage and file assets, with explicit backup and restore workflows." },
    ],
    tools: ["Next.js", "TypeScript", "SQLite"],
    cover: { motif: "type", caption: "type / image / reference" },
  },
  {
    "slug": "inventory-management",
    "title": "Inventory Management",
    "category": "personal tools / full-stack",
    "summary": "A personal inventory and spending tracker for what I own, buy, and want next.",
    "overview": "Inventory Management brings possessions and purchase history into one workspace. Collections show what I own, Spending shows where the money went, and Future Wants keeps planned purchases separate. Item check-ins add the part a receipt cannot capture: whether something was worth buying.",
    "contribution": "I build the interface, authenticated API, and database model. Recent work adds purchases without inventory items, collection editing and bulk tools, and backups that preserve photos, tags, and subscription history.",
    "features": [
      {
        "title": "Organize the collection",
        "description": "Browse categories, search notes, filter by tags, and save views. Item details hold private cover photos, purchase records, and a history of value check-ins."
      },
      {
        "title": "See the spending",
        "description": "Review monthly totals, category breakdowns, and purchase history. Record a new possession and its purchase together, add an already-owned item, or log spending without adding an item."
      },
      {
        "title": "Plan what comes next",
        "description": "Save wishlist entries with estimates, links, notes, and priorities. Track monthly or yearly subscription renewals with in-app reminders; expected costs do not become recorded spending."
      },
      {
        "title": "Keep the records portable",
        "description": "Preview CSV imports, export collection and transaction records, and create ZIP backups with photos. Restore a complete backup into an empty collection."
      }
    ],
    "decisions": [
      {
        "title": "Separate ownership from spending",
        "description": "Items and expenses are distinct records, so an old possession needs no invented price and a meal needs no inventory entry. Money uses integer minor units; monthly totals follow actual purchase dates."
      },
      {
        "title": "Make retries predictable",
        "description": "An account-scoped request key ties each submission to a saved result. Database transactions and advisory locks let identical retries return that result while rejecting conflicting reuse."
      },
      {
        "title": "Keep account access on the server",
        "description": "Hono verifies Supabase access tokens before running Drizzle queries through a restricted Postgres role. Transaction-local identity, row-level security, and same-owner relationships keep records scoped to the signed-in account."
      }
    ],
    "links": [
      {
        "label": "source on GitHub",
        "href": "https://github.com/jkind889/inventory-management"
      }
    ],
    "tools": [
      "Next.js",
      "React",
      "TypeScript",
      "Hono",
      "Drizzle",
      "PostgreSQL",
      "Supabase"
    ],
    "cover": {
      "motif": "type",
      "caption": "collect / spend / reflect"
    }
  },
  {
    "slug": "goneoffmars",
    "title": "goneoffmars",
    "category": "posters / commerce",
    "summary": "A poster archive and storefront for my prints, commissions, and visual work.",
    "overview": "goneoffmars gives my design work a home of its own. Visitors can explore the poster archive, inspect individual prints, choose a size, and build a cart. The storefront combines a custom visual identity with account access, Stripe Checkout integration, and order history.",
    "contribution": "I work across the archive interface and storefront implementation. Recent work extends an adapted, MIT-licensed ASCII fish simulation across the site, adds navy and dark themes, and updates the public contact flow.",
    "features": [
      {
        "title": "Explore the work",
        "description": "Search posters by title, collection, or year and switch between list and grid views. Individual poster pages show the artwork, description, available sizes, and prices."
      },
      {
        "title": "Build an order",
        "description": "Keep a cart across visits, adjust quantities, and sign in to start Stripe Checkout. Account pages display paid orders and their fulfillment status."
      },
      {
        "title": "Give the site a shared atmosphere",
        "description": "An ASCII ocean continues across page navigation, with navy and dark palettes, a pause control, and a still frame for reduced-motion preferences."
      },
      {
        "title": "Start a commission conversation",
        "description": "The contact form prepares a commission inquiry in the visitor's email app, addressed to the shop's public contact email."
      }
    ],
    "decisions": [
      {
        "title": "Validate checkout on the server",
        "description": "The browser sends variant IDs and quantities. The API checks active catalog records and prices before creating a Checkout Session, using an attempt ID to make session creation retryable."
      },
      {
        "title": "Confirm payment through webhooks",
        "description": "Signed Stripe events are checked against the stored order before updating payment status. Duplicate events do not repeat the transition from pending to paid."
      },
      {
        "title": "Keep motion optional",
        "description": "One dynamically loaded canvas lives in the shared layout. It leaves page controls clickable, remembers manual pause within the tab, and stops animating when the document is hidden."
      }
    ],
    "results": {
      "changes": [
        {
          "title": "Sitewide ASCII ocean · PR #2",
          "description": "Extended the fish animation from the homepage to the shared layout, added coordinated navy and dark themes, and updated the public contact email.",
          "href": "https://github.com/jkind889/mars2026/pull/2"
        }
      ],
      "validation": "Merged October 29, 2026 (UTC). The fish adaptation retains its upstream MIT license and includes pause and reduced-motion behavior."
    },
    "links": [
      {
        "label": "visit goneoffmars",
        "href": "https://www.goneoffmars.com/"
      },
      {
        "label": "source on GitHub",
        "href": "https://github.com/jkind889/mars2026"
      }
    ],
    "tools": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Stripe",
      "Canvas"
    ],
    "cover": {
      "motif": "type",
      "caption": "posters / prints / commissions"
    }
  },
];

export const projectHref = (slug: string) => `#/projects/${slug}`;
