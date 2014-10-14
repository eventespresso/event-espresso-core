/**
 * This contains all the js used in messages previews.
 */

jQuery(document).ready(function($) {
	/**
	 * Capture all link and button clicks and show a popup about being disabled.
	 */
	$(document).on('click', 'a', function(e) {
		e.preventDefault();
		e.stopPropagation();
		alert( eei18n.links_disabled );
	});

	$(document).on('click', 'button', function(e) {
		e.preventDefault();
		e.stopPropagation();
		alert( eei18n.links_disabled );
	});/**/

	$(document).on('submit', 'form', function(e) {
		e.preventDefault();
		e.stopPropagation();
		alert( eei18n.links_disabled );
	});
});
