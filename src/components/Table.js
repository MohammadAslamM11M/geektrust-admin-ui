import React, { useEffect, useState } from "react";
import Search from "./Search";
import Pagination from "./Pagination";
import "../styles-component/table.css";
import EditDetails from "./EditDetails";

const Table = () => {
    const [userDetails, setUserdetails] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [filteredSearch, setFilteredSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editDetails, setEditDetails] = useState({});
    const [isSelectAll, setIsSelectAll] = useState(false);

    const userDetailsPerPage = 10;
    const lastIndex = currPage * userDetailsPerPage;
    const firstIndex = lastIndex - userDetailsPerPage;
    const numOfPages = Math.ceil(userDetails.length / userDetailsPerPage);

    const getUserDetails = async () => {
        try {
            const response = await fetch(
                "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
            );
            const data = await response.json();
            setUserdetails(
                data.map((m) => {
                    return { ...m, isChecked: false };
                })
            );
            console.log(data);
            return data;
        } catch (e) {
            return null;
        }
    };

    const details = userDetails.slice(firstIndex, lastIndex);

    const handleSearch = (text) => {
        setFilteredSearch(text);
    };

    const prevPage = () => {
        if (currPage !== 1) {
            setCurrPage(currPage - 1);
        }
    };
    const changeCurrPage = (id) => {
        setCurrPage(id);
    };
    const nextPage = () => {
        if (currPage !== numOfPages) {
            setCurrPage(currPage + 1);
        }
    };
    const veryLastPage = () => {
        if (currPage !== numOfPages) {
            setCurrPage(numOfPages);
        }
    };
    const veryFirstPage = () => {
        if (currPage !== 1) {
            setCurrPage(1);
        }
    };

    const handleCheck = (e, ele) => {
        let ppllist = [...userDetails];
        const { name, checked } = e.target;
        if (name === "selectAll") {
            for (let i = firstIndex, j = 0; i < firstIndex + userDetailsPerPage && i < userDetails.length; i++, j++) {
                ppllist[i].isChecked = checked;
                details[j] = ppllist[i];
            }
            setUserdetails(ppllist);
            setIsSelectAll(checked);
        } else {
            const index = ppllist.indexOf(ele);
            ppllist[index].isChecked = checked;
            ele.isChecked = checked;
            setUserdetails(ppllist);
        }
    };

    const handleEdit = (itemToEdit) => {
        setEditDetails(itemToEdit);
        setShowModal(true);
    };

    const handleUpdateFn = (e, updatedItem) => {
        setUserdetails(
            userDetails.map((f) => {
                if (f.id === updatedItem.id) {
                    f = updatedItem;
                }
                return f;
            })
        );
        setShowModal(false);
        e.preventDefault();
    };
    const handleCancel = (e) => {
        setShowModal(false);
    };

    const handleDelete = (e, id) => {
        if (isSelectAll) {
            setUserdetails(userDetails.filter((f, index) => index < firstIndex || index >= lastIndex));
            return true;
        }
        const list = userDetails.filter((f) => (id ? f.id !== id : !f.isChecked));
        setUserdetails(list);
        e.preventDefault();
    };
    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <>
            <div className="table-card">
                <Search userDetails={userDetails} changeSearch={handleSearch} />
                <div className="container">
                    <table className="table" style={{ width: "100%", border: "none" }}>
                        <thead>
                            <tr className="table-row">
                                <th className="table-data">
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        name="selectAll"
                                        checked={details.filter((detail) => detail?.isChecked !== true).length < 1}
                                        onChange={(e) => handleCheck(e)}
                                    />
                                </th>
                                <th className="table-data">Name</th>
                                <th className="table-data">Email</th>
                                <th className="table-data">Role</th>
                                <th className="table-data">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details
                                ?.filter((detail) => {
                                    return filteredSearch.toLowerCase() === ""
                                        ? detail
                                        : detail.role.toLowerCase().includes(filteredSearch) ||
                                              detail.name.toLowerCase().includes(filteredSearch) ||
                                              detail.email.toLowerCase().includes(filteredSearch);
                                })
                                .map((detail) => {
                                    return (
                                        <tr key={detail.id} className={detail?.isChecked ? `checkbox-active` : ``}>
                                            <td className="table-data">
                                                <input
                                                    className={detail?.isChecked ? `active` : `checkbox`}
                                                    type="checkbox"
                                                    name={detail.name}
                                                    checked={detail?.isChecked || false}
                                                    onChange={(e) => handleCheck(e, detail)}
                                                />
                                            </td>
                                            <td className="table-data">{detail.name}</td>
                                            <td className="table-data">{detail.email}</td>
                                            <td className="table-data">{detail.role}</td>
                                            <td className="table-data-action">
                                                <div className="action-layout">
                                                    <button className="edit-btn" onClick={(e) => handleEdit(detail)}>
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="delete-btn"
                                                        onClick={(e) => handleDelete(e, detail.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                    <div>
                        <button className="delete-selected-btn" onClick={(e) => handleDelete(e, "")}>
                            Delete Selected
                        </button>
                    </div>
                    <Pagination
                        userDetails={userDetails}
                        currPage={currPage}
                        numOfPages={numOfPages}
                        changePrev={prevPage}
                        changeCurr={changeCurrPage}
                        changeNext={nextPage}
                        changeVeryFirst={veryFirstPage}
                        changeVeryLast={veryLastPage}
                    />
                </div>
            </div>
            {showModal && (
                <EditDetails userDetails={editDetails} handleUpdate={handleUpdateFn} handleCancel={handleCancel} />
            )}
        </>
    );
};

export default Table;
