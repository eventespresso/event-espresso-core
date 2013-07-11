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
 * EEH_Migration Helper
 *
 * @package			Event Espresso
 * @subpackage	/helpers/
 * @author				Seth Shoultes, Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EEH_Migration {


	/**
	 * 	This function updates the org_options from < EE 4.0
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function espresso_fix_org_options() {
		global $org_options, $espresso_wp_user;
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		if (empty($org_options))
			return;

		//Retrive the existing $org_options, update, then unset the old one
		if (array_key_exists('display_description_on_multi_reg_page', $org_options)) {
			$org_options['template_settings']['display_description_on_multi_reg_page'] = empty($org_options['display_description_on_multi_reg_page']) ? false : $org_options['display_description_on_multi_reg_page'];
			unset($org_options['display_description_on_multi_reg_page']);
		}

		if (array_key_exists('display_short_description_in_event_list', $org_options)) {
			$org_options['template_settings']['display_short_description_in_event_list'] = empty($org_options['display_short_description_in_event_list']) ? false : $org_options['display_short_description_in_event_list'];
			unset($org_options['display_short_description_in_event_list']);
		}

		if (array_key_exists('display_address_in_event_list', $org_options)) {
			$org_options['template_settings']['display_address_in_event_list'] = empty($org_options['display_address_in_event_list']) ? false : $org_options['display_address_in_event_list'];
			unset($org_options['display_address_in_event_list']);
		}

		if (array_key_exists('display_address_in_regform', $org_options)) {
			$org_options['template_settings']['display_address_in_regform'] = empty($org_options['display_address_in_regform']) ? false : $org_options['display_address_in_regform'];
			unset($org_options['display_address_in_regform']);
		}

		if (array_key_exists('use_custom_post_types', $org_options)) {
			$org_options['template_settings']['use_custom_post_types'] = empty($org_options['use_custom_post_types']) ? false : true;
			unset($org_options['use_custom_post_types']);
		}

		if (array_key_exists('enable_default_style', $org_options)) {
			$org_options['style_settings']['enable_default_style'] = empty($org_options['enable_default_style']) ? false : $org_options['enable_default_style'];
			unset($org_options['enable_default_style']);
		}

		if (array_key_exists('selected_style', $org_options)) {
			$org_options['style_settings']['selected_style'] = empty($org_options['selected_style']) ? '' : $org_options['selected_style'];
			unset($org_options['selected_style']);
		}

		if (array_key_exists('style_color', $org_options)) {
			$org_options['style_settings']['style_color'] = empty($org_options['style_color']) ? '' : $org_options['style_color'];
			unset($org_options['style_color']);
		}

		$org_options['default_mail'] = $org_options['default_mail'] || $org_options['default_mail'] == 'Y' ? true : false;
		$org_options['expire_on_registration_end'] = $org_options['expire_on_registration_end'] || $org_options['expire_on_registration_end'] == 'Y' ? true : false;
		$org_options['enable_default_style'] = $org_options['enable_default_style'] || $org_options['enable_default_style'] == 'Y' ? true : false;
		$org_options['event_ssl_active'] = $org_options['event_ssl_active'] || $org_options['event_ssl_active'] == 'Y' ? true : false;
		$org_options['use_venue_manager'] = $org_options['use_venue_manager'] || $org_options['use_venue_manager'] == 'Y' ? true : false;
		$org_options['show_reg_footer'] = $org_options['show_reg_footer'] || $org_options['show_reg_footer'] == 'Y' ? true : false;
		$org_options['template_settings']['use_custom_post_types'] = $org_options['template_settings']['use_custom_post_types'] || $org_options['template_settings']['use_custom_post_types'] == 'Y' ? true : false;
		$org_options['template_settings']['display_address_in_regform'] = $org_options['template_settings']['display_address_in_regform'] || $org_options['template_settings']['display_address_in_regform'] == 'Y' ? true : false;
		$org_options['template_settings']['display_short_description_in_event_list'] = $org_options['template_settings']['display_short_description_in_event_list'] || $org_options['template_settings']['display_short_description_in_event_list'] == 'Y' ? true : false;
		$org_options['template_settings']['display_address_in_event_list'] = $org_options['template_settings']['display_address_in_event_list'] || $org_options['template_settings']['display_address_in_event_list'] == 'Y' ? true : false;
		$org_options['template_settings']['display_description_on_multi_reg_page'] = $org_options['template_settings']['display_description_on_multi_reg_page'] || $org_options['template_settings']['display_description_on_multi_reg_page'] == 'Y' ? true : false;
		$org_options['template_settings']['display_description_in_event_list'] = $org_options['template_settings']['display_description_in_event_list'] || $org_options['template_settings']['display_description_in_event_list'] == 'Y' ? true : false;
		$org_options['template_settings']['use_custom_templates'] = $org_options['template_settings']['use_custom_templates'] || $org_options['template_settings']['use_custom_templates'] == 'Y' ? true : false;
		$org_options['map_settings']['ee_map_nav_display_single'] = $org_options['map_settings']['ee_map_nav_display_single'] || $org_options['map_settings']['ee_map_nav_display_single'] == 'Y' ? true : false;
		$org_options['map_settings']['ee_map_nav_display'] = $org_options['map_settings']['ee_map_nav_display'] || $org_options['map_settings']['ee_map_nav_display'] == 'Y' ? true : false;

		update_user_meta($espresso_wp_user, 'events_organization_settings', $org_options);
	}

	
}
// End of file EEH_Migration.helper.php
// Location: /helpers/EEH_Migration.helper.php