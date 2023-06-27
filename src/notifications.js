/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from "@wordpress/data";
import { SnackbarList } from "@wordpress/components";
import { store as noticesStore } from "@wordpress/notices";

export function Notifications() {
  const notices = useSelect((select) => select(noticesStore).getNotices(), []);
  const snackbarNotices = notices.filter(({ type }) => type === "snackbar");
  const { removeNotice } = useDispatch(noticesStore); // Equivalent to wp.data.select('core/notices')

  return (
    <SnackbarList
      notices={snackbarNotices}
      className="components-editor-notices__snackbar"
      onRemove={removeNotice}
    />
  );
}
