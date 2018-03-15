/**
 * External dependencies
 */
import { get } from "lodash";
import { stringify } from "querystringify";

/**
 * WordPress dependencies
 */
const {withAPIData}    = wp.components;
const {buildTermsTree} = wp.utils;

/**
 * Internal dependencies
 */
import TermTreeSelect from "../term-tree-select";

function EventCategorySelect ({label, noOptionLabel, categories, selectedCategory, onChange}) {
  const termsTree = buildTermsTree(get(categories, "data", {}));
  return (
    <TermTreeSelect
      {...{label, noOptionLabel, onChange, termsTree}}
      selectedTerm={selectedCategory}
    />
  );
}

const applyWithAPIData = withAPIData(() => {
  const query = stringify({
    per_page: 100,
    _fields:  ["id", "name", "parent", "slug"],
  });
  return {
    categories: `/wp/v2/espresso_event_categories?${ query }`,
  };
});

export default applyWithAPIData(EventCategorySelect);
