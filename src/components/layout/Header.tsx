import Link from "next/link";
import CartCount from "./CartCount";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPaperPlane,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export default function Header() {
  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-5 relative">
        <div className="flex gap-5">
          <Link href="/" className="flex text-large font-bold">
            <FontAwesomeIcon icon={faHouse} className="h-5 w-5 mr-2" />
            Home
          </Link>

          <Link href="/contact" className="flex text-large font-bold">
            <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5 mr-2" />
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/"></Link>
          <Link href="/cart">
            <FontAwesomeIcon icon={faBasketShopping} className="h-7 w-7" />
            <CartCount />
          </Link>
        </div>
      </nav>
    </header>
  );
}
