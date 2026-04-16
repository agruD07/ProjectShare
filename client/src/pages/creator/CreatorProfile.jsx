import { useEffect, useState } from "react";
import API from "../../utils/apiClient";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../assets/styles/profile.css";

function CreatorProfile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    skills: "",
    bio: "",
    profilePic: null
  });

  // Fetch profile
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/creator/profile");

      setUser(res.data.user);

      setFormData({
        fullName: res.data.user.fullName || "",
        skills: res.data.user.skills || "",
        bio: res.data.user.bio || "",
        profilePic: null
      });

    } catch (err) {
      console.error(err);
    }
  };

  //  Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  //  Save profile
  const handleUpdate = async () => {
    try {
      const data = new FormData();

      data.append("fullName", formData.fullName);
      data.append("skills", formData.skills);
      data.append("bio", formData.bio);

      if (formData.profilePic) {
        data.append("profilePic", formData.profilePic);
      }

      await API.put("/creator/profile", data);

      alert("✅ Profile updated");

      setEditMode(false);
      fetchProfile();

    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <Sidebar />

        <div className="profile-content">

          <div className="profile-card">

            {/* LEFT IMAGE */}
            <div className="profile-left">
              <img
                src={
                  user.profilePic
                    ? `http://localhost:8080/uploads/${user.profilePic}`
                    : "https://via.placeholder.com/150"
                }
                alt="profile"
              />

              {editMode && (
                <input type="file" name="profilePic" onChange={handleChange} />
              )}
            </div>

            {/* RIGHT DETAILS */}
            <div className="profile-right">

              {editMode ? (
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              ) : (
                <h2>{user.fullName}</h2>
              )}

              <p><strong>Email:</strong> {user.email}</p>

              <p>
                <strong>Skills:</strong>{" "}
                {editMode ? (
                  <input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                ) : (
                  user.skills || "Not added"
                )}
              </p>

              <p>
                <strong>Bio:</strong>{" "}
                {editMode ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                ) : (
                  user.bio || "No bio"
                )}
              </p>

              <p>
                <strong>Last Login:</strong>{" "}
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "N/A"}
              </p>

              {/* BUTTONS */}
              {editMode ? (
                <>
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              )}

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default CreatorProfile;