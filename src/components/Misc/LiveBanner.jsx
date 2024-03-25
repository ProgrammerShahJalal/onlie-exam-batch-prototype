import LiveAnimation from "./LiveAnimation";

function LiveBanner() {
  return (
    <div className="flex items-center justify-between">
      <p>Live Exam</p>
      <LiveAnimation />
    </div>
  );
}

export default LiveBanner;
