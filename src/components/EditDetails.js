import React,{useState} from "react";
import "../styles-component/editDetails.css";

const EditDetails = ({userDetails, handleUpdate, handleCancel}) => {
    const [user, setUser] = useState(userDetails);
  
    const handleOnChange = (e, key) =>{
        const obj = {...user};
        obj[key] = e.target.value;
        setUser({
            ...user,
            name: obj.name,
            email:obj.email,
            role: obj.role
        });     
    }
    return (
        <div
            className="edit-modal"
            style={{
                position: "absolute",
                padding: "20px",
                width: "auto",
                left: "25%",
                right: "25%",
                top: "40%",
                backgroundColor: "white",
                textAlign: "center",
                borderRadius: "10px",
                zIndex: 1,
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
        >
            <h4>Update user details</h4>
            <div>
                <form 
                    action=""
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <span style={{ paddingRight: "5px" }}>Name</span>
                        <input type="text" value={user.name} onChange={(e) => handleOnChange(e,'name')}/>
                    </div>
                    <div>
                        <span style={{ paddingRight: "5px" }}>Email</span>
                        <input type="text" value={user.email} onChange={(e) => handleOnChange(e,'email')}/>
                    </div>
                    <div>
                        <span style={{ paddingRight: "5px" }}>Role</span>
                        <input type="text" value={user.role} onChange={(e) => handleOnChange(e,'role')}/>
                    </div>
                    <div style={{ display: "flex", marginTop: "15px" }}>
                        <button
                            style={{
                                margin: "0px 4px",
                                width: "50%",
                                backgroundImage:
                                    "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
                                borderStyle: "none",
                                borderRadius: "25px",
                                color: "rgb(255, 255, 255)",
                                cursor: "pointer",
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                            }} 
                            onClick={(e) => handleUpdate(e,user)}
                        >
                            Update
                        </button>
                        <button
                            style={{
                                margin: "0px 4px",
                                width: "50%",
                                backgroundImage:
                                    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                                borderStyle: "none",
                                borderRadius: "25px",
                                color: "rgb(76, 76, 76)",
                                cursor: "pointer",
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                            }}
                            onClick={(e) => handleCancel(e)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDetails;
