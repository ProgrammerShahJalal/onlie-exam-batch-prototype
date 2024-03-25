import { Link } from "react-router-dom";

function CTALinkButton({ link, classes, children }) {
  return (
    <div className="flex items-center justify-center">
      <Link
        to={link}
        className={`${classes}  rounded-full bg-[#2C2A75] hover:bg-[#3630d0] hover:text-white text-white text-base font-medium px-10 py-2 w-fit flex items-center justify-center`}
      >
        {children}
      </Link>
    </div>
  );
}

export default CTALinkButton;
