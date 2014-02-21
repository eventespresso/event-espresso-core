<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit(); }
/* ------------------------------------------------------------------------
 *
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Event Espresso
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EEW_Espresso_Calendar
 * Displays a month-based espresso_calendar in the sidebar
 *
 * @package		Event Espresso
 * @subpackage	espresso-calendar
 * @author		Chris Reynolds 
 * @since 2.0
 *
 * ------------------------------------------------------------------------
 */
class EEW_Espresso_Calendar extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	public function __construct() {
		parent::__construct(
			'ee-calendar-widget',
			__( 'Event Espresso Calendar Widget', 'event_espresso' ),
			 array( 
			 	'description' => __( 'Displays the Espresso Calendar in a widget.', 'event_espresso' )
			 ),
			array(
				'width' => 300, 
				'height' => 350, 
				'id_base' => 'ee-calendar-widget'
			)
		);
	}



	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {

		EE_Registry::instance()->load_helper( 'Form_Fields' );
		EE_Registry::instance()->load_class( 'Question_Option', array(), FALSE, FALSE, TRUE );		

		// Set up some default widget settings.
		$defaults = array( 
			'title' => 'Calendar', 
			'show_expired' => FALSE, 
			'category_id' => '', 
			'calendar_page' => ''
		);
		
		$instance = wp_parse_args((array) $instance, $defaults);

		add_filter( 'FHEE__EEH_Form_Fields__label_html', '__return_empty_string' );		
		$yes_no_values = array(
			EE_Question_Option::new_instance( array( 'QSO_value' => 0, 'QSO_desc' => __('No', 'event_espresso'))),
			EE_Question_Option::new_instance( array( 'QSO_value' => 1, 'QSO_desc' => __('Yes', 'event_espresso')))
		);

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
			<?php 			
				echo EEH_Form_Fields::select( 
					 __('Display Expired Events?', 'event_espresso'), 
					$instance['show_expired'], 
					$yes_no_values, 
					$this->get_field_name('show_expired'),
					$this->get_field_id('show_expired')
				);			
			?> 
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('category_id'); ?>">
				<?php _e('Single Category Name (optional)', 'event_espresso'); ?>
			</label>
			<input type="text" id="<?php echo $this->get_field_id('category_id'); ?>" name="<?php echo $this->get_field_name('category_id'); ?>" width="20" value="<?php echo $instance['category_id']; ?>" /><br/>
			<span class="small-text">
			<?php 
				printf(
					__( 'Enter the Category Slug from the %sEvent Categories%s page','event_espresso' ),
					'<a href="http://localhost/4.1-DEV/wp-admin/admin.php?page=espresso_events&action=category_list" target="_blank">',
					'</a>'
				);
			?>				
			</span>
		</p>

<?php
	}



	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $instance ) {
		// Strip tags (if needed) and update the widget settings.
		$instance['title'] = strip_tags( $new_instance['title'] );
		$instance['show_expired'] = strip_tags( $new_instance['show_expired'] );
		$instance['category_id'] = strip_tags( $new_instance['category_id'] );
		return $instance;
	}



	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget( $args, $instance ) {

		extract($args);
		// get the current post
		global $post, $is_espresso_calendar;
		if ( isset( $post->post_content )) {
			 // check the post content for the short code
			 if ( strpos( $post->post_content, '[ESPRESSO_CALENDAR') === FALSE ) {
				$is_espresso_calendar = TRUE;
				// Before widget (defined by themes).
				echo $before_widget;
				// Title of widget (before and after defined by themes).
				if ( $title = apply_filters( 'widget_title', $instance['title'] )) {
					echo $before_title . $title . $after_title;
				}
				// load scripts
				EE_Calendar::instance()->calendar_scripts();
				// settings
				$attributes = array( 
					'event_category_id' => $instance['category_id'], 
					'show_expired' => $instance['show_expired'], 
					'cal_view' => 'month',
					'header_left' => 'prev',
					'header_center' => 'title',
					'header_right' =>'next',
					'titleFormat_month' => 'MMM yyyy',
					'widget' => TRUE
				);
				echo EE_Calendar::instance()->display_calendar( $attributes );
				// After widget (defined by themes).
				echo $after_widget;
			}
		}
	}






}

