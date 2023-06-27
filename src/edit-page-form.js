import { useSelect, useDispatch } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

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

  // useDispatch with editEntityRecord to handle the change
  const { editEntityRecord } = useDispatch(coreDataStore);
  const handleChange = (title) => editEntityRecord("postType", "page", pageId, { title });

  const { saveEditedEntityRecord } = useDispatch(coreDataStore);
  const handleSave = async () => {
    // Wait for save promise to resolve and then close the modal
    const updatedRecord = await saveEditedEntityRecord("postType", "page", pageId);
    // If there is an error don't close the modal
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
