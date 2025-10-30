"use client";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function AccountPage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (!currentUser) {
    // No user → redirect to Signin
    redirect("/Account/Signin");
  } else {
    // User signed in → redirect to Profile
    redirect("/Account/Profile");
  }

  return null;
}
