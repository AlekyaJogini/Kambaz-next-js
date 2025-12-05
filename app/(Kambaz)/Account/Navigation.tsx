"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {!currentUser && (
        <>
          <Link
            href="/Account/Signin"
            id="wd-account-signin-link"
            className={`list-group-item border-0 ${
              pathname === "/Account/Signin"
                ? "active text-black"
                : "text-danger"
            }`}
          >
            Signin
          </Link>
          <Link
            href="/Account/Signup"
            id="wd-account-signup-link"
            className={`list-group-item border-0 ${
              pathname === "/Account/Signup"
                ? "active text-black"
                : "text-danger"
            }`}
          >
            Signup
          </Link>
        </>
      )}
      
      {currentUser && (
        <>
          <Link
            href="/Account/Profile"
            id="wd-account-profile-link"
            className={`list-group-item border-0 ${
              pathname === "/Account/Profile"
                ? "active text-black"
                : "text-danger"
            }`}
          >
            Profile
          </Link>
          
          {/* ✅ ADD: Users link - only shows for ADMIN */}
          {currentUser.role === "ADMIN" && (
            <Link
              href="/Account/Users"
              id="wd-account-users-link"
              className={`list-group-item border-0 ${
                pathname === "/Account/Users"
                  ? "active text-black"
                  : "text-danger"
              }`}
            >
              Users
            </Link>
          )}
        </>
      )}
    </div>
  );
}