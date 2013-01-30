<?php
$espresso_template_version = "1.0";

if ( espresso_template_version() != $espresso_template_version && is_admin()){
	add_action( 'admin_notices', 'espresso_display_template_error' );
}

function espresso_display_template_error() {
	echo '<div class="error fade"><p><strong>' . __('Your Event Espresso templates are outdated. Please update your templates ASAP!', 'event_espresso') . '</strong></p></div>';
}

/**
 * Retrieve path to a template
 *
 * Used to quickly retrieve the path of a template without including the file
 * extension. It will also check the parent theme, if the file exists, with
 * the use of {@link locate_template()}. Allows for more generic template location
 * without the use of the other get_*_template() functions.
 *
 * @since 3.2
 *
 * @param string $type Filename without extension.
 * @param array $templates An optional list of template candidates
 * @return string Full path to file.
 */
function espresso_get_query_template( $type, $templates = array() ) {

	if ( empty( $templates ) )
		$templates = array("{$type}.php");

	return apply_filters( "{$type}_template", espresso_locate_template( $templates ) );
}

/**
 * Retrieve the name of the highest priority template file that exists.
 *
 * Searches in the EVENT_ESPRESSO_TEMPLATE_DIR before EVENT_ESPRESSO_PLUGINFULLPATH so that templates which
 * inherit from a parent theme can just overload one file.
 *
 * @since 3.2
 *
 * @param string|array $template_names Template file(s) to search for, in order.
 * @param bool $load If true the template file will be loaded if it is found.
 * @param bool $require_once Whether to require_once or require. Default true. Has no effect if $load is false.
 * @return string The template filename if one is located.
 */
function espresso_locate_template( $template_names ) {
	global $org_options;
	$located = '';

	foreach ( (array) $template_names as $template_name ) {
		if ( !$template_name )
			continue;
		if ( file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $template_name) && $org_options['template_settings']['use_custom_templates']) {
			$located = EVENT_ESPRESSO_TEMPLATE_DIR . $template_name;
			break;
		} else if ( file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/' . $template_name) ) {
			$located = EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/' . $template_name;
			break;
		}
	}

	return $located;
}

/**
 * Retrieve path of registration page template in current or parent template.
 *
 * @since 3.2
 *
 * @return string
 */
function espresso_get_registration_page_template() {

	$templates = array();

	$templates[] = 'registration_page.php';

	return espresso_get_query_template( 'registration_page', $templates );
}

/**
 * Retrieve path of registration display template in current or parent template.
 *
 * @since 3.2
 *
 * @return string
 */
function espresso_get_registration_display_template() {

	$templates = array();

	$templates[] = 'registration_page_display.php';

	return espresso_get_query_template( 'registration_page_display', $templates );
}

/**
 * Retrieve path of event list template in current or parent template.
 *
 * @since 3.2
 *
 * @return string
 */
function espresso_get_event_list_template() {

	$templates = array();

	$templates[] = 'event_list.php';

	return espresso_get_query_template( 'event_list', $templates );
}

/**
 * Retrieve path of event_list_display template in current or parent template.
 *
 * @since 3.2
 *
 * @return string
 */
function espresso_get_event_list_display_template() {

	$templates = array();

	$templates[] = 'event_list_display.php';

	return espresso_get_query_template( 'event_list_display', $templates );
}

/**
 * Retrieve path of attendee list template in current or parent template.
 *
 * @since 3.2
 *
 * @return string
 */
function espresso_get_attendee_list_template() {

	$templates = array();

	$templates[] = 'attendee_list.php';

	return espresso_get_query_template( 'attendee_list', $templates );
}

/**
 * Retrieve path of shopping cart template in current or parent template.
 *
 * @since 3.2
 *
 * @return string
 */
function espresso_get_shopping_cart_template() {

	$templates = array();

	$templates[] = 'shopping_cart.php';

	return espresso_get_query_template( 'shopping_cart', $templates );
}

/**
 * Retrieve path of widget template in current or parent template.
 *
 * @since 3.2
 *
 * @return string
 */
function espresso_get_widget_template() {

	$templates = array();

	$templates[] = 'widget.php';

	return espresso_get_query_template( 'widget', $templates );
}

/**
 * Retrieve path of confirmation display template in current or parent template.
 *
 * @since 3.2
 *
 * @return string
 */
function espresso_get_confirmation_display_template() {

	$templates = array();

	$templates[] = 'confirmation_display.php';

	return espresso_get_query_template( 'confirmation_display', $templates );
}

/**
 * Retrieve path of payment page template in current or parent template.
 *
 * @since 3.2
 *
 * @return string
 */
function espresso_get_payment_page_template() {

	$templates = array();

	$templates[] = 'payment_page.php';

	return espresso_get_query_template( 'payment_page', $templates );
}

/**
 * Retrieve path of payment_overview template in current or parent template.
 *
 * @since 3.2
 *
 * @return string
 */
function espresso_get_payment_overview_template() {

	$templates = array();

	$templates[] = 'payment_overview.php';

	return espresso_get_query_template( 'payment_overview', $templates );
}

/**
 * Retrieve path of return_payment template in current or parent template.
 *
 * @since 3.2
 *
 * @return string
 */
function espresso_get_return_payment_template() {

	$templates = array();

	$templates[] = 'return_payment.php';

	return espresso_get_query_template( 'return_payment', $templates );
}