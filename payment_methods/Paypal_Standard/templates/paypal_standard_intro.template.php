<?php 
$closing_tag = '</a>';
//if this is decaf, which is put on WordPress.org, we need to inform users that
//we just put an affiliate link there. See https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/ section 12
if( apply_filters( 'FHEE__ee_show_affiliate_links', true ) ) {
	$closing_tag .= esc_html__( ' (affiliate link)', 'event_espresso' );
}
printf( esc_html__('PayPal Standard (PayPal Payments Standard) is an off-site payment method and is available to event organizers in many countries. A PayPal premier or business account is needed to accept payments. Need a PayPal account? Call 1-855-456-1338 or %1$sclick here to sign up for a merchant account%2$s.', 'event_espresso'), '<a href="https://eventespresso.com/go/paypalstandard/" target="_blank">', $closing_tag );