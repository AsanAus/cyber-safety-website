"use client";

import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const navigation = [
  { name: " Laman Utama", href: "/" },
  { name: "Kenali Kami", href: "/#kenalikami" },
  { name: "Maklumat", href: "/discovery" },
  { name: "Zon Pelajar", href: "/discovery#zonpelajar" },
  { name: "Sudut Penjaga", href: "/discovery#sudutpenjaga" },
  { name: "Survey", href: "/survey" },

];



export default function Navbar() {
  const pathname = usePathname();
  return (
    <Disclosure
      as="nav"
      className="bg-white/90 backdrop-blur-md text-black sticky top-0 z-50 overflow-hidden"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-8">
            <div className="flex h-16 items-center justify-between">

              {/* LEFT: Logo */}
              <div className="flex items-center gap-3 font-semibold">
                <img src="/logo.png" alt="Logo" width={30} height={30} />
                <span className="text-base leading-none">Bijak Digital</span>
              </div>

               {/* DESKTOP MENU */}
              <div className="hidden md:flex gap-6 text-sm font-medium">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`hover:text-green-700 ${
                        isActive
                          ? "text-green-700 font-semibold underline"
                          : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* RIGHT: BUTTON */}
              <div className="hidden md:block">
                <Link href="/quiz">
                  <button className="bg-orange-400 text-black px-4 py-2 rounded-2xl font-semibold hover:bg-orange-600">
                    Mula Cabaran!
                  </button>
                </Link>
              </div>

              {/* MOBILE BUTTON */}
              <div className="md:hidden">
                <DisclosureButton className="p-2 text-gray-700">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* MOBILE MENU */}
          <DisclosurePanel className="md:hidden px-6 pb-4">
            <div className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium hover:text-green-700"
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Button */}
              <Link href="/cabaran">
                <button className="mt-2 bg-orange-500 text-black px-4 py-2 rounded-full font-semibold">
                  Mula Cabaran!
                </button>
              </Link>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}