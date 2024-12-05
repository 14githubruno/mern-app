// react lib
import { useEffect } from "react";

// lib
import { capitalize } from "../lib/capitalize-string";

// content
import { headTags } from "../data-content/head-tags-data";

/**
 * useHeadTags custom hook.
 *
 * It sets the appropriate document title and meta description to each page.
 *
 * @param {string} page - The path url of the current page.
 * @param {string} string - Optional string to append to the title and/or meta description.
 *
 * @returns {void}
 *
 */
const useHeadTags = (page, string = "") => {
  useEffect(() => {
    if (headTags[page] && document.title !== headTags[page].title) {
      const { title, metaDescription } = headTags[page];
      const metaDesc = document.querySelector('meta[name="description"]');

      document.title = string ? `${title} [${capitalize(string)}]` : title;
      metaDesc.content = string
        ? `${metaDescription} [${capitalize(string)}]`
        : metaDescription;
    }
  }, [page, string]);
};

export { useHeadTags };
