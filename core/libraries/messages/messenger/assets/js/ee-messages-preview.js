/**
 * This contains all the js used in messages previews.
 */

jQuery(document).ready(function($) {
	/**
	 * Capture all link and button clicks and show a popup about being disabled.
	 */

	//if the eeLazyLoadingContainers object is loaded then we're in wp-admin so dont' disable links globally. Otherwise disable globally.
	var containerToDisable = typeof eeLazyLoadingContainers === 'undefined' ? document : '#ee-message-preview-container';

	$(containerToDisable).on('click', 'a', function(e) {
		e.preventDefault();
		e.stopPropagation();
		alert( eei18n.links_disabled );
	});

	$(containerToDisable).on('click', 'button', function(e) {
		e.preventDefault();
		e.stopPropagation();
		alert( eei18n.links_disabled );
	});/**/

	$(containerToDisable).on('submit', 'form', function(e) {
		e.preventDefault();
		e.stopPropagation();
		alert( eei18n.links_disabled );
	});
});
