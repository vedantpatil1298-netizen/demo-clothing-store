export default function AccountPage() {
  return (
    <div className="pt-40 pb-24 px-6 md:px-10 max-w-md mx-auto">
      <h1 className="font-display text-3xl mb-8">Account</h1>
      <form className="flex flex-col gap-4">
        <label className="text-sm">
          Email
          <input type="email" className="mt-1 w-full border border-hairline px-4 py-2 bg-paper" />
        </label>
        <label className="text-sm">
          Password
          <input type="password" className="mt-1 w-full border border-hairline px-4 py-2 bg-paper" />
        </label>
        <button type="submit" className="bg-ink text-paper py-3 text-sm tracking-wide2 hover:bg-cobalt transition-colors">
          Sign in
        </button>
      </form>
    </div>
  );
}
