import { headTags } from "../data-content/head-tags-data";
import { capitalize } from "../lib/capitalize-string";
import { useEffect } from "react";

/**
 * useHeadTags custom hook.
 *
 * It sets the appropriate document title and meta description to each page.
 *
 * (A config object is used to retrieve data to be used in each page.
 * When component mounts, a useEffect will set the two head tags and populate them)
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
