export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="animate-shimmer-bar text-[12px] sm:text-[13px] font-semibold tracking-wide text-black py-2 px-4 text-center"
        style={{
          background:
            "linear-gradient(90deg, #D4AF37 0%, #F3CF5D 25%, #D4AF37 50%, #F3CF5D 75%, #D4AF37 100%)",
        }}
      >
        <span className="inline-block">
          ⚡ מתחילים בטירוף! 5 הרוכשים הראשונים מקבלים חולצה ב-
          <span className="font-black mx-1">₪70</span>
          בלבד! ⚡
        </span>
      </div>
    </div>
  );
}