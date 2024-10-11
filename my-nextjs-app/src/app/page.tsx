import Image from "next/image";
import UrlShortener from "./components/Input";

export default function Home() {
  return (
    <div>
      {" "}
      <h1>Welcome to the URL Shortener App</h1>
      <UrlShortener />
    </div>
  );
}
