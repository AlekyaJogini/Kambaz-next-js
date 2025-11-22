"use client";
import * as client from "../client";
import Link from "next/link";
import { useRouter } from "next/navigation";  // ✅ CHANGE: useRouter instead of redirect
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({
    username: "",  // ✅ FIX: Empty string
    password: "",  // ✅ FIX: Empty string
  });
  const [error, setError] = useState("");  // ✅ ADD: For error messages
  const dispatch = useDispatch();
  const router = useRouter();  // ✅ ADD: For navigation
  
  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");  // ✅ CHANGE: Use router.push
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign in failed");
    }
  };
  
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <FormControl
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />
      <FormControl
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in
      </Button>
      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}