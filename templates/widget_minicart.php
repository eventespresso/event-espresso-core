<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/*
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link						http://www.eventespresso.com
 * @ version		 	3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Espresso_Minicart class
 *
 * @package				Event Espresso
 * @subpackage		templates
 * @author					Brent Christensen
 *
 * ------------------------------------------------------------------------
 */

// use widgets_init action hook to execute register function
add_action( 'widgets_init', 'espresso_minicart_widget_register' );

function espresso_minicart_widget_register() {
	//register widget
	register_widget( 'Espresso_Minicart' );
}


class Espresso_Minicart extends WP_Widget {

	//  EE_Cart object passed by reference
	var $mini = NULL;

	function espresso_minicart() {

		global $EE_Session;
		global $EE_Cart;

		// if cart ( and sessions ) is not instantiated
		if ( ! defined( ESPRESSO_CART )) {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_Cart.class.php');
			$EE_Cart = EE_Cart::instance();
		}
		$this->mini = $EE_Cart;

		$widget_options = array(
																					'classname' => 'espresso-mini-cart',
																					'description' => __('A widget for displaying Event Espresso regsitrations and purchases.', 'events')
																				);
		$this->WP_Widget( 'espresso_minicart', 'Event Espresso Mini Cart Widget', $widget_options );

	}

	//build the widget settings form
	function form( $instance ) {

		$defaults = array( 'title' => 'Registration Information', 'template' => 'widget_minicart' );

		$instance = wp_parse_args( (array) $instance, $defaults );

		echo '
	<p>' . __('Mini Cart Title:', 'events') . '
		<input id="'.$this->get_field_id('title').'" class="widefat" name="'.$this->get_field_name('title').'"  type="text" value="'.esc_attr( $instance['title'] ).'" />
	</p>
	<p>' . __('Display content for the following carts:', 'events') . '

	<ul>';

		foreach ( $this->mini->cart as $cart_type => $cart_contents ) {

			$label = isset( $cart_contents['title'] ) ? $cart_contents['title'] : $cart_type ;
			$chk = 'display-'.$cart_type.'-chk';
			$txt = 'cart-name-'.$cart_type.'-txt';

		echo '
		<li>
			<label>
				<input  type="checkbox"
					id="' . $this->get_field_id( $chk ) . '"
					class="checkbox"
					name="' . $this->get_field_name( $chk ) . '"
					value="' . $cart_type . '"
					' . checked( $instance[$chk], $cart_type, FALSE ) . '/>
				' . __($label, 'events') . '
			</label>
		</li>
		<li>
			<label>Custom Title:
				<input id="'.$this->get_field_id($txt).'" class="widefat" name="'.$this->get_field_name($txt).'"  type="text" value="'.esc_attr( $instance[$txt] ).'" />
			</label>
		</li>
';
		}

		$default_templates = glob( EVENT_ESPRESSO_PLUGINFULLPATH.'templates/widget_minicart*.template.php' );
		$custom_templates = glob( EVENT_ESPRESSO_TEMPLATE_DIR.'widget_minicart*.template.php' );

		$minicart_templates = array_merge( $default_templates, $custom_templates );
		rsort( $minicart_templates, SORT_STRING );

		$find = array ( EVENT_ESPRESSO_PLUGINFULLPATH.'templates/widget', EVENT_ESPRESSO_TEMPLATE_DIR.'widget', '.template.php', '-', '_' );
		$replace = array( '', '', '', ' ', ' ' );

		echo '
	</ul>
	</p>
	<p>' . __('Mini Cart Template:', 'events') . '
		<select name="'.$this->get_field_name( 'template' ).'">';

		foreach ( $minicart_templates as $minicart_template ) {

			$template = str_replace( $find, $replace, $minicart_template );

			echo "\n\t\t\t".'<option value="'.$minicart_template.'" '.selected( $instance['template'], $minicart_template ).'>'.$template.'&nbsp;&nbsp;&nbsp;</option>';

		}

		echo '
		</select>
	</p>
';
	}

