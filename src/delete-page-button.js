/**
 * WordPress dependencies
 */
import { Spinner, Button } from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { store as noticesStore } from "@wordpress/notices";

export const DeletePageButton = ({ pageId }) => {
  // The delete button uses @wordpress/notices to issue error warnings.
  const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore); // Equivalent to wp.data.dispatch('core/notices')

  /**
   * Get the selector that returns the last delete error.
   * useSelect returns a list of selectors for the relevant store,
   * if you pass the store handle instead of a callback.
   * Equivalent to wp.data.select('core')
   */
  const { getLastEntityDeleteError } = useSelect(coreDataStore);
  /**
   * useDispatch returns a list of actions for the relevant store,
   * if you pass the store handle instead of a callback.
   * Equivalent to wp.data.dispatch('core').
   */
  const { deleteEntityRecord } = useDispatch(coreDataStore);

  const handleDelete = async () => {
    const success = await deleteEntityRecord("postType", "page", pageId);

    if (success) {
      // Tell the user the operation succeeded, add a notice to the snackbar list
      createSuccessNotice("The page was deleted!", {
        type: "snackbar",
      });
    } else {
      /**
       * We use the selector directly to get the fresh error *after*
       * the deleteEntityRecord has failed.
       */
      const lastError = getLastEntityDeleteError("postType", "page", pageId);
      // Add a notice to the snackbar list.
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
