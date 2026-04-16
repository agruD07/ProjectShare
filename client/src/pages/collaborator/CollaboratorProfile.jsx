import { useEffect, useState } from "react";
import API from "../../utils/apiClient";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../assets/styles/profile.css";

function CollaboratorProfile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    skills: "",
    bio: "",
    phone: "",
    portfolio: "",
    profilePic: null
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/creator/profile"); // 🔥 SAME API works (authVerify)

      const u = res.data.user;

      setUser(u);

      setFormData({
        fullName: u.fullName || "",
        skills: Array.isArray(u.skills)
            ? u.skills.join(", ")
            : JSON.parse(u.skills || "[]").join(", "),
        bio: u.bio || "",
        phone: u.phone || "",
        portfolio: (u.portfolio || []).join(", "),
        profilePic: null
      });

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();

      data.append("fullName", formData.fullName);
      data.append("skills", formData.skills);
      data.append("bio", formData.bio);
      data.append("phone", formData.phone);
      data.append("portfolio", formData.portfolio);

      if (formData.profilePic) {
        data.append("profilePic", formData.profilePic);
      }

      await API.put("/collaborator/profile", data);

      alert("✅ Updated");
      setEditMode(false);
      fetchProfile();

    } catch (err) {
      console.error(err);
      alert("❌ Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <Sidebar />

        <div className="profile-content">
          <div className="profile-card">

            {/* LEFT */}
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

            {/* RIGHT */}
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
                <strong>Phone:</strong>{" "}
                {editMode ? (
                  <input name="phone" value={formData.phone} onChange={handleChange} />
                ) : (
                  user.phone
                )}
              </p>

              {/* 🔥 SKILLS BOX */}
              <div>
                <strong>Skills:</strong>
                {editMode ? (
                  <input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Node, UI"
                  />
                ) : (
                  <div className="skills-box">
                    {(Array.isArray(user.skills)
                        ? user.skills
                        : JSON.parse(user.skills || "[]")
                    ).map((s, i) => (
                        <span key={i} className="skill-chip">{s}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* BIO */}
              <p>
                <strong>Bio:</strong>{" "}
                {editMode ? (
                  <textarea name="bio" value={formData.bio} onChange={handleChange} />
                ) : (
                  user.bio
                )}
              </p>

              {/* PORTFOLIO */}
              <div>
                <strong>Portfolio:</strong>

                {editMode ? (
                <input
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://github.com, https://site.com"
                />
                ) : (
                <div className="portfolio-links">
                    {(Array.isArray(user.portfolio)
                        ? user.portfolio
                        : JSON.parse(user.portfolio || "[]")
                    ).map((link, i) => (
                        <a
                            key={i}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="portfolio-link"
                        >
                            {link}
                        </a>
                    ))}
                </div>
                )}
              </div>

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
                <button onClick={() => setEditMode(true)}>Edit Profile</button>
              )}

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CollaboratorProfile;