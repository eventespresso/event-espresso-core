<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');
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
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EE_PMT_Admin_Only.
 * These payment methods really shouldn't be shown on frontend and contain nearly no functionality.
 * They should just be used admin-side for recording payments like Cash, Check, etc.
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_PMT_Admin_Only extends EE_PMT_Base{
	public function __construct($pm_instance = NULL) {
		$this->_pretty_name = __("Admin Only", 'event_espresso');
		parent::__construct($pm_instance);
	}
	public function generate_new_billing_form() {
		return NULL;
	}

	public function generate_new_settings_form() {
		return new EE_Payment_Method_Form();
	}
}
// End of file EE_PMT_Admin_Only.pm.php