import Link from "next/link";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-3" style={{ maxWidth: "400px" }}>
      <h1>Sign in</h1>

      <input
        placeholder="username"
        className="form-control mb-2"
        id="wd-username"
      />
      <input
        placeholder="password"
        type="password"
        className="form-control mb-2"
        id="wd-password"
      />

      <Link
        id="wd-signin-btn"
        href="/Dashboard"
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </Link>

      <div>
        <Link id="wd-signup-link" href="Signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
