import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import AddMemberForm from "../components/AddMemberForm";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = "http://localhost:5000";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [members, setMembers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  // const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");
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
  const [reNewPlan, setRenewPlan] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

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
      // console.log("Fetched Members:", membersList);
      setMembers(membersList);
      // setTrainers(trainersList);
      const priceMap = { Basic: 700, Premium: 1500, Elite: 2500 };
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
    // console.log("Submitting:", formData);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      closeModal();
      fetchData();
      Swal.fire({
        icon: "success",
        title: "Member Added Successfully!",
        html: `
    <b>Name:</b> ${formData.name}<br/>
    <b>Plan:</b> ${formData.membershipPlan}<br/>
    <b>Start Date:</b> ${new Date(formData.startDate).toLocaleDateString()}
    
  `,
        confirmButtonColor: "#2563eb",
      });
    } catch (error) {
      Swal.fire("Error", "Failed to add member", "error");
    } finally {
      setLoading(false);
    }
  };
  console.log("Stats:", formData);
  const handleDelete = async (id, name) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Delete ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/api/members/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed");

      fetchData();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `${name} has been removed successfully.`,
        confirmButtonColor: "#2563eb",
      });
    } catch (error) {
      Swal.fire("Error", "Delete failed", "error");
    }
  };
  // console.log("Members:", members);
  const handleReminder = (member) => {
    const phone = member.phone;
    const today = new Date();
    const expiryDate = new Date(member.expiryDate);

    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let message = "";

    if (diffDays > 0) {
      message = `Dear ${member.name}, your membership will expire in ${diffDays} day${diffDays > 1 ? "s" : ""}. Please renew your subscription to continue our services.`;
    } else if (diffDays === 0) {
      message = `Dear ${member.name}, your membership expires today. Please renew now to continue our services.`;
    } else {
      message = `Dear ${member.name}, your membership has expired on ${expiryDate.toLocaleDateString()}. Please renew your subscription to continue our services.`;
    }

    const whatsappURL = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
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
            membershipPlan: reNewPlan,
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Membership Renewed!",
          html: `
    <b>Name:</b> ${renewMember.name}<br/>
    <b>Plan:</b> ${reNewPlan}<br/>
    <b>Start Date:</b> ${new Date(renewDate).toLocaleDateString()}
  `,
          confirmButtonColor: "#2563eb",
        });
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
  const today = new Date();

  const filteredMembers = members.filter((member) => {
    const term = search.toLowerCase();

    const matchesSearch =
      member.name?.toLowerCase().includes(term) ||
      member.email?.toLowerCase().includes(term) ||
      member.phone?.toString().includes(term);

    const expiryDate = new Date(member.expiryDate);
    const isActive = expiryDate > today;

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
          ? isActive
          : !isActive;

    return matchesSearch && matchesStatus;
  });

  const membersPerPage = 5;
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;

  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  const displayStats = [
    { label: "Total Members", value: stats.totalMembers, icon: "👥" },
    { label: "Active Members", value: stats.activeMembers, icon: "💪" },
    {
      label: "Monthly Revenue",
      value: stats.monthlyRevenue ? `₹${stats.monthlyRevenue}` : "₹0",
      icon: "💰",
    },
    {
      label: "Trainers",
      value: stats.totalTrainers ? stats.totalTrainers : 1,
      icon: "👨‍🏫",
    },
  ];

  const InfoBox = ({ label, value }) => (
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-800 break-words">{value}</p>
    </div>
  );

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
              setSearch("");
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
          {activeTab === "members" && (
            <input
              className="w-full max-w-xs px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </header>

        {pageLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">
              Loading Dashboard...
            </p>
          </div>
        ) : (
          <div className="admin-content">
            {activeTab === "dashboard" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {displayStats.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl shadow-md p-5 border border-gray-200"
                    >
                      <span className="text-2xl">{item.icon}</span>

                      <h3 className="text-sm text-gray-500 mt-2">
                        {item.label}
                      </h3>

                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {item.value}
                      </p>
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
                <p className="text-sm text-gray-500 mb-3">
                  Showing {paginatedMembers.length} of {filteredMembers.length}{" "}
                  members
                </p>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 cursor-pointer">
                  <h2>Members</h2>
                  <button
                    className="action-btn pt-3"
                    onClick={() => openModal("member")}
                  >
                    + Add Member
                  </button>
                  <div className="flex flex-wrap gap-3 mb-5">
                    <button
                      onClick={() => setStatusFilter("all")}
                      className={`px-4 py-2 rounded-lg ${
                        statusFilter === "all"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      All
                    </button>

                    <button
                      onClick={() => setStatusFilter("active")}
                      className={`px-4 py-2 rounded-lg ${
                        statusFilter === "active"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Active
                    </button>

                    <button
                      onClick={() => setStatusFilter("expired")}
                      className={`px-4 py-2 rounded-lg ${
                        statusFilter === "expired"
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Expired
                    </button>
                  </div>
                </div>

                {paginatedMembers.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No members found.
                  </p>
                ) : (
                  paginatedMembers.map((member) => {
                    const expiryDate = new Date(member.expiryDate);
                    // console.log("Expiry Date:", expiryDate);

                    const diffTime = expiryDate - today;
                    const diffDays = Math.ceil(
                      diffTime / (1000 * 60 * 60 * 24),
                    );

                    const showRemindBtn = diffDays <= 3;

                    return (
                      <div
                        key={member._id}
                        onClick={() => fetchMemberDetails(member._id)}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-5 cursor-pointer"
                      >
                        {/* Left Content */}
                        <div className="space-y-2">
                          <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h2 className="text-xl font-bold text-gray-800 break-words">
                              {member.name}
                            </h2>

                            <span
                              className={`text-sm font-medium ${
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
                            {new Date(member.startDate).toLocaleDateString()}
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
                              setRenewPlan(member.membershipPlan); // ✅ IMPORTANT FIX
                            }}
                          >
                            ♻ Renew
                          </button>

                          <button
                            className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(member._id, member.name);
                            }}
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
                {totalPages > 1 && (
                  <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-2 rounded-lg ${
                          currentPage === i + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
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
          className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn mx-auto  "
          >
            {/* Header */}
            <div className="px-5 py-4 border-b bg-gray-900 text-white flex items-center justify-between details-modal">
              <div>
                <p className="text-lg sm:text-4xl font-semibold text-amber-50">
                  Member Details
                </p>
                <p className="text-xs text-gray-300">Profile Information</p>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="text-xl hover:opacity-70 transition"
              >
                ✕
              </button>
            </div>

            {/* Loading */}
            {memberLoading ? (
              <div className="p-8 flex flex-col items-center ">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                <p className="mt-3 text-gray-500 text-sm">Loading...</p>
              </div>
            ) : (
              <div className="p-5 max-h-[80vh] overflow-y-auto details-modal ">
                {/* Name + Status */}
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-gray-800 break-words">
                    {selectedMember.name}
                  </h3>

                  <div className="mt-2">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                        selectedMember.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedMember.status}
                    </span>
                  </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InfoBox label="Email" value={selectedMember.email} />
                  <InfoBox label="Phone" value={selectedMember.phone} />
                  <InfoBox label="Plan" value={selectedMember.membershipPlan} />
                  <InfoBox label="Trainer" value="Rehan Shahid" />
                  <InfoBox
                    label="Join Date"
                    value={new Date(
                      selectedMember.startDate,
                    ).toLocaleDateString()}
                  />
                  <InfoBox
                    label="Expiry Date"
                    value={new Date(
                      selectedMember.expiryDate,
                    ).toLocaleDateString()}
                  />
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition"
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
              <select
                required
                value={reNewPlan || renewMember.membershipPlan}
                onChange={(e) => setRenewPlan(e.target.value)}
              >
                <option value="">Select Plan</option>
                <option>Basic</option>
                <option>Premium</option>
                <option>Elite</option>
              </select>
              {/* <input value={renewMember.membershipPlan} disabled /> */}

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
