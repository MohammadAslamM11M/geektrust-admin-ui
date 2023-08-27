import React from "react";
import "../styles-component/pagination.css";

const Pagination = (userDetails) => {
    const { currPage, numOfPages, changePrev, changeCurr, changeNext } = userDetails;
    const nums = Array.from({ length: numOfPages }, (_, i) => i + 1);

    return (
        <nav>
            <ul className="pagination">
                <div>
                    <button className="pagination-button" onClick={() => changePrev()}>
                        &laquo;
                    </button>
                </div>
                {nums.map((n, i) => (
                    <div key={i}>
                        <button
                            className={`pagination-button ${currPage === n ? "active" : ""}`}
                            onClick={() => changeCurr(n)}
                        >
                            {n}
                        </button>
                    </div>
                ))}
                <div>
                    <button className="pagination-button" onClick={() => changeNext()}>
                        &raquo;
                    </button>
                </div>
            </ul>
        </nav>
    );
};

export default Pagination;
