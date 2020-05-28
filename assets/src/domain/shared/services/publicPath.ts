/* eslint-disable 
no-unused-vars,
no-native-reassign,
no-global-assign,
@typescript-eslint/no-unused-vars,
no-var
*/
/* global __webpack_public_path__ */
declare var __webpack_public_path__: string;
let assetsUrl = window?.eeEditorData?.assetsUrl;

// TODO add assetUrl to global data for all domains
// temporary workaround
if (!assetsUrl) {
	assetsUrl = window.location.origin + '/wp-content/plugins/event-espresso-core/assets/dist/';
}
__webpack_public_path__ = assetsUrl;

// not needed
export default assetsUrl = __webpack_public_path__;
