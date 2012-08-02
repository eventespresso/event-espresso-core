<?php

abstract class EE_Offsite_Gateway extends EE_Gateway {
	abstract public function espresso_process_off_site_payment();
	
	protected function __construct(EEM_Gateways &$model) {
		parent::__construct($model);
	}
	
	protected function _update_actions() {
		parent::_update_actions();
		if ($this->_selected) {
			if (!has_action('action_hook_espresso_process_off_site_payment', array(&$this, 'espresso_process_off_site_payment'))) {
				add_action('action_hook_espresso_process_off_site_payment', array(&$this, 'espresso_process_off_site_payment'));
			}
		} else {
			if (has_action('action_hook_espresso_process_off_site_payment', array(&$this, 'espresso_process_off_site_payment'))) {
				remove_action('action_hook_espresso_process_off_site_payment', array(&$this, 'espresso_process_off_site_payment'));
			}
		}
	}
}