	//save the widget settings
	function update( $new_instance, $old_instance ) {

		$instance = $old_instance;
		$instance['title'] = strip_tags( $new_instance['title'] );

		foreach ( $this->mini->cart as $cart_type => $cart_contents ) {

			$chk = 'display-'.$cart_type.'-chk';
			$instance[$chk] = strip_tags( $new_instance[$chk] );

			$txt = 'cart-name-'.$cart_type.'-txt';
			$instance[$txt] = strip_tags( $new_instance[$txt] );

		}

		$instance['template'] = strip_tags( $new_instance['template'] );

		return $instance;
	}



	//display the widget
	function widget( $args, $instance ) {

		extract($args);

		$template_args = array();
		$mini_cart = array();

		global $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$template_args['currency_symbol'] = $org_options[ 'currency_symbol' ];

		$template_args['before_widget'] = $before_widget;
		$template_args['after_widget'] = $after_widget;

		$template_args['title'] = $before_title . apply_filters( 'widget_title', $instance['title'] ) . $after_title;

		$grand_total = 0;
		$total_items = 0;

		foreach ( $this->mini->cart as $cart_type => $cart_contents ) {

			$chk = 'display-'.$cart_type.'-chk';
			$txt = 'cart-name-'.$cart_type.'-txt';

			if ( $instance[$chk] == $cart_type ) {

				if ( isset( $instance[$txt] ) && $instance[$txt] != '' ) {
					$cart_title = $instance[$txt];
				} elseif ( isset( $cart_contents['title'] ) && $cart_contents['title'] != '' ) {
					$cart_title = __($cart_contents['title'], 'events');
				} else {
					$cart_title = '';
				}

				$mini_cart[$cart_type]['title'] = $cart_title;

				if ( $cart_contents['total_items'] !== 0 ) {

					$mini_cart[$cart_type]['has_items'] = TRUE;

					foreach ( $cart_contents['items'] as $item ) {

						$mini_cart[$cart_type]['items'][ $item['line_item'] ]['name'] = $item['name'];
						$mini_cart[$cart_type]['items'][ $item['line_item'] ]['price'] = number_format( $item['price'], 2, '.', '' );
						$mini_cart[$cart_type]['items'][ $item['line_item'] ]['qty'] = $item['qty'];
						$mini_cart[$cart_type]['items'][ $item['line_item'] ]['line_total'] = number_format( $item['line_total'], 2, '.', '' );

					}

					$mini_cart[$cart_type]['total_items'] = $cart_contents['total_items'];
					$mini_cart[$cart_type]['sub_total'] = number_format( $cart_contents['sub_total'], 2, '.', '' );

				} else {
					// empty
					$mini_cart[$cart_type]['has_items'] = FALSE;
					$mini_cart[$cart_type]['empty_msg'] = $cart_contents['empty_msg'];
				}

				$total_items = $total_items + $cart_contents['total_items'];
				$grand_total = $grand_total + $cart_contents['sub_total'];

			}
		}

		$template_args['total_items'] = $total_items;
		$template_args['grand_total'] = number_format( $grand_total, 2, '.', '' );
		$template_args['mini_cart'] = $mini_cart;

		$this->display_template( $instance['template'], $template_args );

	}



	function display_template( $path_to_file = FALSE, $template_args ) {

		if ( ! $path_to_file ) {
			return FALSE;
		}

		extract($template_args);
		$view_template = file_get_contents( $path_to_file );

		// check if short tags is on cuz eval chokes if not presented the correct tag type
		$php_short_tags_on = (bool) ini_get('short_open_tag');

		if ( $php_short_tags_on ) {
			eval( "?> $view_template <? " );
		} else {
			// don't forget the space after php
			eval( "?> $view_template <?php " );
		}

	}


}

