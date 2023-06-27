/**
 * WordPress dependencies
 */
import { useState } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

/**
 * Local dependencies
 */
import { PageForm } from "./page-form";

export function CreatePageForm({ onCancel, onSaveFinished }) {
  // Use local state to handle the title input field.
  const [title, setTitle] = useState("");
  const handleChange = (title) => setTitle(title);

  /**
   * Save the new Page with the input title.
   * By default, a new Page created through the REST API will be a draft.
   * Therefore, add a status property to the options object.
   * If the promise is successfully resolved, close the modal.
   */
  const { saveEntityRecord } = useDispatch(coreDataStore); // Equivalent to wp.data.dispatch('core').
  const handleSave = async () => {
    const savedRecord = await saveEntityRecord("postType", "page", { title, status: "publish" });
    if (savedRecord) {
      onSaveFinished();
    }
  };

  const { lastError, isSaving } = useSelect(
    (select) => ({
      /**
       * An unsaved Page has no ID, so the 3rd param of getLastEntitySaveError is missing.
       * In such cases, the Page is assumed to be the unsaved one held in state.
       */
      lastError: select(coreDataStore).getLastEntitySaveError("postType", "page"),
      isSaving: select(coreDataStore).isSavingEntityRecord("postType", "page"),
    }),
    []
  );

  return (
    <PageForm
      title={title}
      onChangeTitle={handleChange}
      hasEdits={!!title}
      onSave={handleSave}
      onCancel={onCancel}
      lastError={lastError}
      isSaving={isSaving}
    />
  );
}
