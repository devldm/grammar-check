import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerButton from "./HamburgerButton";
import { useSession } from "next-auth/react";

type link = {
  linkText: string;
  href: string;
};

const baseLinks: link[] = [{ linkText: "Home", href: "/" }];



export default function Nav({ isSignedIn }: { isSignedIn: boolean }) {
  const pathname = usePathname();
  const { data: sessionData } = useSession();

  const signedInLinks: link[] = [
    ...baseLinks,
    { linkText: "Profile", href: `/profile/${sessionData?.user.name}` },
  ];
  const links = isSignedIn ? signedInLinks : baseLinks;

  
  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            GrammarCheck
          </span>
        </Link>
        <HamburgerButton />
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
