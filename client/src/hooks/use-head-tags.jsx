import { headTags } from "../data-config/head-tags-data";
import { capitalize } from "../lib/capitalize-string";
import { useEffect } from "react";

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
  }, []);
};

export { useHeadTags };
