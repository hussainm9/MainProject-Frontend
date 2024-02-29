// Pagination.js

import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPagination = () => {
        const paginationItems = [];
        for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <Link to="#" className="page-link" onClick={() => onPageChange(i)}>{i}</Link>
                </li>
            )
        }
        return paginationItems;
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <Link to="#" className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo;</Link>
                </li>
                {renderPagination()}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <Link to="#" className="page-link" onClick={() => onPageChange(currentPage + 1)}>&raquo;</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
