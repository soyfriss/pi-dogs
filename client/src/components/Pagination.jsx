import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPage } from '../redux/actions';
import styles from './Pagination.module.css';

function Pagination({ totalBreeds, breedsPerPage }) {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage);
    const totalPages = Math.ceil(totalBreeds / breedsPerPage);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const paginate = (value) => {
        dispatch(changeCurrentPage(currentPage + value));
        handleScrollToTop();
    }

    return <>
        <div className={styles.pagination}>
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
        </div>
    </>
}

export default Pagination;