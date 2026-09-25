const MESSAGE = 'Free shipping on orders over ₹4,000  •  New arrivals every Friday  •  Made to be worn, not just bought';

export default function AnnouncementBar() {
  return (
    <div className="h-8 overflow-hidden border-b border-hairline bg-ink text-paper text-[11px] tracking-wide2">
      <div className="marquee-track flex w-max items-center h-8 whitespace-nowrap">
        <span className="px-4">{MESSAGE}</span>
        <span className="px-4">{MESSAGE}</span>
      </div>
    </div>
  );
}
