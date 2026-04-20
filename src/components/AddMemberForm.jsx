import React from "react";

const AddMemberForm = ({
  modalType,
  formData,
  setFormData,
  loading,
  closeModal,
  handleSubmit,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Add {modalType}</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            required
            name="name"
            placeholder="Name"
            value={formData.name || ""}
            onChange={handleChange}
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
          />

          <input
            required
            name="phone"
            placeholder="Phone"
            maxLength="10"
            value={formData.phone || ""}
            onChange={handleChange}
          />

          <input
            required
            type="date"
            name="startDate"
            value={formData.startDate || ""}
            onChange={handleChange}
          />

          {modalType === "member" ? (
            <select
              required
              name="membershipPlan"
              value={formData.membershipPlan || ""}
              onChange={handleChange}
            >
              <option value="">Select Plan</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Elite">Elite</option>
            </select>
          ) : (
            <>
              <input
                required
                name="specialty"
                placeholder="Specialty"
                value={formData.specialty || ""}
                onChange={handleChange}
              />

              <input
                required
                name="experience"
                placeholder="Experience"
                value={formData.experience || ""}
                onChange={handleChange}
              />

              <textarea
                required
                name="bio"
                placeholder="Bio"
                value={formData.bio || ""}
                onChange={handleChange}
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
