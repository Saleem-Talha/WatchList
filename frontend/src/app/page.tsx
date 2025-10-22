"use client";
import Link from "next/link";
import Image from "next/image";
import LayoutCard from "./components/Layout";

/** Quick theme switch: change these two to retheme the background */
const BG_FROM = "from-slate-50";
const BG_TO = "to-indigo-50";

export default function LandingPage() {
  return (
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${BG_FROM} ${BG_TO}`}>
      {/* Background ornaments */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-[-10%] h-[520px] w-[520px] rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute -right-36 bottom-[-10%] h-[520px] w-[520px] rounded-full bg-indigo-200/35 blur-3xl" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(30,41,59,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,.06)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* Header */}
      <header className="mx-auto w-full max-w-7xl px-6 pt-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">W</span>
            <span className="hidden text-sm font-semibold text-slate-800 sm:inline">WatchList</span>
          </Link>

          <nav className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900">
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section with Preview */}
      <section className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Left column - Hero Content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs text-indigo-700 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              New: Email reminders for planned watches
            </span>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              WatchList — Your personal tracker for movies, series & anime
            </h1>

            <p className="mt-5 max-w-xl text-lg text-slate-700">
              Keep track of what you want to watch, what you're watching, and what you've finished.
              Private, lightweight, and delightfully simple.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white shadow-sm transition hover:bg-indigo-700"
              >
                Create your free list
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-900 hover:bg-slate-50"
              >
                Sign in
              </Link>
              <span className="text-sm text-slate-500">No ads • No trackers</span>
            </div>

            {/* Feature bullets */}
            <ul className="mt-8 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
              <Bullet title="Add items fast" desc="Movies, series or anime with notes and images." />
              <Bullet title="Organize clearly" desc="Statuses: planned, watching, watched." />
              <Bullet title="Manage easily" desc="Edit, reorder, and clean up anytime." />
              <Bullet title="Email reminders" desc="Get an email ahead of time and at the exact time." highlight />
            </ul>
          </div>

          {/* Right column - Preview Cards */}
          <div className="relative">
            {/* Main preview card */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">Your Dashboard</h3>
              <p className="text-sm text-slate-700">A preview of how your items will look.</p>

              <div className="mt-6 space-y-3">
                <PreviewRow
                  title="Inception"
                  meta="Movie • planned"
                  src="https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
                />
                <PreviewRow
                  title="One Piece"
                  meta="Anime • watching"
                  src="https://image.tmdb.org/t/p/w300/e3NBGiAifW9Xt8xD5tpARskjccO.jpg"
                />
                <PreviewRow
                  title="Demon Slayer: Mugen Train"
                  meta="Movie • watched"
                  src="https://image.tmdb.org/t/p/w300/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg"
                />
              </div>
            </div>

            {/* Stats and Reminder cards in a grid below */}
            <div className="mt-6 grid grid-cols-2 gap-6">
              <StatsCard added={12} watched={7} />
              <ReminderCard />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="relative z-0 mx-auto -mt-32 w-full max-w-7xl px-6 pb-20 pt-40">
        <div className="rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-sm backdrop-blur">
          <div className="grid gap-8 md:grid-cols-3">
            <Feature
              title="Plan your watches"
              description="Add a title, choose a status, jot notes, and attach cover art so your queue stays inspiring."
            />
            <Feature
              title="Stay on track with reminders"
              highlight
              description="Set a date & time on any planned item and we'll email you both ahead of time (e.g., 30–60 minutes before) and right when it starts."
            />
            <Feature
              title="Own your data"
              description="Your list is personal and private by default. No ads, no tracking pixels."
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white shadow-sm transition hover:bg-indigo-700">
              Start planning a watch
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-900 hover:bg-slate-50">
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white/70">
        <div className="mx-auto w-full max-w-7xl px-6 py-10">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Ready to actually watch what you plan?</h2>
              <p className="mt-1 text-slate-600">
                Track your queue—and get timely email nudges to hit play.
              </p>
            </div>
            <div className="flex gap-3 md:justify-end">
              <Link href="/register" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
                Get started free
              </Link>
              <Link href="/login" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                Sign in
              </Link>
            </div>
          </div>
          <p className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} WatchList</p>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Bits ---------- */

// Update PreviewRow component to handle missing images gracefully
function PreviewRow({
  title,
  meta,
  src,
}: {
  title: string;
  meta: string;
  src: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white p-2 shadow-sm">
      <div className="relative h-12 w-20 flex-shrink-0 overflow-hidden rounded">
        {src ? (
          <Image
            src={src}
            alt={`${title} cover`}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-slate-100 flex items-center justify-center">
            <span className="text-xs text-slate-400">No image</span>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-slate-900">{title}</div>
        <div className="text-xs text-slate-600">{meta}</div>
      </div>
    </div>
  );
}

function StatsCard({ added, watched }: { added: number; watched: number }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-lg">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        This month
      </p>
      <div className="mt-2 grid grid-cols-2 divide-x divide-slate-200">
        <div className="pr-4">
          <p className="text-3xl font-bold leading-none text-slate-900">{added}</p>
          <p className="mt-1 text-xs text-slate-600">items added</p>
        </div>
        <div className="pl-4">
          <p className="text-3xl font-bold leading-none text-slate-900">{watched}</p>
          <p className="mt-1 text-xs text-slate-600">watched</p>
        </div>
      </div>
    </div>
  );
}

function ReminderCard() {
  return (
    <div className="rounded-2xl border border-violet-100 bg-white p-4 shadow-lg">
      <div className="flex items-center gap-2">
        <BellIcon className="h-5 w-5 text-violet-600" />
        <p className="text-sm font-semibold text-slate-900">Reminder scheduled</p>
      </div>
      <p className="mt-2 text-xs text-slate-600">
        “Inception” • Fri at 8:00 PM<br />
        Email: 30 min before & at start
      </p>
      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-medium text-violet-700">
          Email
        </span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
          On time + ahead
        </span>
      </div>
    </div>
  );
}

function Feature({
  title,
  description,
  highlight = false,
}: { title: string; description: string; highlight?: boolean }) {
  return (
    <div
      className={[
        "rounded-2xl border p-6 shadow-sm",
        highlight ? "border-violet-200 bg-violet-50/60" : "border-slate-100 bg-slate-50/60",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        {highlight ? <BellIcon className="mt-1 h-5 w-5 text-violet-600" /> : <CheckIcon className="mt-1 h-5 w-5 text-indigo-600" />}
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

function Bullet({ title, desc, highlight = false }: { title: string; desc: string; highlight?: boolean }) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur">
      {highlight ? <BellIcon className="mt-1 h-5 w-5 text-violet-600" /> : <CheckIcon className="mt-1 h-5 w-5 text-indigo-600" />}
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{desc}</p>
      </div>
    </li>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0L3.293 9.957a1 1 0 011.414-1.414l3.043 3.043 6.543-6.543a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a6 6 0 00-6 6v2.268c0 .52-.2 1.02-.558 1.398L4.2 13.206A1 1 0 005 15h14a1 1 0 00.8-1.794l-1.242-1.54A2 2 0 0117 10.268V8a6 6 0 00-6-6zm0 20a3 3 0 01-2.995-2.824L9 19h6a3 3 0 01-2.824 3H12z" />
    </svg>
  );
}
