<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EEH_Template	
 *
 * This is a helper utility class that provides different helpers related to template files.
 *
 * @package		Event Espresso
 * @subpackage	/helpers/EEH_Template.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */




class EEH_Template {


	/**
	 * load and display a template
	 * @param  string $path_to_file  server path to the file to be loaded, including file name and extension
	 * @param  boolean $template_args an array of arguments to be extracted for use in the template
	 * @param  boolean $return_string whether to send output immediately to screen, or capture and return as a string
	 * @return void
	 */
	public static function display_template($path_to_file = FALSE, $template_args = FALSE, $return_string = FALSE) {
		//require the template validator for verifying variables are set according to how the template requires
		EE_Registry::instance()->load_helper( 'Template_Validator' );
		// you gimme nuttin - YOU GET NUTTIN !!
		if (!$path_to_file) {
			return FALSE;
		}
		// if $template_args are not in an array, then make it so
		if ( ! is_array( $template_args ) && ! is_object( $template_args )) {
			$template_args = array( $template_args );
		}

		extract( (array) $template_args);

		if ($return_string) {
			// becuz we want to return a string, we are going to capture the output
			ob_start();
			include( $path_to_file );
			$output = ob_get_clean();
			return $output;
		} else {
			include( $path_to_file );
		}
	}



	

