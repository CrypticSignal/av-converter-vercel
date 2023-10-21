import Image from "next/image";
import gitHubLogo from "../images/GitHub-Mark-Light-32px.png";
import Link from "next/link";

const Navbar = () => {
  const setClassName = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    let linksDiv = document.getElementById("links")!;
    if (linksDiv.className === "top") {
      linksDiv.className += " mobile";
    } else {
      linksDiv.className = "top";
    }
  };

  return (
    <div id="links" className="top">
      <Link href="/" className="hamburger" onClick={setClassName}>
        <i className="fa fa-bars"></i>
      </Link>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/filetypes">Filetypes</Link>
      <Link href="/yt">YT downloader</Link>
      <Link
        href="/game"
        onClick={() => {
          window.location.href = "game";
        }}
      >
        Game
      </Link>
      <Link href="https://github.com/CrypticSignal/av-converter" id="github_link">
        <Image src={gitHubLogo} alt="github logo" />
      </Link>
    </div>
  );
};

export default Navbar;
