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
 */
if ( ! function_exists( 'espresso_get_template_part' )) {
	function espresso_get_template_part( $slug = NULL, $name = NULL ) {
		EEH_Template::get_template_part( $slug, $name );
	}	
}
/*
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
	
	private static $_espresso_themes = array();


	/**
	 * 	is_espresso_theme - returns TRUE or FALSE on whether the currently active WP theme is an espresso theme
	 * 
	 * 	@return void
	 */
	public static function is_espresso_theme() {
		return wp_get_theme()->get( 'TextDomain' ) == 'event_espresso' ? TRUE : FALSE;
	}

	/**
	 * 	load_espresso_theme_functions - if current theme is an espresso theme, or uses ee theme template parts, then load it's functions.php file ( if not already loaded )
	 * 
	 * 	@return void
	 */
	public static function load_espresso_theme_functions() {
		if ( ! defined( 'EE_THEME_FUNCTIONS_LOADED' )) {
			require_once( EE_TEMPLATES . EE_Config::get_current_theme() . DS . 'functions.php' );
		}
	}

	/**
	 * 	get_espresso_themes - returns an array of Espresso Child themes loacted in the /tmeplates/ directory
	 * 
	 * 	@return void
	 */
	public static function get_espresso_themes() {
		if ( empty( EEH_Template::$_espresso_themes )) {
			$espresso_themes =  glob( EE_TEMPLATES . '*', GLOB_ONLYDIR );
			if (( $key = array_search( 'global_assets', $espresso_themes )) !== FALSE ) {
			    unset( $espresso_themes[ $key ] );
			}
			EEH_Template::$_espresso_themes = array();
			foreach ( $espresso_themes as $espresso_theme ) {
				EEH_Template::$_espresso_themes[ basename( $espresso_theme ) ] = $espresso_theme;
			}	
		}
		return EEH_Template::$_espresso_themes;
	}



	/**
	 * EEH_Template::get_template_part
	 * basically a copy of the WordPress get_template_part() function but uses EEH_Template::locate_template() instead, and doesn't add base versions of files
	 * so not a very useful function at all except that it adds familiarity PLUS filtering based off of the entire template part name
	 * 
	 * @param string $slug The slug name for the generic template.
	 * @param string $name The name of the specialised template.
	 * @return string        the html output for the formatted money value
	 */
	public static function get_template_part( $slug = NULL, $name = NULL, $template_args = array(), $return_string = FALSE  ) {
		do_action( "get_template_part_{$slug}-{$name}", $slug, $name );
		$templates = array();
		$name = (string) $name;
		if ( $name != '' ) {
			$templates[] = "{$slug}-{$name}.php";
		}
		// we do NOT want to find the slug only version of files such as content.php when looking for content-espresso_events.php
		// $templates[] = "{$slug}.php";
		EEH_Template::locate_template( $templates, TRUE, $template_args, $return_string );
	}



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
	 * 	@param  mixed string | array $templates  the template file name including extension
	 * 	@param  boolean $load  whether to pass the located template path on to the EEH_Template::display_template() method or simply return it
	 * 	@param  array $template_args an array of arguments to be extracted for use in the template
	 * 	@param  boolean $return_string whether to send output immediately to screen, or capture and return as a string
	 * 	@return void
	 */
	public static function locate_template( $templates = array(), $load = TRUE, $template_args = array(), $return_string = TRUE ) {
		// first use WP locate_template to check for template in the current theme folder
		if ( ! $template_path = locate_template( $templates )) {
			if ( empty( $templates )) {
				// get post_type 
				$post_type = EE_Registry::instance()->REQ->get( 'post_type' );
				// get array of EE Custom Post Types
				$EE_CPTs = EE_Register_CPTs::get_CPTs();
				// build template name based on request
				if ( isset( $EE_CPTs[ $post_type ] )) {
					$archive_or_single =  is_archive() ? 'archive' : '';
					$archive_or_single =  is_single() ? 'single' : $archive_or_single;
					$templates = $archive_or_single . '-' . $post_type . '.php';
				}
			}
			$current_theme = EE_Config::get_current_theme();
			// loop thru templates
			foreach ( (array)$templates as $template ) {
				// then check the root of the uploads/espresso/templates/ folder
				if ( is_readable( EVENT_ESPRESSO_TEMPLATE_DIR . $template )) {
					$template_path = EVENT_ESPRESSO_TEMPLATE_DIR . $template; 
					break;
				// or check the uploads/espresso/templates/ folder for an EE theme template file
				} elseif ( is_readable( EVENT_ESPRESSO_TEMPLATE_DIR . $current_theme . DS . $template )) {
					$template_path = EVENT_ESPRESSO_TEMPLATE_DIR . $current_theme . DS . $template;
					break;
				// otherwise get it from our folder within the plugin
				} else if ( is_readable( EE_TEMPLATES . $current_theme . DS . $template )) {
					$template_path = EE_TEMPLATES . $current_theme . DS . $template;
					break;
				}
			}
		}
		// if we got it and you want to see it...
		if ( $template_path != '' && $load ) {
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
	 * @param  string $template_path  server path to the file to be loaded, including file name and extension
	 * @param  array $template_args an array of arguments to be extracted for use in the template
	 * @param  boolean $return_string whether to send output immediately to screen, or capture and return as a string
	 * @return void
	 */
	public static function display_template( $template_path = FALSE, $template_args = array(), $return_string = FALSE ) {
		//require the template validator for verifying variables are set according to how the template requires
		EE_Registry::instance()->load_helper( 'Template_Validator' );
		// you gimme nuttin - YOU GET NUTTIN !!
		if ( ! $template_path || ! is_readable( $template_path )) {
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
			include( $template_path );
			return ob_get_clean();
		} else {
			include( $template_path );
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