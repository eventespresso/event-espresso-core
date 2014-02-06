<?php
/* ------------------------------------------------------------------------
 *
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
 * Espresso_Calendar_Widget
 * Displays a month-based espresso_calendar in the sidebar
 *
 * @package			Event Espresso
 * @subpackage	espresso-calendar
 * @author				Chris Reynolds 
 * @since 2.0
 *
 * ------------------------------------------------------------------------
 */
class Espresso_Calendar_Widget extends WP_Widget {



	public function espresso_calendar_widget() {
		/* Widget settings. */
		$widget_options = array('classname' => 'espresso_calendar_widget', 'description' => 'Displays the Espresso Calendar in a widget.');
		/* Widget control settings. */
		$control_options = array('width' => 300, 'height' => 350, 'id_base' => 'espresso-calendar-widget');
		/* Create the widget. */
		$this->WP_Widget('espresso-calendar-widget', 'Event Espresso Calendar Widget', $widget_options, $control_options);
	}



	public function widget($args, $instance) {

		extract($args);

		/* User-selected settings. */
		$title = apply_filters('widget_title', $instance['title']);

		// get the current post
		global $post;
		if ( isset( $post->post_content )) {
			 // check the post content for the short code
			 if ( strpos( $post->post_content, '[ESPRESSO_CALENDAR') === FALSE ) {
				// Before widget (defined by themes).
				echo $before_widget;
				// Title of widget (before and after defined by themes).
				if ( $title ) {
					echo $before_title . $title . $after_title;
				}
				
				$attributes = array( 
					'event_category_id' => $instance['category_id'], 
					'show_expired' => $instance['show_expired'], 
					'cal_view' => 'month',
					'widget' => TRUE,
					'header_left' => 'prev',
					'header_center' => 'title',
					'header_right' =>'next',
					'titleFormat_month' => 'MMM yyyy'
				);

				// get calendar options
				$calendar_settings = EE_Config::instance()->addons['calendar'];
				/* @var $calendar_settings EE_Calendar_Config */
				if (  $calendar_settings->tooltip->show ) {
					wp_enqueue_style('qtip');
					wp_enqueue_script('jquery-qtip');
				}
				wp_enqueue_style('fullcalendar');
				wp_enqueue_style('espresso_calendar');
				wp_enqueue_script('espresso_calendar');	

				echo EE_Calendar::instance()->espresso_calendar( $attributes );

				// After widget (defined by themes).
				echo $after_widget;
			}
		}
	}



	public function update($new_instance, $old_instance) {
		$instance = $old_instance;
		// Strip tags (if needed) and update the widget settings.
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['show_expired'] = strip_tags($new_instance['show_expired']);
		$instance['category_id'] = strip_tags($new_instance['category_id']);

		return $instance;
	}



	public function form($instance) {

		// Set up some default widget settings.
		$defaults = array('title' => 'Calendar', 'show_expired' => false, 'category_id' => '', 'calendar_page' => '');
		$instance = wp_parse_args((array) $instance, $defaults);

		$values = array(
				array('id' => false, 'text' => __('No', 'event_espresso')),
				array('id' => true, 'text' => __('Yes', 'event_espresso')));
		?>

		<p>
			<label for="<?php echo $this->get_field_id('title'); ?>">
				<?php _e('Title:', 'event_espresso'); ?>
			</label>
			<input type="text" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" width="20" value="<?php echo $instance['title']; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('show_expired'); ?>">
				<?php _e('Display Expired Events?', 'event_espresso'); ?>
			</label>
			<?php echo select_input($this->get_field_name('show_expired'), $values, $instance['show_expired']); ?> </p>
		<p>
			<label for="<?php echo $this->get_field_id('category_id'); ?>">
				<?php _e('Single Category Name (optional)', 'event_espresso'); ?>
			</label>
			<input type="text" id="<?php echo $this->get_field_id('category_id'); ?>" name="<?php echo $this->get_field_name('category_id'); ?>" width="20" value="<?php echo $instance['category_id']; ?>" />
			<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=status_types_info"><img src="<?php echo EE_IMAGES_URL ?>question-frame.png" width="16" height="16" /></a> </p>
		<div id="status_types_info" style="display:none;">
			<h2>
				<?php _e('Display a Single Event Category', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e( 'Enter the Event Category ID from the ', 'event_espresso' ); ?><a href="admin.php?page=event_categories" target="_blank"><?php _e( 'Categories page','event_espresso' ); ?></a>.
			</p>
		</div>
<?php
	}

}

