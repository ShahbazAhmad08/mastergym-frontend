import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

const API_URL = "http://localhost:5000/api";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  // const [search, setSearch] = useState("");
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    totalTrainers: 0,
    monthlyRevenue: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("member");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setPageLoading(true);
      const [membersRes, trainersRes] = await Promise.all([
        fetch(`${API_URL}/members`),
        fetch(`${API_URL}/trainers`),
      ]);
      const membersData = await membersRes.json();
      const trainersData = await trainersRes.json();
      const membersList = membersData.members || [];
      const trainersList = trainersData.trainers || [];
      setMembers(membersList);
      setTrainers(trainersList);
      const priceMap = { Basic: 29, Premium: 59, Elite: 99 };
      const revenue = membersList.reduce(
        (sum, m) => sum + (priceMap[m.membershipPlan] || 0),
        0,
      );
      setStats({
        totalMembers: membersList.length,
        activeMembers: membersList.filter((m) => m.status === "Active").length,
        totalTrainers: trainersList.length,
        monthlyRevenue: revenue,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    setFormData({});
  };
  const closeModal = () => {
    setShowModal(false);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = modalType === "member" ? "/members" : "/trainers";
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      closeModal();
      fetchData();
      alert("Added successfully!");
    } catch (error) {
      alert("Failed to add", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const endpoint = type === "member" ? "/members" : "/trainers";
      const res = await fetch(`${API_URL}${endpoint}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed");
      fetchData();
    } catch (error) {
      alert("Delete failed", error.message);
    }
  };
  console.log("Members:", members);
  const handleReminder = (member) => {
    const phone = member.phone; // user number with country code
    const message = `Dear ${member.name}, your membership is expiring in 3 days. Please take subscription to continue the service.`;

    const whatsappURL = `https://wa.me/91${phone}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappURL, "_blank");
  };

  // const filteredMembers = members.filter((m) =>
  //   m.name?.toLowerCase().includes(search.toLowerCase()),
  // );
  // const filteredTrainers = trainers.filter((t) =>
  //   t.name?.toLowerCase().includes(search.toLowerCase()),
  // );

  const displayStats = [
    { label: "Total Members", value: stats.totalMembers, icon: "👥" },
    { label: "Active Members", value: stats.activeMembers, icon: "💪" },
    { label: "Monthly Revenue", value: `$${stats.monthlyRevenue}`, icon: "💰" },
    { label: "Trainers", value: stats.totalTrainers, icon: "👨‍🏫" },
  ];

  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>MASTER GYM</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === "members" ? "active" : ""}`}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
          {/* <button
            className={`nav-item ${activeTab === "trainers" ? "active" : ""}`}
            onClick={() => setActiveTab("trainers")}
          >
            Trainers
          </button> */}
        </nav>
        {/* <Link to="/" className="admin-back">
          ← Back to Website
        </Link> */}
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          {/* <input
            className="admin-search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
        </header>

        {pageLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="admin-content">
            {activeTab === "dashboard" && (
              <>
                <div className="stats-grid">
                  {displayStats.map((item, i) => (
                    <div className="stat-card" key={i}>
                      <span>{item.icon}</span>
                      <h3>{item.label}</h3>
                      <p>{item.value}</p>
                    </div>
                  ))}
                </div>
                <section className="admin-card">
                  <h2>Recent Members</h2>
                  {members.slice(0, 5).map((member) => (
                    <div key={member._id} className="member-item">
                      <strong>{member.name}</strong>
                      <span>{member.membershipPlan}</span>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === "members" && (
              <section className="admin-card">
                <div className="section-head">
                  <h2>Members</h2>
                  <button
                    className="action-btn"
                    onClick={() => openModal("member")}
                  >
                    + Add Member
                  </button>
                </div>

                {members.map((member) => {
                  const expiryDate = new Date(member.expiryDate);
                  console.log("Expiry Date:", expiryDate);
                  const today = new Date();

                  const diffTime = expiryDate - today;
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  const showRemindBtn = diffDays <= 3 && diffDays >= 0;

                  return (
                    <div
                      key={member._id}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
                    >
                      {/* Left Content */}
                      <div className="space-y-2">
                        <div className=" w-[30vw] flex  justify-between">
                          <h2 className="text-xl font-bold text-gray-800">
                            {member.name}
                          </h2>
                          <span
                            className={`text-sm font-medium  ${
                              expiryDate > today
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {expiryDate > today ? "Active" : "Expired"}
                          </span>
                        </div>

                        <p className="text-gray-600">
                          <span className="font-semibold text-gray-700">
                            Plan:
                          </span>{" "}
                          {member.membershipPlan}
                        </p>

                        <p className="text-gray-600">
                          <span className="font-semibold text-gray-700">
                            Email:
                          </span>{" "}
                          {member.email}
                        </p>

                        <p className="text-gray-600">
                          <span className="font-semibold text-gray-700">
                            Join Date:
                          </span>{" "}
                          {new Date(member.joinDate).toLocaleDateString()}
                        </p>

                        <p
                          className={`font-medium ${
                            diffDays <= 3 ? "text-red-500" : "text-green-600"
                          }`}
                        >
                          Expiry:{" "}
                          {new Date(member.expiryDate).toLocaleDateString()}
                          {diffDays <= 3 && diffDays >= 0 && (
                            <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
                              Expiring Soon
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Right Actions */}
                      <div className="flex flex-wrap gap-3">
                        {showRemindBtn && (
                          <button
                            className="px-4 py-2 rounded-xl bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition"
                            onClick={() => handleReminder(member)}
                          >
                            🔔 Remind
                          </button>
                        )}

                        <button
                          className="px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                          onClick={() => {}}
                        >
                          ♻ Renew
                        </button>

                        <button
                          className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                          onClick={() => handleDelete(member._id, "member")}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </section>
            )}

            {/* {activeTab === "trainers" && (
              <section className="admin-card">
                <div className="section-head">
                  <h2>Trainers</h2>
                  <button
                    className="action-btn"
                    onClick={() => openModal("trainer")}
                  >
                    + Add Trainer
                  </button>
                </div>
                {trainers.map((trainer) => (
                  <div key={trainer._id} className="member-item">
                    <div>
                      <strong>{trainer.name}</strong>
                      <p>{trainer.specialty}</p>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(trainer._id, "trainer")}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </section>
            )} */}
          </div>
        )}
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add {modalType}</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                required
                placeholder="Name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                required
                placeholder="Email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                required
                placeholder="Phone"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              {modalType === "member" ? (
                <select
                  required
                  value={formData.membershipPlan || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, membershipPlan: e.target.value })
                  }
                >
                  <option value="">Select Plan</option>
                  <option>Basic</option>
                  <option>Premium</option>
                  <option>Elite</option>
                </select>
              ) : (
                <>
                  <input
                    required
                    placeholder="Specialty"
                    value={formData.specialty || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, specialty: e.target.value })
                    }
                  />
                  <input
                    required
                    placeholder="Experience"
                    value={formData.experience || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  />
                  <textarea
                    required
                    placeholder="Bio"
                    value={formData.bio || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                </>
              )}
              <div className="modal-actions">
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
