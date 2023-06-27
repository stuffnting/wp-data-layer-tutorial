/**
 * WordPress dependencies
 */
import { decodeEntities } from "@wordpress/html-entities";
import { Spinner } from "@wordpress/components";
import { store as coreDataStore } from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";

/**
 * Local dependencies
 */
import { EditPageButton } from "./edit-page-button";
import { DeletePageButton } from "./delete-page-button";

export function PagesList({ searchTerm }) {
  // Get the list of pages and determine if the fetch promise is resolved
  const { pages, hasResolved } = useSelect(
    (select) => {
      const query = {};
      if (searchTerm) {
        query.search = searchTerm;
      }
      const selectorArgs = ["postType", "page", query];
      return {
        pages: select(coreDataStore).getEntityRecords(...selectorArgs),
        hasResolved: select(coreDataStore).hasFinishedResolution("getEntityRecords", selectorArgs),
      };
    },
    [searchTerm] // Each time searchTerm changes, this function re-runs
  );

  if (!hasResolved) {
    return <Spinner />;
  }
  if (!pages?.length) {
    return <div>No results</div>;
  }

  return (
    <table className="wp-list-table widefat fixed striped table-view-list">
      <thead>
        <tr>
          <td>Title</td>
          <td style={{ width: 120 }}>Actions</td>
        </tr>
      </thead>
      <tbody>
        {pages?.map((page) => (
          <tr key={page.id}>
            <td>{decodeEntities(page.title.rendered)}</td>
            <td>
              <div className="form-buttons">
                <EditPageButton pageId={page.id} />
                <DeletePageButton pageId={page.id} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
