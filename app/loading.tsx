export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        {/* Pulsing OXONN logo placeholder */}
        <div className="h-8 w-32 animate-pulse rounded bg-[#1F1F1F]" />
        {/* Subtitle placeholder */}
        <div className="h-3 w-48 animate-pulse rounded bg-[#111111]" />
      </div>
    </div>
  );
}
