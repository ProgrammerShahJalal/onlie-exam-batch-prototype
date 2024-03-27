import logo from "../../assets/images/logo-web.png";

function Footer() {
  return (
    <footer className="bg-[#532355] py-24">
      <div className="flex justify-center mb-4">
        <div className="flex justify-center bg-white w-fit rounded-lg">
          <img src={logo} className="h-32 w-44" alt="logo" />
        </div>
      </div>
      <div>
        <p className="text-white text-center">
          Copyright &copy; 2024 | All rights reserved | Shrariful&apos;care
        </p>
      </div>
    </footer>
  );
}

export default Footer;
