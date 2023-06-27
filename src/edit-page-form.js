/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from "@wordpress/data";
// Equivalent as wp.data.select('core') and wp.data.dispatch('core')
import { store as coreDataStore } from "@wordpress/core-data";

/**
 * Local dependencies
 */
import { PageForm } from "./page-form";

export function EditPageForm({ pageId, onCancel, onSaveFinished }) {
  // useSelect with .getEditedEntityRecord for the value
  const { isSaving, hasEdits, lastError, page } = useSelect(
    (select) => ({
      page: select(coreDataStore).getEditedEntityRecord("postType", "page", pageId),
      lastError: select(coreDataStore).getLastEntitySaveError("postType", "page", pageId),
      isSaving: select(coreDataStore).isSavingEntityRecord("postType", "page", pageId),
      hasEdits: select(coreDataStore).hasEditsForEntityRecord("postType", "page", pageId),
    }),
    [pageId]
  );

  /**
   * useDispatch with editEntityRecord to handle the change.
   * editEntityRecord make changes locally, but does not send to API.
   * The saveEditedEntityRecord dispatches the changes to the REST API.
   */
  const { editEntityRecord } = useDispatch(coreDataStore); // Equivalent to wp.data.dispatch('core').
  const handleChange = (title) => editEntityRecord("postType", "page", pageId, { title });

  // Deal with the actual saving of the changes
  const { saveEditedEntityRecord } = useDispatch(coreDataStore); // Equivalent to wp.data.dispatch('core').
  const handleSave = async () => {
    // Wait for save promise to resolve and then close the modal
    const updatedRecord = await saveEditedEntityRecord("postType", "page", pageId);
    // Only when the save is successfully completed, close the modal
    if (updatedRecord) {
      onSaveFinished();
    }
  };

  return (
    <PageForm
      title={page.title}
      onChangeTitle={handleChange}
      hasEdits={hasEdits}
      lastError={lastError}
      isSaving={isSaving}
      onCancel={onCancel}
      onSave={handleSave}
    />
  );
}
