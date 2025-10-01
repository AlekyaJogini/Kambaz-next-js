"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        href="/Account/Signin"
        id="wd-account-signin-link"
        className={`list-group-item border-0 ${
          pathname === "/Account/Signin" ? "active text-black" : "text-danger"
        }`}
      >
        Signin
      </Link>
      <Link
        href="/Account/Signup"
        id="wd-account-signup-link"
        className={`list-group-item border-0 ${
          pathname === "/Account/Signup" ? "active text-black" : "text-danger"
        }`}
      >
        Signup
      </Link>
      <Link
        href="/Account/Profile"
        id="wd-account-profile-link"
        className={`list-group-item border-0 ${
          pathname === "/Account/Profile" ? "active text-black" : "text-danger"
        }`}
      >
        Profile
      </Link>
    </div>
  );
}
