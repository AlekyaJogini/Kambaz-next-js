import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-3" style={{ maxWidth: "400px" }}>
      <h3>Sign up</h3>

      <input
        defaultValue="alekyajogini"
        placeholder="username"
        className="form-control mb-2"
        id="wd-username"
      />
      <input
        defaultValue="12345678"
        placeholder="password"
        type="password"
        className="form-control mb-2"
        id="wd-password"
      />
      <input
        placeholder="verify password"
        type="password"
        className="form-control mb-2"
        id="wd-password-verify"
      />

      <Link
        href="Profile"
        className="btn btn-primary w-100 mb-2"
        id="wd-signup-btn"
      >
        Sign up
      </Link>

      <div>
        <Link href="Signin" id="wd-signin-link">
          Sign in
        </Link>
      </div>
    </div>
  );
}
