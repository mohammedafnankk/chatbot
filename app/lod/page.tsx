export default function Lod() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <span
        className="loader relative block h-[164px] w-[164px] rounded-full animate-spin-custom"
        aria-label="Loading"
        role="status"
      />
    </div>
  );
}
