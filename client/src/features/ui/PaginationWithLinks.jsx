import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Pagination.module.css';

function PaginationWithLinks({ totalItems, itemsPerPage, currentPage, setCurrentPage, enableScrollToTop = true }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    const paginate = (value) => {
        setCurrentPage(currentPage + value);
        if (enableScrollToTop) handleScrollToTop();
    }

    return <>
        <div className={`${styles.pagination} pagination`}>
            <NavLink to={`/home?page=${currentPage - 1}`} className={styles.navLink}>
                &#60;
            </NavLink>
            <button
                className={styles.previous}
                onClick={() => paginate(-1)}
                disabled={currentPage === 1}
            >
                &#60;
            </button>
            <p className={styles.pages}>{`${currentPage} of ${totalPages}`}</p>
            <button
                className={styles.next}
                onClick={() => paginate(1)}
                disabled={currentPage === totalPages}
            >
                &#62;
            </button>
            <NavLink to={`/home?page=${currentPage + 1}`} className={styles.navLink}>
                &#62;
            </NavLink>
        </div>
    </>
}

export default PaginationWithLinks;