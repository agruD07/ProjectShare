import { useEffect, useState } from "react";
import API from "../../utils/apiClient";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../assets/styles/profile.css";

function MentorProfile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    experience: "",
    credentials: "",
    expertise: "",
    profilePic: null
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/mentor/profile");
      const u = res.data.user;

      setUser(u);

      setFormData({
        fullName: u.fullName || "",
        bio: u.bio || "",
        experience: u.experience || "",
        credentials: u.credentials || "",
        expertise: (u.expertise || []).join(", "),
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
      data.append("bio", formData.bio);
      data.append("experience", formData.experience);
      data.append("credentials", formData.credentials);
      data.append("expertise", formData.expertise);

      if (formData.profilePic) {
        data.append("profilePic", formData.profilePic);
      }

      await API.put("/mentor/profile", data);

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

              {/* EXPERIENCE */}
              <p>
                <strong>Experience:</strong>{" "}
                {editMode ? (
                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                ) : (
                  user.experience
                )}
              </p>

              {/* EXPERTISE */}
              <div>
                <strong>Areas of Expertise:</strong>

                {editMode ? (
                  <input
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    placeholder="AI, Web Dev, ML"
                  />
                ) : (
                  <div className="skills-box">
                    {(user.expertise || []).map((e, i) => (
                      <span key={i} className="skill-chip">{e}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* BIO */}
              <p>
                <strong>Bio:</strong>{" "}
                {editMode ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                ) : (
                  user.bio
                )}
              </p>

              {/* CREDENTIALS */}
              <p>
                <strong>Credentials:</strong>{" "}
                {editMode ? (
                  <textarea
                    name="credentials"
                    value={formData.credentials}
                    onChange={handleChange}
                    placeholder="Add your certifications, degrees..."
                  />
                ) : (
                  user.credentials || "No credentials added"
                )}
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

export default MentorProfile;