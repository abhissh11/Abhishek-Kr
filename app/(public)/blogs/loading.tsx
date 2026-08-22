export default function BlogsLoading() {
  return (
    <main className="w-full min-h-screen bg-zinc-900 text-neutral-100 pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="w-[calc(100%-2rem)] max-w-5xl mx-auto">

        {/* Real heading — shown immediately */}
        <div className="space-y-4 mb-10 border-b border-zinc-800 pb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            Sharing <span className="text-neutral-500">Technical thoughts </span> &amp;{" "}
            <span>Experiences.</span>
          </h1>

          {/* Category Pills Skeleton */}
          <div className="flex items-center gap-2 flex-wrap pt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-8 rounded-xl bg-zinc-800 animate-pulse"
                style={{ width: `${60 + i * 12}px` }}
              />
            ))}
          </div>
        </div>

        {/* Blog List Skeleton — mirrors article layout */}
        <div className="w-full space-y-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border-b border-zinc-800 py-8 first:pt-0"
            >
              <div className="flex items-start justify-between gap-6 w-full">
                <div className="space-y-3 flex-1">
                  {/* Category badge */}
                  <div className="h-3.5 w-20 bg-zinc-800 rounded animate-pulse" />
                  {/* Title */}
                  <div className="h-7 w-4/5 bg-zinc-800 rounded-lg animate-pulse" />
                  {/* Excerpt line 1 */}
                  <div className="h-4 w-full bg-zinc-800/70 rounded animate-pulse" />
                  {/* Excerpt line 2 */}
                  <div className="h-4 w-3/4 bg-zinc-800/70 rounded animate-pulse" />
                  {/* Meta: read time + date */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="h-3 w-14 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-3 w-1 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse" />
                  </div>
                </div>
                {/* Arrow icon placeholder */}
                <div className="shrink-0 pt-1">
                  <div className="w-6 h-6 rounded bg-zinc-800 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
