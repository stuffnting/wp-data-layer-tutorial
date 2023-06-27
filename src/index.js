import { useSelect } from "@wordpress/data";
import { useState, createRoot } from "@wordpress/element";
import { store as coreDataStore } from "@wordpress/core-data";
import { SearchControl } from "@wordpress/components";

import { PagesList } from "./pages-list";
import { CreatePageButton } from "./create-page-button";
import { Notifications } from "./notifications";

function MyFirstApp() {
  const [searchTerm, setSearchTerm] = useState("");
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
    [searchTerm]
  );

  return (
    <div>
      <div className="list-controls">
        <SearchControl onChange={setSearchTerm} value={searchTerm} />
        <CreatePageButton />
      </div>
      <PagesList hasResolved={hasResolved} pages={pages} />
      <Notifications />
    </div>
  );
}

window.addEventListener(
  "load",
  function () {
    const el = document.querySelector("#my-first-gutenberg-app");
    const root = createRoot(el);
    root.render(<MyFirstApp />);
  },
  false
);