	/**
	 * EEH_Template::format_currency
	 * This helper takes a raw float value and formats it according to the default config country currency settings, or the country currency settings from the supplied country ISO code
	 * 
	 * @param  float $amount   raw money value
	 * @param  boolean $return_raw  whether to return the formatted float value only with no currency sign or code
	 * @param  boolean $display_code  whether to display the country code (USD). Default = TRUE
	 * @param  string $CNT_ISO 2 letter ISO code for a country
	 * @return string        the html output for the formatted money value
	 */
	public static function format_currency( $amount = NULL, $return_raw = FALSE, $display_code = TRUE, $CNT_ISO = FALSE, $cur_code_span_class = 'currency-code' ) {
		// ensure amount was received
		if ( is_null( $amount )) {
			$msg = __( 'In order to format currency, an amount needs to be passed.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return;
		}
		//ensure amount is float
		$amount = (float) $amount;
		// load registray
		$EE = EE_Registry::instance();
		$mny = new EE_Currency_Config();
		// first set default config country currency settings
		if ( isset( $EE->CFG->currency->code )) {
			$mny = $EE->CFG->currency;
		} else {
			// manually set defaults
			$mny->code = 'USD';
			$mny->dec_plc = 2;
			$mny->dec_mrk = '.';
			$mny->thsnds = ',';
			$mny->sign = '$';
			$mny->sign_b4 = TRUE;			
		}
		// was a country ISO code passed ?
		if ( $CNT_ISO ) {			
			// get country
			if ( $cntry = $EE->load_model( 'Country' )->get_one_by_ID( $CNT_ISO )) {	
				// overwrite default settings
				$mny->code = $cntry->get('CNT_cur_code');
				$mny->dec_plc = $cntry->get('CNT_cur_dec_plc');
				$mny->dec_mrk = $cntry->get('CNT_cur_dec_mrk');
				$mny->thsnds = $cntry->get('CNT_cur_thsnds');
				$mny->sign = $cntry->get('CNT_cur_sign');
				$mny->sign_b4 =$cntry->get('CNT_cur_sign_b4');			
			}			
		}		
		// format float
		$amount_formatted = number_format( $amount, $mny->dec_plc, $mny->dec_mrk, $mny->thsnds );
		if ( ! $return_raw ) {
			// add currency sign
			if ( $mny->sign_b4 ){
				if ( $amount >= 0 ){
					$amount_formatted = $mny->sign . $amount_formatted;
				} else {
					// since we are manually adding the negative sign in B4 the currency sign, we need to make the amount positive so that we do NOT get TWO negative signs
					$amount_formatted = $amount_formatted * -1;
					// now manually add the negative sign in B4 the currency sign  ie:   -$25  NOT $-25
					$amount_formatted = '-' . $mny->sign . str_replace( '-', '', $amount_formatted );
				}				
			} else {
				$amount_formatted =  $amount_formatted . $mny->sign;
			}			
			// add currency code ?
			$amount_formatted = $display_code ? $amount_formatted . ' <span class="' . $cur_code_span_class . '">(' . $mny->code . ')</span>' : $amount_formatted;			
		}
		// clean up vars
		unset( $mny );
		unset( $EE );
		// return formatted currency amount
		return $amount_formatted;
	}



	

	/**
	 * This helper just returns a button or link for the given parameters
	 * @param  string $url   the url for the link
	 * @param  string $class what class is used for the button (defaults to 'button-primary')
	 * @param  string $label What is the label you want displayed for the button
	 * @return string        the html output for the button
	 */
	public static function get_button_or_link( $url, $label, $class = 'button-primary' ) {
		$button = '<a id="' . sanitize_title_with_dashes($label) . '" href="' . $url . '" class="' . $class . '">' . $label . '</a>';
		return $button;
	}





	/**
	 * This returns a generated link that will load the related help tab on admin pages.
	 *
	 *
	 * @param  string $page The page identifier for the page the help tab is on
	 * @param  string $action The action (route) for the admin page the help tab is on.
	 * @param  string $help_tab_id the id for the connected help tab
	 * @param  string $icon_style (optional) include css class for the style you want to use for the help icon.
	 * @param  string $help_text (optional) send help text you want to use for the link if default not to be used
	 * @return string              generated link
	 */
	public static function get_help_tab_link( $help_tab_id, $page = FALSE, $action = FALSE, $icon_style = FALSE, $help_text = FALSE ) {

		if ( ! $page ) 
			$page = isset( $_REQUEST['page'] ) && ! empty( $_REQUEST['page'] ) ? sanitize_key( $_REQUEST['page'] ) : $page;
		
		if ( ! $action )
			$action = isset( $_REQUEST['action'] ) && ! empty( $_REQUEST['action'] ) ? sanitize_key( $_REQUEST['action'] ) : $action;
		
		$action = empty($action) ? 'default' : $action;


		$help_tab_lnk = $page . '-' . $action . '-' . $help_tab_id;
		$icon = !$icon_style ? ' dashicons-editor-help' : $icon_style;
		$help_text = !$help_text ? '' : $help_text;
		return '<a id="' . $help_tab_lnk . '" class="ee-clickable dashicons espresso-help-tab-lnk ee-icon-size-22' . $icon . '" title="Click to open the \'Help\' tab for more information about this feature." > ' . $help_text . ' </a>';
	}



	/**
	 * This helper generates the html structure for the jquery joyride plugin with the given params.
	 * @link http://zurb.com/playground/jquery-joyride-feature-tour-plugin
	 * @see EE_Admin_Page->_stop_callback() for the construct expected for the $stops param.
	 * @param EE_Help_Tour
	 * @return string         html
	 */
	public static function help_tour_stops_generator( EE_Help_Tour $tour ) {
		$id = $tour->get_slug();
		$stops = $tour->get_stops();

		$content = '<ol style="display:none" id="' . $id . '">';

		foreach ( $stops as $stop ) {
			$data_id = !empty( $stop['id'] ) ? ' data-id="' . $stop['id'] . '"' : '';
			$data_class = empty( $data_id ) && !empty( $stop['class'] ) ? ' data-class="' . $stop['class'] . '"' : '';

			//if container is set to modal then let's make sure we set the options accordingly
			if ( empty( $data_id ) && empty( $data_class ) ) {
				$stop['options']['modal'] = true;
				$stop['options']['expose'] = true;
			}

			$custom_class = !empty( $stop['custom_class'] ) ? ' class="' . $stop['custom_class'] . '"' : '';
			$button_text = !empty( $stop['button_text'] ) ? ' data-button="' . $stop['button_text'] . '"' : '';
			$innercontent = isset($stop['content']) ? $stop['content'] : '';

			//options
			if ( isset( $stop['options'] ) && is_array( $stop['options'] ) ) {
				$options = ' data-options="';
				foreach ( $stop['options'] as $option => $value ) {
					$options .= $option . ':' . $value . ';';
				}
				$options .= '"';
			} else {
				$options = '';
			}

			//let's put all together
			$content .= '<li' . $data_id . $data_class . $custom_class . $button_text . $options . '>' . $innercontent . '</li>';
		}

		$content .= '</ol>';
		return $content;
	}



} //end EEH_Template class