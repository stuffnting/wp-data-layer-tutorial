import { Spinner, Button } from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { store as noticesStore } from "@wordpress/notices";

export const DeletePageButton = ({ pageId }) => {
  const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore);
  // useSelect returns a list of selectors if you pass the store handle
  // instead of a callback:
  const { getLastEntityDeleteError } = useSelect(coreDataStore);

  const { deleteEntityRecord } = useDispatch(coreDataStore);

  const handleDelete = async () => {
    const success = await deleteEntityRecord("postType", "page", pageId);
    if (success) {
      // Tell the user the operation succeeded:
      createSuccessNotice("The page was deleted!", {
        type: "snackbar",
      });
    } else {
      // We use the selector directly to get the fresh error *after* the deleteEntityRecord
      // have failed.
      const lastError = getLastEntityDeleteError("postType", "page", pageId);
      const message =
        (lastError?.message || "There was an error.") + " Please refresh the page and try again.";
      // Tell the user how exactly the operation has failed:
      createErrorNotice(message, {
        type: "snackbar",
      });
    }
  };

  const { isDeleting } = useSelect(
    (select) => ({
      isDeleting: select(coreDataStore).isDeletingEntityRecord("postType", "page", pageId),
    }),
    [pageId]
  );

  return (
    <Button variant="primary" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? (
        <>
          <Spinner />
          Deleting...
        </>
      ) : (
        "Delete"
      )}
    </Button>
  );
};
