/**
 * WordPress dependencies
 */
import { useState, createRoot } from "@wordpress/element";
import { SearchControl } from "@wordpress/components";

/**
 * Local dependencies
 */
import { PagesList } from "./pages-list";
import { CreatePageButton } from "./create-page-button";
import { Notifications } from "./notifications";

function MyFirstApp() {
  // Local state to deal with the search input field
  const [searchTerm, setSearchTerm] = useState("");

  // Basic app layout
  return (
    <div>
      <div className="list-controls">
        <SearchControl onChange={setSearchTerm} value={searchTerm} />
        <CreatePageButton />
      </div>
      <PagesList searchTerm={searchTerm} />
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
