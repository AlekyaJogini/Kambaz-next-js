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

  // ✅ Load user or redirect to Signin
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser, router]);

  // ✅ Handle sign out
  const signout = () => {
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  const updateProfile = async () => {
  const updatedProfile = await client.updateUser(profile);
  dispatch(setCurrentUser(updatedProfile));
};

  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: "400px" }}>
      <h3>Profile</h3>

      {profile && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            defaultValue={profile.username}
            placeholder="username"
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            type="password"
            defaultValue={profile.password}
            placeholder="password"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            defaultValue={profile.firstName}
            placeholder="First Name"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            defaultValue={profile.lastName}
            placeholder="Last Name"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            defaultValue={profile.dob}
            onChange={(e) =>
              setProfile({ ...profile, dob: e.target.value })
            }
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            type="email"
            defaultValue={profile.email}
            placeholder="Email"
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />

          <select
            id="wd-role"
            className="form-select mb-3"
            defaultValue={profile.role}
            onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })
            }
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          <Button
  id="wd-update-btn"
  className="btn btn-primary w-100 mb-2"
  onClick={updateProfile}
>
  Update
</Button>


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
