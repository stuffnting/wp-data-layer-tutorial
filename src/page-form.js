/**
 * WordPress dependencies
 */
import { Spinner, Button, TextControl } from "@wordpress/components";

export function PageForm({
  title,
  onChangeTitle,
  hasEdits,
  lastError,
  isSaving,
  onCancel,
  onSave,
}) {
  /**
   * If there is an error, display it.
   * The Save button is disabled if there are no edits, or a save is in progress.
   * If there is a Save in progress, the save button gets a spinner.
   * The Cancel button is disables if a save is in progress.
   */
  return (
    <div className="my-gutenberg-form">
      <TextControl label="Page title:" value={title} onChange={onChangeTitle} />
      {lastError ? <div className="form-error">Error: {lastError.message}</div> : false}
      <div className="form-buttons">
        <Button onClick={onSave} variant="primary" disabled={!hasEdits || isSaving}>
          {isSaving ? (
            <>
              <Spinner />
              Saving
            </>
          ) : (
            "Save"
          )}
        </Button>
        <Button onClick={onCancel} variant="tertiary" disabled={isSaving}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
