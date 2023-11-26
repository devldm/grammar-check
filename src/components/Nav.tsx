import Link from "next/link";
import { usePathname } from "next/navigation";

type link = {
  linkText: string;
  href: string;
};

const baseLinks: link[] = [{ linkText: "Home", href: "/" }];

const signedInLinks: link[] = [
  ...baseLinks,
  { linkText: "Profile", href: "/profile" },
];

export default function Nav({ isSignedIn }: { isSignedIn: boolean }) {
  const pathname = usePathname();
  const links = isSignedIn ? signedInLinks : baseLinks;
  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            GrammarCheck
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          id="hamburger-button"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => {
            document.querySelector("#menu")?.classList.toggle("hidden");
          }}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="menu">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            {links.map((link) => (
              <li key={link.href} className="flex">
                <Link
                  href={link.href}
                  passHref
                  className={
                    pathname === link.href
                      ? " text-blue-500"
                      : "text-gray-900 dark:text-gray-100"
                  }
                >
                  {link.linkText}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
