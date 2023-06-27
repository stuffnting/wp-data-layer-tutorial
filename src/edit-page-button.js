/**
 * WordPress dependencies
 */
import { useState } from "@wordpress/element";
import { Button, Modal } from "@wordpress/components";

/**
 * Local dependencies
 */
import { EditPageForm } from "./edit-page-form";

export function EditPageButton({ pageId }) {
  // Use local state for the modal status
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <Button onClick={openModal} variant="primary">
        Edit
      </Button>
      {isOpen && (
        <Modal onRequestClose={closeModal} title="Edit page">
          <EditPageForm pageId={pageId} onCancel={closeModal} onSaveFinished={closeModal} />
        </Modal>
      )}
    </>
  );
}
