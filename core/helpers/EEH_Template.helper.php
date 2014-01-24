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
	 * 	locate_template
	 * 
	 * 	locate a template file by looking in the following places, in the following order:
	 * 		/wp-content/theme/(the currently activated theme)
	 *		/wp-content/uploads/espresso/templates/  
	 *		/wp-content/uploads/espresso/templates/ee-theme/  
	 *		/wp-content/plugins/EE4/templates/(default theme)/ 
	 *	as soon as the template is found i none of those locations, it will be returned or loaded 
	 * 
	 * 	@param  string $template  the template file name including extension
	 * 	@param  boolean $load  whether to pass the located template path on to the EEH_Template::display_template() method or simply return it
	 * 	@param  array $template_args an array of arguments to be extracted for use in the template
	 * 	@param  boolean $return_string whether to send output immediately to screen, or capture and return as a string
	 * 	@return void
	 */
	public static function locate_template( $template = '', $load = TRUE, $template_args = array(), $return_string = TRUE ) {
		// first use WP locate_template to check for template in the current theme folder
		if ( ! $template_path = locate_template( $template )) {
			if ( empty( $template )) {
				// get post_type 
				$post_type = EE_Registry::instance()->REQ->get( 'post_type' );
				// get array of EE Custom Post Types
				$EE_CPTs = EE_Register_CPTs::get_CPTs();
				// build template name based on request
				if ( isset( $EE_CPTs[ $post_type ] )) {
					$archive_or_single =  is_archive() ? 'archive' : '';
					$archive_or_single =  is_single() ? 'single' : $archive_or_single;
					$template = $archive_or_single . '-' . $post_type . '.php';
				}
			}
			$current_theme = EE_Config::get_current_theme();
			echo '<h4>$current_theme : ' . $current_theme . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
			
			$tempates = is_array( $template ) ? $template : array( $template );
			foreach ( $tempates as $tempate ) {
				// then check the root of the uploads/espresso/templates/ folder
				if ( file_exists( EVENT_ESPRESSO_TEMPLATE_DIR . DS . $template )) {
					$template_path = EVENT_ESPRESSO_TEMPLATE_DIR . DS . $template;
					break;
				// or check the uploads/espresso/templates/ folder for an EE theme template file
				} elseif ( file_exists( EVENT_ESPRESSO_TEMPLATE_DIR . $current_theme . DS . $template )) {
					$template_path = EVENT_ESPRESSO_TEMPLATE_DIR . $current_theme . DS . $template;
					break;
				// otherwise get it from our folder within the plugin
				} else if ( file_exists( EE_TEMPLATES . $current_theme . DS . $template )) {
					$template_path = EE_TEMPLATES . $current_theme . DS . $template;
					break;
				}
			}
		}
		
		// if we got it and you want to see it...
		if ( $load && $template_path != '' ) {
			if ( $return_string ) {
				return EEH_Template::display_template( $template_path, $template_args, $return_string );
			} else {
				EEH_Template::display_template( $template_path, $template_args, $return_string );
			}			
		}
		return $template_path;
	}



	/**
	 * load and display a template
	 * @param  string $path_to_file  server path to the file to be loaded, including file name and extension
	 * @param  array $template_args an array of arguments to be extracted for use in the template
	 * @param  boolean $return_string whether to send output immediately to screen, or capture and return as a string
	 * @return void
	 */
	public static function display_template( $path_to_file = FALSE, $template_args = array(), $return_string = FALSE ) {
		//require the template validator for verifying variables are set according to how the template requires
		EE_Registry::instance()->load_helper( 'Template_Validator' );
		// you gimme nuttin - YOU GET NUTTIN !!
		if ( ! $path_to_file ) {
			return FALSE;
		}
		// if $template_args are not in an array, then make it so
		if ( ! is_array( $template_args ) && ! is_object( $template_args )) {
			$template_args = array( $template_args );
		}

		extract( (array) $template_args);

		if ( $return_string ) {
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
		if ( is_null( $amount ) ) {
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
			if( $mny->sign_b4 ){
				if( $amount >= 0 ){
					$amount_formatted = $mny->sign . $amount_formatted;
				}else{
					$amount_formatted = '-' . $mny->sign . str_replace( '-', '', $amount_formatted );
				}
				
			}else{
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
	 * This function is used for outputting the localized label for a given status id in the schema requested (and possibly plural).  The intended use of this function is only for cases where wanting a label outside of a related status model or model object (i.e. in documentation etc.)
	 * @param  string  $status_id Status ID matching a registered status in the esp_status table.  If there is no match, then 'Unkown' will be returned.
	 * @param  boolean $plural    Whether to return plural or not
	 * @param  string  $schema    'UPPER', 'lower', or 'Sentence'
	 * @return string             The localized label for the status id.
	 */
	public static function pretty_status( $status_id, $plural = FALSE, $schema = 'upper' ) {
		$status = EEM_Status::instance()->localized_status(array( $status_id => __('unknown') ), $plural, $schema );
		return $status[$status_id];
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




	/**
	 * This is a helper method to generate a status legend for a given status array.
	 * Note this will only work if the incoming statuses have a key in the EEM_Status->localized_status() methods status_array.
	 * 
	 * @param  array $status_array  array of statuses that will make up the legend. In format:
	 * array(
	 * 	'status_item' => 'status_name'
	 * )
	 * @param  string $active_status This is used to indicate what the active status is IF that is to be highlighted in the legend.
	 * @return string               html structure for status.
	 */
	public static function status_legend( $status_array, $active_status = '' ) {
		if ( !is_array( $status_array ) )
			throw new EE_Error( __('The EEH_Template::status_legend helper required the incoming status_array argument to be an array!', 'event_espresso') );

		$setup_array = array();
		foreach ( $status_array as $item => $status ) {
			$setup_array[$item] = array(
					'class' => 'ee-status-legend ee-status-legend-' . $status,
					'desc' => EEH_Template::pretty_status( $status, FALSE, 'sentence' ),
					'status' => $status
				);
		}

		$content = '<div class="ee-list-table-legend-container">' . "\n";
		$content .= '<h4>' . __('Status Legend', 'event_espresso') . '</h4>' . "\n";
		$content .= '<dl class="ee-list-table-legend">' . "\n\t";
		foreach ( $setup_array as $item => $details ) {
			$active_class = $active_status == $details['status'] ? ' class="ee-is-active-status"' : '';
			$content .= '<dt id="ee-legend-item-' . $item . '"' . $active_class . '>' . "\n\t\t";
			$content .= '<span class="' . $details['class'] . '""></span>' . "\n\t\t";
			$content .= '<span class="ee-legend-description">' . $details['desc'] . '</span>' . "\n\t";
			$content .= '</dt>' . "\n";
		}
		$content .= '</dl>' . "\n";
		$content .= '</div>' . "\n";
		return $content;
	}



} //end EEH_Template class