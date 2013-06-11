<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit('NO direct script access allowed'); }
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
 *
 * Espresso_Upcoming_Events_Widget
 *
 * Upcoming Events
 *
 * @package		Event Espresso
 * @subpackage	/templates/upcoming_events.widget.php
 * @author		Seth Shoultes, Brent Christensen
 *
 * ------------------------------------------------------------------------
 */	
if (!class_exists('Espresso_Upcoming_Events_Widget')) {
	class Espresso_Upcoming_Events_Widget extends WP_Widget {
		





		/**
		 * 	update - runs after submitting admin form
		 *
		 *  @access public
		 *  @param array $new_instance
		 *  @param array $old_instance
		 */
		function Espresso_Upcoming_Events_Widget() {
			$widget_options = array( 
				'classname' => 'events', 
				'description' => __('A widget for displaying your upcoming events.', 'events') 
			);
			$this->WP_Widget( 'events-widget', __('Upcoming Events', 'events'), $widget_options );
		}





		/**
		 * Displays the widget settings controls on the widget panel.
		 * Make use of the get_field_id() and get_field_name() function
		 * when creating your form elements. This handles the confusing stuff.
		 **/
		function form( $instance ) {

			/* Set up some default widget settings. */
			require_once( EE_CORE . 'admin/admin_helper.php' );

			$defaults = array( 
				'ee_wdgt_title' => __('Upcoming Events', 'events'),
				'ee_wdgt_cat_name' => '',
				'ee_wdgt_show_expired' => FALSE,
				'ee_wdgt_limit' => 5,
				'ee_wdgt_show_deleted' => FALSE,
				'ee_wdgt_bg_color' => '#21759B'
			);

			$instance = wp_parse_args( (array) $instance, $defaults );

			$values=array(
				array( 'id'=> TRUE, 'text'=> __('Yes','event_espresso')),
				array( 'id'=>FALSE, 'text'=> __('No','event_espresso'))
			);

		?>


		<p>
		  <label for="<?php echo $this->get_field_id( 'ee_wdgt_title' ); ?>"><?php _e('Title:', 'Upcoming Events'); ?></label>
		  <input id="<?php echo $this->get_field_id( 'ee_wdgt_title' ); ?>" name="<?php echo $this->get_field_name( 'ee_wdgt_title' ); ?>" value="<?php echo $instance['ee_wdgt_title']; ?>" type="text" />
		</p>

		<p> <label for="<?php echo $this->get_field_id( 'ee_wdgt_cat_name' ); ?>"><?php _e('Event Category:', 'event_espresso'); ?></label><br />
		 <?php echo espresso_db_dropdown( 'id', 'category_name', EVENTS_CATEGORY_TABLE, 'id', $instance['ee_wdgt_cat_name'], $strMethod="desc", $this->get_field_name( 'ee_wdgt_cat_name' )) ?>		
		</p>
		
		 <p>
			<label for="<?php echo $this->get_field_id( 'ee_wdgt_limit' ); ?>"><?php _e('Limit:', 'event_espresso'); ?></label>
			<input id="<?php echo $this->get_field_id( 'ee_wdgt_limit' ); ?>" name="<?php echo $this->get_field_name( 'ee_wdgt_limit' ); ?>" value="<?php echo $instance['ee_wdgt_limit']; ?>" size="3" type="text" />
		</p>

		<p><strong><?php _e('Optional Settings:', 'event_espresso'); ?></strong></p>
		 <p><?php _e('Show Expired Events?', 'event_espresso'); ?> <?php echo select_input($this->get_field_name( 'ee_wdgt_show_expired' ), $values, $instance['ee_wdgt_show_expired']);?></p>
		 <p><?php _e('Show Deleted Events?', 'event_espresso'); ?> <?php echo select_input($this->get_field_name( 'ee_wdgt_show_deleted' ), $values, $instance['ee_wdgt_show_deleted']);?></p>

		 <p>
			<label for="<?php echo $this->get_field_id( 'ee_wdgt_bg_color' ); ?>"><?php _e('Date Color:', 'event_espresso'); ?></label>
			<input id="<?php echo $this->get_field_id( 'ee_wdgt_bg_color' ); ?>" name="<?php echo $this->get_field_name( 'ee_wdgt_bg_color' ); ?>" value="<?php echo $instance['ee_wdgt_bg_color']; ?>" size="12" type="text" />
		</p>

		<?php
		}





		/**
		 * 	update - runs after submitting admin form
		 *
		 *  @access public
		 *  @param array $new_instance
		 *  @param array $old_instance
		 */
		function update( $new_instance, $old_instance ) {
			$instance = $old_instance;
			/* Strip tags for title and name to remove HTML (important for text inputs). */
			$instance['ee_wdgt_title'] = strip_tags( $new_instance['ee_wdgt_title'] );
			$instance['ee_wdgt_cat_name'] = $new_instance['ee_wdgt_cat_name'];
			$instance['ee_wdgt_show_expired'] = $new_instance['ee_wdgt_show_expired'];
			$instance['show_secondary'] = $new_instance['show_secondary'];
			$instance['ee_wdgt_show_deleted'] = $new_instance['ee_wdgt_show_deleted'];
			$instance['ee_wdgt_limit'] = $new_instance['ee_wdgt_limit'];
			$instance['ee_wdgt_bg_color'] = $new_instance['ee_wdgt_bg_color'];
			return $instance;
		}





		/**
		 * 	widget - frontend display
		 *
		 *  @access public
		 *  @param array $args
		 *  @param array $instance
		 */
		function widget( $args, $instance ) {

			// Our variables from the widget settings. 
			extract( $args );
			//printr( $args, '$args  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//			printr( $instance, '$instance  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

			global $wpdb, $org_options;
			require_once ( EE_HELPERS . 'EE_Formatter.helper.php' );
			require_once ( EE_HELPERS . 'EE_DTT_Helper.helper.php' );
			wp_register_style('espresso_widgets', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/css/espresso_widgets.css');
			wp_enqueue_style('espresso_widgets');

			$title = apply_filters('widget_title', $instance['ee_wdgt_title'] );
			$bg_color = isset( $instance['ee_wdgt_bg_color'] ) ? sanitize_text_field( $instance['ee_wdgt_bg_color'] ) : FALSE;
			$bg_color = $bg_color ? $bg_color : '';

			// Before widget (defined by themes). 
			echo $before_widget;

			// Display the widget title if one was input (before and after defined by themes).
			if ( $title ) {
				echo $before_title . $title . $after_title;
			}

			$has_category = ! empty( $instance['ee_wdgt_cat_name'] ) ?TRUE : FALSE;
			$event_page_id =$org_options['event_page_id'];
			
			$SQL = 'SELECT evt.*, dtt.* ';
			$SQL .= $has_category ? ", cat.* " : '';
			$SQL .= $has_category ? 'FROM ' . EVENTS_CATEGORY_TABLE . ' cat ' : '';
			$SQL .= $has_category ? 'JOIN ' . EVENTS_CATEGORY_REL_TABLE . ' ect ON ect.cat_id = cat.id ' : '';
			$SQL .= $has_category ? 'JOIN ' . EVENTS_DETAIL_TABLE . ' evt ON evt.id = ect.event_id ': 'FROM ' . EVENTS_DETAIL_TABLE . ' evt ';
			$SQL .= 'JOIN ' . ESP_DATETIME_TABLE . ' dtt ON evt.id = dtt.EVT_ID ';
			$SQL .= $has_category ? "WHERE cat.id = '" . $instance['ee_wdgt_cat_name'] . "' " : '';
			$SQL .= $has_category ? 'AND ' : 'WHERE ';
			$SQL .= 'evt.is_active = 1 ';
			$SQL .= 'AND dtt.DTT_is_primary = 1 ';
			// only show current events ?
			$SQL .= ! $instance['ee_wdgt_show_expired'] ? "AND ( " : '';
			$SQL .= ! $instance['ee_wdgt_show_expired'] ? "dtt.DTT_EVT_start >= '". EE_DTT_Helper::prepare_dtt_for_db() ."' " : '';
			$SQL .= ! $instance['ee_wdgt_show_expired'] ? "OR evt.event_status = 'O' " : '';
			$SQL .= ! $instance['ee_wdgt_show_expired'] ? "OR dtt.DTT_REG_end >= '". EE_DTT_Helper::prepare_dtt_for_db() ."' " : '';
			$SQL .= ! $instance['ee_wdgt_show_expired'] ? " ) " : '';
			
			$SQL .= ! $instance['ee_wdgt_show_deleted'] ? " AND evt.event_status != 'D' " : '';
			$SQL .= " ORDER BY dtt.DTT_EVT_start, evt.id ASC ";
			$SQL .= $instance['ee_wdgt_limit'] > 0 ? " LIMIT 0," . $instance['ee_wdgt_limit'] . " " : ' LIMIT 0,5 ';

			$events = $wpdb->get_results( $SQL );


			echo '
					<ul id="upcmng-evnt-wdgt-ul">';
					
			foreach ( $events as $event ) {

				$event_id = $event->id;
				$event_name = stripslashes_deep( $event->event_name );
				$start_date = $event->DTT_EVT_start;
				$category_name = isset( $event->category_name) ? $event->category_name : '';
				$category_desc =  isset( $event->category_desc ) ? $event->category_desc : '';
				$externalURL = $event->externalURL;
				$ext_url = add_query_arg( array( 'page_id'=>$event_page_id, 'e_reg'=>'register', 'event_id'=>$event_id, 'name_of_event'=>$event_name ), home_url() );
				$registration_url = $externalURL != '' ? $externalURL :  $ext_url;

				$event_city = isset ( $event->city ) && $event->city != '' ? $event->city . ', ' : '';
				$event_state = isset ( $event->state ) && $event->state != '' ? $event->state : '';
				
				//Here we can create messages based on the event status
				$status = event_espresso_get_is_active($event_id);
				$status_display = $status['display_custom'] . '<br />';
				$status_display_ongoing = $status['status'] == 'ONGOING' ? $status['display_custom'] . '<br />' : '';
				$status_display_deleted = $status['status'] == 'DELETED' ? $status['display_custom'] . '<br />' : '';
				$status_display_secondary = $status['status'] == 'SECONDARY' ? $status['display_custom'] . '<br />' : '';
				$status_display_reg_closed = $status['status'] == 'REGISTRATION_CLOSED' ? $status['display_custom'] . '<br />' : '';
				$status_display_not_open = $status['status'] == 'REGISTRATION_NOT_OPEN' ? $status['display_custom'] . '<br />' : '';
				$status_display_open = $status['status'] == 'REGISTRATION_OPEN' ? $status['display_custom'] . '<br />' : '';

				//You can also display a custom message. For example, this is a custom registration not open message:
				$status_display_custom_closed = $status['status'] == 'REGISTRATION_CLOSED'? '<span class="espresso_closed">'.__('Regsitration is Closed','event_espresso').'</span>' . '<br />' : '';

				if (!is_user_logged_in() && defined( 'EVENT_ESPRESSO_MEMBERS_DIR' ) && $member_only) {
					//Display a message if the user is not logged in.
					 //_e('Member Only Event. Please ','event_espresso') . event_espresso_user_login_link() . '.';
				} else {
					
					switch ($status['status']){
						case 'NOT_ACTIVE':
						//Don't show the event if any of the above are true
						break;

						default:
							?>
						<li class="upcmng-evnt-wdgt-li">
							<div class="upcmng-evnt-wdgt-date-dv">
								<div class="upcmng-evnt-wdgt-date-day-dv" style="background-color:<?php echo $bg_color;?>; border-color:<?php echo $bg_color;?>">
									<?php echo EE_Formatter::event_date_display( $start_date, 'M' )?>									
								</div>
								<div class="upcmng-evnt-wdgt-date-month-dv" style="border-color:<?php echo $bg_color;?>">
									<?php echo EE_Formatter::event_date_display( $start_date, ' j' )?>
								</div>
							</div>
							<div class="upcmng-evnt-wdgt-event-dv">
								<h6 class="upcmng-evnt-wdgt-hdr-link">
									<a href="<?php echo $registration_url;?>" style="color:<?php echo $bg_color;?>"><?php echo $event_name?></a>
								</h6>
								<p class="upcmng-evnt-wdgt-location"><?php echo $event_city . $event_state; ?></p>
								<?php /* These are custom messages that can be displayed based on the event status. Just comment the one you want to use. */?>
								<?php echo $status_display; //Turn this on to display the overall status of the event. ?>
								<?php //echo $status_display_ongoing; //Turn this on to display the ongoing message. ?>
								<?php //echo $status_display_deleted; //Turn this on to display the deleted message. ?>
								<?php //echo $status_display_secondary; //Turn this on to display the secondary message. ?>
								<?php //echo $status_display_reg_closed; //Turn this on to display the secondary message. ?>
								<?php //echo $status_display_not_open; //Turn this on to display the secondary message. ?>
								<?php //echo $status_display_open; //Turn this on to display the secondary message. ?>
								<?php //echo $status_display_custom_closed; //Turn this on to display the secondary message. ?>
							</div>
							<br class="clear"/>
						</li>
							<?php
						break;
					}
				}
			}
			
			echo '
					</ul>';
				
			echo $after_widget;
			
		}
		
		
	}
}