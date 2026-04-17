import React from "react";

const AddMemberForm = ({
  modalType,
  formData,
  setFormData,
  loading,
  setLoading,
  closeModal,
  handleSubmit,
}) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Add {modalType}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            required
            placeholder="Name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          <input
            required
            type="date"
            placeholder="Start Date"
            value={formData.startDate || ""}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
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
  );
};

export default AddMemberForm;
