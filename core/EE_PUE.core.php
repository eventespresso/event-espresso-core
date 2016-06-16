<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_PUE
 *
 * @package			Event Espresso
 * @subpackage	includes/core/
 * @author				Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_PUE {

	/**
	 * 	EE_Registry Object
	 *	@var 	object
	 * 	@access 	protected
	 */
	protected $EE = NULL;

	/**
	 * This property is used to hold an array of EE_default_term objects assigned to a custom post type when the post for that post type is published with no terms set for the taxonomy.
	  *
	 * @var array of EE_Default_Term objects
	 */
	protected $_default_terms = array();





	/**
	 *	class constructor
	 *
	 *	@access public
	 */
	public function __construct() {
//		throw new EE_Error('error');

		do_action( 'AHEE_log', __CLASS__, __FUNCTION__ );

		//wp have no MONTH_IN_SECONDS constant.  So we approximate our own assuming all months are 4 weeks long.
		if ( !defined('MONTH_IN_SECONDS' ) )
			define( 'MONTH_IN_SECONDS', WEEK_IN_SECONDS * 4 );

		if(EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance){
			$this->_uxip_hooks();
		}


		$ueip_optin = EE_Registry::instance()->CFG->core->ee_ueip_optin;
		$ueip_has_notified = EE_Registry::instance()->CFG->core->ee_ueip_has_notified;

		//has optin been selected for data collection?
		$espresso_data_optin = !empty($ueip_optin) ? $ueip_optin : NULL;

		if ( empty($ueip_has_notified) && EE_Maintenance_Mode::instance()->level() != EE_Maintenance_mode::level_2_complete_maintenance ) {
			add_action('admin_notices', array( $this, 'espresso_data_collection_optin_notice' ), 10 );
			add_action('admin_enqueue_scripts', array( $this, 'espresso_data_collection_enqueue_scripts' ), 10 );
			add_action('wp_ajax_espresso_data_optin', array( $this, 'espresso_data_optin_ajax_handler' ), 10 );
			update_option('ee_ueip_optin', 'yes');
			$espresso_data_optin = 'yes';
		}

		//let's prepare extra stats
		$extra_stats = array();

		//only collect extra stats if the plugin user has opted in.
		if ( !empty($espresso_data_optin) && $espresso_data_optin == 'yes' ) {
			//let's only setup extra data if transient has expired
			if ( false === ( $transient = get_transient('ee_extra_data') ) && EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance ) {

				$current_site = is_multisite() ? get_current_site() : NULL;
				$site_pre = ! is_main_site() && ! empty($current_site) ? trim( preg_replace('/\b\w\S\w\b/', '', $current_site->domain ), '.' ) . '_' : '';


				//active gateways
				$active_gateways = get_option('event_espresso_active_gateways');
				if ( !empty($active_gateways ) ) {
					foreach ( (array) $active_gateways as $gateway => $ignore ) {
						$extra_stats[$site_pre . $gateway . '_gateway_active'] = 1;
					}
				}

				if ( is_multisite() && is_main_site() ) {
					$extra_stats['is_multisite'] = true;
				}

				//what is the current active theme?
				$active_theme = get_option('uxip_ee_active_theme');
				if ( !empty( $active_theme ) )
					$extra_stats[$site_pre . 'active_theme'] = $active_theme;

				//event info regarding an all event count and all "active" event count
				$all_events_count = get_option('uxip_ee4_all_events_count');
				if ( !empty( $all_events_count ) )
					$extra_stats[$site_pre . 'ee4_all_events_count'] = $all_events_count;
				$active_events_count = get_option('uxip_ee4_active_events_count');
				if ( !empty( $active_events_count ) )
					$extra_stats[$site_pre . 'ee4_active_events_count'] = $active_events_count;

				//datetime stuff
				$dtt_count = get_option('uxip_ee_all_dtts_count');
				if ( !empty( $dtt_count ) )
					$extra_stats[$site_pre . 'all_dtts_count'] = $dtt_count;

				$dtt_sold = get_option('uxip_ee_dtt_sold');
				if ( !empty( $dtt_sold ) )
					$extra_stats[$site_pre . 'dtt_sold'] = $dtt_sold;

				//ticket stuff
				$all_tkt_count = get_option('uxip_ee_all_tkt_count');
				if ( !empty( $all_tkt_count ) )
					$extra_stats[$site_pre . 'all_tkt_count'] = $all_tkt_count;

				$free_tkt_count = get_option('uxip_ee_free_tkt_count');
				if ( !empty( $free_tkt_count ) )
					$extra_stats[$site_pre . 'free_tkt_count'] = $free_tkt_count;

				$paid_tkt_count = get_option('uxip_ee_paid_tkt_count');
				if ( !empty( $paid_tkt_count ) )
					$extra_stats[$site_pre . 'paid_tkt_count'] = $paid_tkt_count;

				$tkt_sold = get_option('uxip_ee_tkt_sold' );
				if ( !empty($tkt_sold) )
					$extra_stats[$site_pre . 'tkt_sold'] = $tkt_sold;

				//phpversion checking
				$extra_stats['phpversion'] = function_exists('phpversion') ? phpversion() : 'unknown';

				//set transient
				set_transient( 'ee_extra_data', $extra_stats, WEEK_IN_SECONDS );
			}
		}



		// PUE Auto Upgrades stuff
		if (is_readable(EE_THIRD_PARTY . 'pue/pue-client.php')) { //include the file
			require_once(EE_THIRD_PARTY . 'pue/pue-client.php' );

			$api_key = isset( EE_Registry::instance()->NET_CFG->core->site_license_key ) ? EE_Registry::instance()->NET_CFG->core->site_license_key : '';
			$host_server_url = 'https://eventespresso.com'; //this needs to be the host server where plugin update engine is installed. Note, if you leave this blank then it is assumed the WordPress repo will be used and we'll just check there.

			//Note: PUE uses a simple preg_match to determine what type is currently installed based on version number.  So it's important that you use a key for the version type that is unique and not found in another key.
			//For example:
			//$plugin_slug['premium']['p'] = 'some-premium-slug';
			//$plugin_slug['prerelease']['pr'] = 'some-pre-release-slug';
			//The above would not work because "p" is found in both keys for the version type. ( i.e 1.0.p vs 1.0.pr ) so doing something like:
			//$plugin_slug['premium']['p'] = 'some-premium-slug';
			//$plugin_slug['prerelease']['b'] = 'some-pre-release-slug';
			//..WOULD work!
			$plugin_slug = array(
				'free' => array( 'decaf' => 'event-espresso-core-decaf' ),
				'premium' => array( 'p' => 'event-espresso-core-reg' ),
				'prerelease' => array( 'beta' => 'event-espresso-core-pr' )
				);


			//$options needs to be an array with the included keys as listed.
			$options = array(
			//	'optionName' => '', //(optional) - used as the reference for saving update information in the clients options table.  Will be automatically set if left blank.
				'apikey' => $api_key, //(required), you will need to obtain the apikey that the client gets from your site and then saves in their sites options table (see 'getting an api-key' below)
				'lang_domain' => 'event_espresso', //(optional) - put here whatever reference you are using for the localization of your plugin (if it's localized).  That way strings in this file will be included in the translation for your plugin.
				'checkPeriod' => '24', //(optional) - use this parameter to indicate how often you want the client's install to ping your server for update checks.  The integer indicates hours.  If you don't include this parameter it will default to 12 hours.
				'option_key' => 'site_license_key', //this is what is used to reference the api_key in your plugin options.  PUE uses this to trigger updating your information message whenever this option_key is modified.
				'options_page_slug' => 'espresso_general_settings',
				'plugin_basename' => EE_PLUGIN_BASENAME,
				'use_wp_update' => true, //if TRUE then you want FREE versions of the plugin to be updated from WP
				'extra_stats' => $extra_stats,
				'turn_on_notices_saved' => true
			);
			$check_for_updates = new PluginUpdateEngineChecker($host_server_url, $plugin_slug, $options); //initiate the class and start the plugin update engine!
		}
	}



	/**
	 * The purpose of this function is to display information about Event Espresso data collection and a optin selection for extra data collecting by users.
	 * @return string html.
	 */
	 public static function espresso_data_collection_optin_text( $extra = TRUE ) {
	 	if ( ! $extra ) {
			 echo '<h2 class="ee-admin-settings-hdr" '. (!$extra ? 'id="UXIP_settings"' : '').'>'.__('User eXperience Improvement Program (UXIP)', 'event_espresso').EEH_Template::get_help_tab_link('organization_logo_info').'</h2>';
			 echo sprintf( __('%sPlease help us make Event Espresso better and vote for your favorite features.%s The %sUser eXperience Improvement Program (UXIP)%s, has been created so when you use Event Espresso you are voting for the features and settings that are important to you. The UXIP helps us understand how you use our products and services, track problems and in what context. If you opt-out of the UXIP you essentially elect for us to disregard how you use Event Espresso as we build new features and make changes. Participation in the program is completely voluntary but it is enabled by default. The end results of the UXIP are software improvements to better meet your needs. The data we collect will never be sold, traded, or misused in any way. %sPlease see our %sPrivacy Policy%s for more information.', 'event_espresso'), '<p><em>', '</em></p>','<a href="http://eventespresso.com/about/user-experience-improvement-program-uxip/" target="_blank">','</a>','<br><br>','<a href="http://eventespresso.com/about/privacy-policy/" target="_blank">','</a>' );
		} else {
			$settings_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action' => 'default'), admin_url( 'admin.php?page=espresso_general_settings') );
			$settings_url .= '#UXIP_settings';
			echo sprintf( __( 'The Event Espresso UXIP feature is active on your site. For %smore info%s and to opt-out %sclick here%s.', 'event_espresso' ), '<a href="http://eventespresso.com/about/user-experience-improvement-program-uxip/" traget="_blank">', '</a>', '<a href="' . $settings_url . '" target="_blank">', '</a>' );
		}
	}




	function espresso_data_collection_optin_notice() {
		$ueip_has_notified = EE_Registry::instance()->CFG->core->ee_ueip_has_notified;
		if ( $ueip_has_notified ) return;
		$settings_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action' => 'default'), admin_url( 'admin.php?page=espresso_general_settings') );
		$settings_url = $settings_url . '#UXIP_settings';
		?>
		<div class="updated data-collect-optin" id="espresso-data-collect-optin-container">
			<div id="data-collect-optin-options-container">
				<span class="dashicons dashicons-admin-site"></span>
				<span class="data-optin-text"><?php echo EE_PUE::espresso_data_collection_optin_text(); ?></span>
				<span style="display: none" id="data-optin-nonce"><?php echo wp_create_nonce('ee-data-optin'); ?></span>
				<button class="button-secondary data-optin-button" value="no"><?php _e('Dismiss', 'event_espresso'); ?></button>
				<!--<button class="button-primary data-optin-button" value="yes"><?php _e('Yes! I\'m In', 'event_espresso'); ?></button>-->
				<div style="clear:both"></div>
			</div>
		</div>
		<?php
	}



	/**
	 * enqueue scripts/styles needed for data collection optin
	 * @return void
	 */
	function espresso_data_collection_enqueue_scripts() {
		wp_register_script( 'ee-data-optin-js', EE_GLOBAL_ASSETS_URL . 'scripts/ee-data-optin.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE );
		wp_register_style( 'ee-data-optin-css', EE_GLOBAL_ASSETS_URL . 'css/ee-data-optin.css', array(), EVENT_ESPRESSO_VERSION );

		wp_enqueue_script('ee-data-optin-js');
		wp_enqueue_style('ee-data-optin-css');
	}



	/**
	 * This just handles the setting of the selected option for data optin via ajax
	 * @return void
	 */
	function espresso_data_optin_ajax_handler() {

		//verify nonce
		if ( isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'ee-data-optin') ) exit();

		//made it here so let's save the selection
		$ueip_optin = isset( $_POST['selection'] ) ? $_POST['selection'] : 'no';

		//update_option('ee_ueip_optin', $ueip_optin);
		EE_Registry::instance()->CFG->core->ee_ueip_has_notified = 1;
		EE_Registry::instance()->CFG->update_espresso_config( FALSE, FALSE );
		exit();
	}



	/**
	 * This is a handy helper method for retrieving whether there is an update available for the given plugin.
	 * @param  string  $basename Use the equivalent reulst from plugin_basename() for this param as WP uses that to identify plugins. Defaults to core update
	 * @return boolean           True if update available, false if not.
	 */
	public static function is_update_available($basename = '') {

		$basename = ! empty( $basename ) ? $basename : EE_PLUGIN_BASENAME;

		$update = false;

		$folder = DS . dirname($basename); // should take "event-espresso-core/espresso.php" and change to "/event-espresso-core"

		$plugins = get_plugins($folder);
		$current = get_site_transient( 'update_plugins' );

		foreach ( (array) $plugins as $plugin_file => $plugin_data ) {
			if ( isset( $current->response['plugin_file'] ) )
				$update = true;
		}

		//it's possible that there is an update but an invalid site-license-key is in use
		if ( get_site_option('pue_json_error_' . $basename ) )
			$update = true;

		return $update;
	}


	/**
	 * UXIP TRACKING *******
	 */


	/**
	 * This method contains all the hooks into EE for gathering stats that will be reported with the PUE uxip system
	 * @public
	 * @return void
	 */
	public function _uxip_hooks() {
		if ( EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance ) {
			add_action('admin_init', array( $this, 'track_active_theme' ) );
			add_action('admin_init', array( $this, 'track_event_info' ) );
		}
	}




	public function track_active_theme() {
		//we only check this once a month.
		if ( false === ( $transient = get_transient( 'ee_active_theme_check' ) ) ) {
			$theme = wp_get_theme();
			update_option('uxip_ee_active_theme', $theme->get('Name') );
			set_transient('ee_active_theme_check', 1, MONTH_IN_SECONDS );
		}
	}


	public function track_event_info() {
		//we only check this once every couple weeks.
		if ( false === ( $transient = get_transient( 'ee4_event_info_check') ) ) {
			//first let's get the number for ALL events
			$EVT = EE_Registry::instance()->load_model('Event');
			$DTT = EE_Registry::instance()->load_model('Datetime');
			$TKT = EE_Registry::instance()->load_model('Ticket');
			$count = $EVT->count();
			if ( $count > 0 )
				update_option('uxip_ee4_all_events_count', $count);

			//next let's just get the number of ACTIVE events
			$count_active = $EVT->get_active_events(array(), TRUE);
			if ( $count_active > 0 )
				update_option('uxip_ee4_active_events_count', $count_active);

			//datetimes!
			$dtt_count = $DTT->count();
			if ( $dtt_count > 0 )
				update_option( 'uxip_ee_all_dtts_count', $dtt_count );


			//dttsold
			$dtt_sold = $DTT->sum(array(), 'DTT_sold');
			if ( $dtt_sold > 0 )
				update_option( 'uxip_ee_dtt_sold', $dtt_sold );

			//allticketcount
			$all_tkt_count = $TKT->count();
			if ( $all_tkt_count > 0 )
				update_option( 'uxip_ee_all_tkt_count', $all_tkt_count );

			//freetktcount
			$_where = array( 'TKT_price' => 0 );
			$free_tkt_count = $TKT->count(array($_where));
			if ( $free_tkt_count > 0 )
				update_option( 'uxip_ee_free_tkt_count', $free_tkt_count );

			//paidtktcount
			$_where = array( 'TKT_price' => array('>', 0) );
			$paid_tkt_count = $TKT->count( array( $_where ) );
			if ( $paid_tkt_count > 0 )
				update_option( 'uxip_ee_paid_tkt_count', $paid_tkt_count );

			//tktsold
			$tkt_sold = $TKT->sum( array(), 'TKT_sold' );
			if( $tkt_sold > 0 )
				update_option( 'uxip_ee_tkt_sold', $tkt_sold );


			set_transient( 'ee4_event_info_check', 1, WEEK_IN_SECONDS * 2 );
		}
	}

}
// End of file EE_PUE.core.php
// Location: ./core/EE_PUE.core.php
