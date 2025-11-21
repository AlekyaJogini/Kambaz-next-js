"use client";
import * as client from "../client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl } from "react-bootstrap";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [profile, setProfile] = useState<any>({});

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  // ✅ Load user or redirect to Signin
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser, router]);

  // ✅ Handle sign out
  const signout = async () => {
    await client.signout();  // ✅ FIX: Added () parentheses
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: "400px" }}>
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            value={profile.username || ""}  // ✅ CHANGE: value instead of defaultValue
            placeholder="username"
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            type="password"
            value={profile.password || ""}  // ✅ CHANGE: value instead of defaultValue
            placeholder="password"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            value={profile.firstName || ""}  // ✅ CHANGE: value instead of defaultValue
            placeholder="First Name"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            value={profile.lastName || ""}  // ✅ CHANGE: value instead of defaultValue
            placeholder="Last Name"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            value={profile.dob || ""}  // ✅ CHANGE: value instead of defaultValue
            onChange={(e) =>
              setProfile({ ...profile, dob: e.target.value })
            }
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            type="email"
            value={profile.email || ""}  // ✅ CHANGE: value instead of defaultValue
            placeholder="Email"
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />
          <select
            id="wd-role"
            className="form-select mb-3"
            value={profile.role || "USER"}  // ✅ CHANGE: value instead of defaultValue
            onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })
            }
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
            <option value="TA">TA</option>  {/* ✅ ADD: TA option */}
          </select>
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
            Update
          </button>
          <Button
            id="wd-signout-btn"
            className="btn btn-danger w-100"
            onClick={signout}
          >
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}