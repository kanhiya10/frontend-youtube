interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
  }
  
  export const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    onPrev,
    onNext,
  }) => (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm font-medium disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm font-medium text-gray-700 dark:text-white">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm font-medium disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );

  