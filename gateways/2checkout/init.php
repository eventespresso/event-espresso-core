<?php
add_action('action_hook_espresso_display_offsite_payment_header','espresso_display_offsite_payment_header');
add_action('action_hook_espresso_display_offsite_payment_footer','espresso_display_offsite_payment_footer');
require_once($path . "/payment.php");
require_once($path . "/return.php");
add_filter('filter_hook_espresso_pretransaction_data_processing', 'espresso_prepare_payment_data_for_gateways');
add_filter('filter_hook_espresso_get_total_cost', 'espresso_get_total_cost');
add_action('action_hook_espresso_update_attendee_payment_data_in_db', 'espresso_update_attendee_payment_status_in_db');
add_filter('filter_hook_espresso_prepare_event_link', 'espresso_prepare_event_link');
add_action('action_hook_espresso_email_after_payment', 'espresso_email_after_payment');