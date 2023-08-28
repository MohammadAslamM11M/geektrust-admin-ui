import React, { useState } from "react";
import "../styles-component/editDetails.css";

const EditDetails = ({ userDetails, handleUpdate, handleCancel }) => {
    const [user, setUser] = useState(userDetails);

    const handleOnChange = (e, key) => {
        const obj = { ...user };
        obj[key] = e.target.value;
        setUser({
            ...user,
            name: obj.name,
            email: obj.email,
            role: obj.role,
        });
    };
    return (
        <div className="edit-modal">
            <h2>Update User Details</h2>
            <div>
                <form className="edit-form" action="">
                    <div>
                        <span style={{ paddingRight: "5px" }}>Name</span>
                        <input
                            className="modal-input"
                            type="text"
                            value={user.name}
                            onChange={(e) => handleOnChange(e, "name")}
                        />
                    </div>
                    <div>
                        <span style={{ paddingRight: "5px" }}>Email</span>
                        <input
                            className="modal-input"
                            type="text"
                            value={user.email}
                            onChange={(e) => handleOnChange(e, "email")}
                        />
                    </div>
                    <div>
                        <span style={{ paddingRight: "5px" }}>Role</span>
                        <input
                            className="modal-input"
                            type="text"
                            value={user.role}
                            onChange={(e) => handleOnChange(e, "role")}
                        />
                    </div>
                    <div style={{ display: "flex", marginTop: "15px" }}>
                        <button className="update-btn" onClick={(e) => handleUpdate(e, user)}>
                            Update
                        </button>
                        <button className="cancel-btn" onClick={(e) => handleCancel(e)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDetails;
