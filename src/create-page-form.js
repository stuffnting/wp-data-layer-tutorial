import { useState } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

import { PageForm } from "./page-form";

export function CreatePageForm({ onCancel, onSaveFinished }) {
  const [title, setTitle] = useState("");
  const handleChange = (title) => setTitle(title);

  const { saveEntityRecord } = useDispatch(coreDataStore);
  const handleSave = async () => {
    const savedRecord = await saveEntityRecord("postType", "page", { title, status: "publish" });
    if (savedRecord) {
      onSaveFinished();
    }
  };

  const { lastError, isSaving } = useSelect(
    (select) => ({
      // Notice the missing pageId argument:
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
