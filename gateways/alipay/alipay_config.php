<?php


$partner		=   $alipay_settings['alipay_partner_id'];//fill with the partnerID which we already offered you (required fields)
$security_code  =   $alipay_settings['alipay_security_code'];//fill with the security key which we already offered you (required fields)
 
$_input_charset =   "utf-8";
$sign_type	  =   "MD5";
$transport	  =   "http";
//$notify_url	 =   site_url().'/?page_id='.$org_options['notify_url'].'&id='.$attendee_id.'&event_id='.$event_id.'&attendee_action=post_payment&form_action=payment';
$notify_url	 =   WP_PLUGIN_URL.'/event-espresso/gateways/alipay/notify_url.php';
$return_url	 =   site_url().'/?page_id='.$org_options['return_url'] . '&registration_id=' .  $registration_id;


?>