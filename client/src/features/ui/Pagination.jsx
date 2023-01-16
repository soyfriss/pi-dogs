import React from 'react';
import styles from './Pagination.module.css';

function Pagination({ totalItems, itemsPerPage, currentPage, setCurrentPage, enableScrollToTop = true }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    const paginate = (value) => {
        setCurrentPage(currentPage + value);
        if (enableScrollToTop) handleScrollToTop();
    }

    return <>
        <div className={styles.pagination}>
            <button
                className={currentPage === 1 ? `${styles.previous} ${styles.disabled}` : styles.previous }
                onClick={() => paginate(-1)}
                disabled={currentPage === 1}
            >
                &#60;
            </button>
            <p className={styles.pages}>{`${currentPage} of ${totalPages}`}</p>
            <button
                className={currentPage === totalPages ? `${styles.next} ${styles.disabled}` : styles.next }
                onClick={() => paginate(1)}
                disabled={currentPage === totalPages}
            >
                &#62;
            </button>
        </div>
    </>
}

export default Pagination;