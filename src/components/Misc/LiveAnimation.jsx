import "../../styles/LiveAnimation.css";

function LiveAnimation() {
  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="relative w-3.5 h-3.5">
        <div className="circle w-full h-full"></div>
      </div>
      <p className="text-gray-500">Live Now</p>
    </div>
  );
}

export default LiveAnimation;
