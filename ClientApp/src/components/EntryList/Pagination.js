// const Pagination = ({ currentPage, totalPages, handlePageChange }) => (
//     <div>
//         <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//         >
//             Previous
//         </button>
//         <span>
//             Page {currentPage} of {totalPages}
//         </span>
//         <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//         >
//             Next
//         </button>
//     </div>
// );

import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => (
    <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(e, newPage) => handlePageChange(newPage)}
        color="primary"
    />
);

export default Pagination;
