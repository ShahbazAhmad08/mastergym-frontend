import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import AddMemberForm from "../components/AddMemberForm";

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://localhost:5000";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [members, setMembers] = useState([]);
  // const [trainers, setTrainers] = useState([]);
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [renewMember, setRenewMember] = useState(null);
  const [renewDate, setRenewDate] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberLoading, setMemberLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setPageLoading(true);
      const [membersRes] = await Promise.all([
        fetch(`${API_URL}/api/members`),
        // fetch(`${API_URL}/trainers`),
      ]);
      const membersData = await membersRes.json();
      // const trainersData = await trainersRes.json();
      const membersList = membersData.members || [];
      // const trainersList = trainersData.trainers || [];
      setMembers(membersList);
      // setTrainers(trainersList);
      const priceMap = { Basic: 29, Premium: 59, Elite: 99 };
      const revenue = membersList.reduce(
        (sum, m) => sum + (priceMap[m.membershipPlan] || 0),
        0,
      );
      setStats({
        totalMembers: membersList.length,
        activeMembers: membersList.filter((m) => m.status === "Active").length,
        // totalTrainers: trainersList.length,
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
  // console.log("Members:", members);
  const handleReminder = (member) => {
    const phone = member.phone; // user number with country code
    const message = `Dear ${member.name}, your membership is expiring in 3 days. Please take subscription to continue the service.`;

    const whatsappURL = `https://wa.me/91${phone}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappURL, "_blank");
  };

  const handleRenew = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API_URL}/api/members/${renewMember._id}/renew`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: renewDate,
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        alert("Membership Renewed!");
        setRenewMember(null);
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMemberDetails = async (id) => {
    try {
      setMemberLoading(true);

      const res = await fetch(`${API_URL}/api/members/${id}`);
      const data = await res.json();

      if (data.success) {
        setSelectedMember(data.member);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMemberLoading(false);
    }
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
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-logo">
          <h2>MASTER GYM</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("dashboard");
              setSidebarOpen(false);
            }}
          >
            Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === "members" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("members");
              setSidebarOpen(false);
            }}
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
        <Link to="/" className="admin-back">
          ← Back to Website
        </Link>
      </aside>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          {/* <input
            className="admin-search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
            {sidebarOpen ? "✕" : "☰"}
          </button>
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
                  // console.log("Expiry Date:", expiryDate);
                  const today = new Date();

                  const diffTime = expiryDate - today;
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  const showRemindBtn = diffDays <= 3 && diffDays >= 0;

                  return (
                    <div
                      key={member._id}
                      onClick={() => fetchMemberDetails(member._id)}
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
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReminder(member);
                            }}
                          >
                            🔔 Remind
                          </button>
                        )}

                        <button
                          className="px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRenewMember(member);
                            setRenewDate(
                              new Date().toISOString().split("T")[0],
                            );
                          }}
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
        <AddMemberForm
          modalType={modalType}
          formData={formData}
          setFormData={setFormData}
          loading={loading}
          setLoading={setLoading}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
        />
      )}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl details-modal "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 ">
              <h2 className="text-xl font-bold text-gray-800  ">
                Member Details
              </h2>

              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-500 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>

            {memberLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-3 text-gray-700">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold">{selectedMember.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        selectedMember.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedMember.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{selectedMember.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{selectedMember.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Plan</p>
                    <p>{selectedMember.membershipPlan}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Trainer</p>
                    <p>Rehan Shahid</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p>
                      {new Date(selectedMember.joinDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Expiry Date</p>
                    <p>
                      {new Date(selectedMember.expiryDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* <div>
                    <p className="text-sm text-gray-500">Payments</p>
                    <p>{selectedMember.payments?.length || 0}</p>
                  </div> */}
                </div>

                <div className="pt-5 flex justify-end">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {renewMember && (
        <div className="modal-overlay" onClick={() => setRenewMember(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Renew Membership</h2>

            <form onSubmit={handleRenew} className="modal-form">
              <input value={renewMember.name} disabled />
              <input value={renewMember.email} disabled />
              <input value={renewMember.phone} disabled />
              <input value={renewMember.membershipPlan} disabled />

              <label>New Start Date</label>
              <input
                type="date"
                value={renewDate}
                onChange={(e) => setRenewDate(e.target.value)}
                required
              />

              <div className="modal-actions">
                <button type="button" onClick={() => setRenewMember(null)}>
                  Cancel
                </button>

                <button type="submit">Renew Now</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
