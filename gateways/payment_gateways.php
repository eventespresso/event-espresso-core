<?php

function before_gateways() {
    $before_gateways = '<div id="event_reg_theme" class="wrap"><div id="icon-options-event" class="icon32"></div>';
    $before_gateways .= '<h2>' . __('Manage Payment Gateways', 'event_espresso') . '</h2>';
    $before_gateways .= '<div id="poststuff" class="metabox-holder has-right-sidebar">';
    $before_gateways .= event_espresso_get_right_column();
    $before_gateways .= '<div id="post-body"><div id="post-body-content"><div class="meta-box-sortables ui-sortables">';
    return $before_gateways;
}

function after_gateways() {
    $output = '';
    global $espresso_premium;
    if ($espresso_premium != true)
        $output .= '<h2>' . __('Need more payment options?', 'event_espresso') . ' <a href="http://eventespresso.com/download/" target="_blank">' . __('Upgrade Now!', 'event_espresso') . '</a></h2>';
    $output .= '</div><!-- / .meta-box-sortables --></div><!-- / #post-body-content --></div><!-- / #post-body --></div><!-- / #poststuff --></div><!-- / #wrap -->';
    $output .= '<div id="button_image" style="display:none"><h2>' . __('Button Image URL', 'event_espresso') . '</h2>';
			$output .= '<p>' . __('A default payment button is provided. A custom payment button may be used, choose your image or upload a new one, and just copy the "file url" here (optional.)', 'event_espresso') . '</p>';
    $output .= '</div><div id="bypass_confirmation" style="display:none">';
    $output .= '<h2>' . __('By-passing the Confirmation Page', 'event_espresso') . '</h2>';
    $output .= '<p>' . __('This will allow you to send your customers directly to the payment gateway of your choice.', 'event_espresso') . '</p></div>';
    $output .= '<script type="text/javascript" charset="utf-8">
        //<![CDATA[
         jQuery(document).ready(function() {
          postboxes.add_postbox_toggles("payment_gateways");
          }); 
        //]]>
        </script>';    
			return $output;
}

//This is the payment gateway settings page.
function event_espresso_gateways_options() {
    global $wpdb;
    echo before_gateways();
    $gateways = array();
	$gateways[] = 'check';
	$gateways[] = 'bank';
	$gateways[] = 'invoice';
	$gateways[] = 'authnet';
	$gateways[] = 'aim';
	$gateways[] = 'firstdata';
	$gateways[] = 'ideal';
	$gateways[] = 'paypal';
	$gateways[] = 'paypal_pro';
	$gateways[] = 'eway';
	$gateways[] = 'mwarrior';
	$gateways[] = '2checkout';
	$gateways[] = 'paytrace';
    foreach ($gateways as $gateway) {
        $func 			= 'event_espresso_' . $gateway . '_payment_settings';
        $fallback_func 	= 'event_espresso_' . $gateway . '_settings';
        $fallback_func2 = 'event_espresso_' . $gateway . '_deposit_settings';
        $fallback_func3 = 'event_espresso_authnet_' . $gateway . '_settings';
        if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/" . $gateway . "/settings.php")) {
            require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/" . $gateway . "/settings.php");
            if(function_exists($func)) $func();
            elseif(function_exists($fallback_func)) $fallback_func();
            elseif(function_exists($fallback_func2)) $fallback_func2();
            elseif(function_exists($fallback_func3)) $fallback_func3();
        } elseif
        (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/" . $gateway . "/settings.php")) {
            require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/" . $gateway . "/settings.php");
            if(function_exists($func)) $func();
            elseif(function_exists($fallback_func)) $fallback_func();
            elseif(function_exists($fallback_func2)) $fallback_func2();
            elseif(function_exists($fallback_func3)) $fallback_func3();
        }
    }

    //requires and empty alipay_active.php file in the gateways/alipay OR
    //if you have moved the gateway files, place it in uploads/espresso/gateways
    if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/alipay_active.php") || file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/alipay/alipay_active.php")) {
        if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/settings.php")) {
            require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/settings.php");
            event_espresso_alipay_settings();
        } elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/alipay/settings.php")) {
            require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/alipay/settings.php");
            event_espresso_alipay_settings();
        }
    }
	if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH.'includes/admin-files/gateway_developer.php')){
		require_once(EVENT_ESPRESSO_PLUGINFULLPATH.'includes/admin-files/gateway_developer.php');
	}
    echo after_gateways();
}
