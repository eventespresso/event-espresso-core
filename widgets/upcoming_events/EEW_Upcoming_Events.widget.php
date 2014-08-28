<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Upcoming Events Widget
 *
 * @package		Event Espresso
 * @subpackage	/widgets/upcoming_events/
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EEW_Upcoming_Events  extends WP_Widget {


	/**
	 * Register widget with WordPress.
	 */
	function __construct() {
		parent::__construct(
			'ee-upcoming-events-widget',
			__( 'Event Espresso Upcoming Events', 'event_espresso' ),
			 array( 'description' => __( 'A widget to display your upcoming events.', 'event_espresso' )),
			array(
				'width' => 300,
				'height' => 350,
				'id_base' => 'ee-upcoming-events-widget'
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
			'title' => __('Upcoming Events', 'event_espresso'),
			'category_name' => '',
			'show_expired' => FALSE,
			'show_desc' => TRUE,
			'show_dates' => TRUE,
			'limit' => 10,
			'image_size' => 'medium'
		);

		$instance = wp_parse_args( (array) $instance, $defaults );
		// don't add HTML labels for EE_Form_Fields generated inputs
		add_filter( 'FHEE__EEH_Form_Fields__label_html', '__return_empty_string' );
		$yes_no_values = array(
			EE_Question_Option::new_instance( array( 'QSO_value' => 0, 'QSO_desc' => __('No', 'event_espresso'))),
			EE_Question_Option::new_instance( array( 'QSO_value' => 1, 'QSO_desc' => __('Yes', 'event_espresso')))
		);

	?>

		<!-- Widget Title: Text Input -->

		<p>
			<label for="<?php echo $this->get_field_id('title'); ?>">
				<?php _e('Title:', 'event_espresso'); ?>
			</label>
			<input id="<?php echo $this->get_field_id('title'); ?>" class="widefat" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>" type="text" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('category_name'); ?>">
				<?php _e('Event Category:', 'event_espresso'); ?>
			</label>
			<?php
			$event_categories = array();
			if ( $categories = EE_Registry::instance()->load_model( 'Term' )->get_all_ee_categories( TRUE )) {
				foreach ( $categories as $category ) {
					$event_categories[] = EE_Question_Option::new_instance( array( 'QSO_value' => $category->get( 'slug' ), 'QSO_desc' => $category->get( 'name' )));
				}
			}
			array_unshift( $event_categories, EE_Question_Option::new_instance( array( 'QSO_value' => '', 'QSO_desc' => __(' - display all - ', 'event_espresso'))));
			echo EEH_Form_Fields::select(
				 __('Event Category:', 'event_espresso'),
				$instance['category_name'],
				$event_categories,
				$this->get_field_name('category_name'),
				$this->get_field_id('category_name')
			);
			?>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('limit'); ?>">
				<?php _e('Number of Events to Display:', 'event_espresso'); ?>
			</label>
			<input id="<?php echo $this->get_field_id('limit'); ?>" name="<?php echo $this->get_field_name('limit'); ?>" value="<?php echo $instance['limit']; ?>" size="3" type="text" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('show_expired'); ?>">
				<?php _e('Show Expired Events:', 'event_espresso'); ?>
			</label>
			<?php
			echo EEH_Form_Fields::select(
				 __('Show Expired Events:', 'event_espresso'),
				$instance['show_expired'],
				$yes_no_values,
				$this->get_field_name('show_expired'),
				$this->get_field_id('show_expired')
			);
			?>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('image_size'); ?>">
				<?php _e('Image Size:', 'event_espresso'); ?>
			</label>
			<?php
			$image_sizes = array();
			if ( $sizes = get_intermediate_image_sizes() ) {
				// loop thru images and create option objects out of them
				foreach ( $sizes as $image_size ) {
					$image_size = trim( $image_size );
					// no big images plz
					if ( ! in_array( $image_size, array( 'large', 'post-thumbnail' ))) {
						$image_sizes[] = EE_Question_Option::new_instance( array( 'QSO_value' => $image_size, 'QSO_desc' => $image_size ));
					}
				}
				$image_sizes[] = EE_Question_Option::new_instance( array( 'QSO_value' => 'none', 'QSO_desc' =>  __('don\'t show images', 'event_espresso') ));
			}
			echo EEH_Form_Fields::select(
				 __('Image Size:', 'event_espresso'),
				$instance['image_size'],
				$image_sizes,
				$this->get_field_name('image_size'),
				$this->get_field_id('image_size')
			);
			?>

		</p>
		<p>
			<label for="<?php echo $this->get_field_id('show_desc'); ?>">
				<?php _e('Show Description:', 'event_espresso'); ?>
			</label>
			<?php
			echo EEH_Form_Fields::select(
				 __('Show Description:', 'event_espresso'),
				$instance['show_desc'],
				$yes_no_values,
				$this->get_field_name('show_desc'),
				$this->get_field_id('show_desc')
			);
			?>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('show_dates'); ?>">
				<?php _e('Show Dates:', 'event_espresso'); ?>
			</label>
			<?php
			echo EEH_Form_Fields::select(
				 __('Show Dates:', 'event_espresso'),
				$instance['show_dates'],
				$yes_no_values,
				$this->get_field_name('show_dates'),
				$this->get_field_id('show_dates')
			);
			?>
		</p>

		<?php
	}



	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = ! empty( $new_instance['title'] ) ? strip_tags( $new_instance['title'] ) : '';
		$instance['category_name'] = $new_instance['category_name'];
		$instance['show_expired'] = $new_instance['show_expired'];
		$instance['limit'] = $new_instance['limit'];
		$instance['image_size'] = $new_instance['image_size'];
		$instance['show_desc'] = $new_instance['show_desc'];
		$instance['show_dates'] = $new_instance['show_dates'];
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

		global $post;
		// make sure there is some kinda post object
		if ( $post instanceof WP_Post ) {
			// but NOT an events archives page, cuz that would be like two event lists on the same page
			if ( ! ( $post->post_type == 'espresso_events' && is_archive() )) {
				// let's use some of the event helper functions'
				EE_Registry::instance()->load_helper( 'Event_View' );
				// make separate vars out of attributes
				extract($args);
				// filter the title
				$title = apply_filters('widget_title', $instance['title']);
				// Before widget (defined by themes).
				echo $before_widget;
				// Display the widget title if one was input (before and after defined by themes).
				if ( ! empty( $title )) {
					echo $before_title . $title . $after_title;
				}
				// grab widget settings
				$category = isset( $instance['category_name'] ) && ! empty( $instance['category_name'] ) ? $instance['category_name'] : FALSE;
				$show_expired = isset( $instance['show_expired'] ) ? (bool) absint( $instance['show_expired'] ) : FALSE;
				$image_size = isset( $instance['image_size'] ) && ! empty( $instance['image_size'] ) ? $instance['image_size'] : 'medium';
				$show_desc = isset( $instance['show_desc'] ) ? (bool) absint( $instance['show_desc'] ) : TRUE;
				$show_dates = isset( $instance['show_dates'] ) ? (bool) absint( $instance['show_dates'] ) : TRUE;
				// start to build our where clause
				$where = array(
//					'Datetime.DTT_is_primary' => 1,
					'status' => 'publish'
				);
				// add category
				if ( $category ) {
					$where['Term_Taxonomy.taxonomy'] = 'espresso_event_categories';
					$where['Term_Taxonomy.Term.slug'] = $category;
				}
				// if NOT expired then we want events that start today or in the future
				if ( ! $show_expired ) {
					$where['Datetime.DTT_EVT_start'] = array( '>=', current_time( 'mysql' ));
				}
				// run the query
				$events = EE_Registry::instance()->load_model( 'Event' )->get_all( array(
					$where,
					'limit' => $instance['limit'] > 0 ? '0,' . $instance['limit'] : '0,10',
					'order_by' => 'Datetime.DTT_EVT_start',
					'order' => 'ASC',
					'group_by' => 'EVT_ID'
				));

				if ( ! empty( $events )) {
					echo '<ul class="ee-upcoming-events-widget-ul">';
					foreach ( $events as $event ) {
						if ( $event instanceof EE_Event && $post->ID != $event->ID() ) {
							//printr( $event, '$event  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
							echo '<li id="ee-upcoming-events-widget-li-' . $event->ID() . '" class="ee-upcoming-events-widget-li">';
							// how big is the event name ?
							$name_length = strlen( $event->name() );
							switch( $name_length ) {
								case $name_length > 70 :
									$len_class =  'three-line';
									break;
								case $name_length > 35 :
									$len_class =  'two-line';
									break;
								default :
									$len_class =  'one-line';
							}
							echo '<a class="ee-widget-event-name-a" href="' . get_permalink( $event->ID() ) . '">' . $event->name() . '</a>';
							if ( has_post_thumbnail( $event->ID() ) && $image_size != 'none' ) {
								echo '<a class="ee-upcoming-events-widget-img" href="' . get_permalink( $event->ID() ) . '">' . get_the_post_thumbnail( $event->ID(), $image_size ) . '</a>';
							}
							if ( $show_dates ) {
								echo espresso_list_of_event_dates( $event->ID(), 'D M jS, Y', 'g:i a', FALSE, NULL, TRUE, TRUE );
							}
							if ( $show_desc && $desc = $event->short_description( 25 )) {
								echo  '<p>' . $desc . '</p>';
							}
							echo '</li>';
						}
					}
					echo '</ul>';
				}
				// After widget (defined by themes).
				echo $after_widget;
			}
		}
	}

}
// End of file EEW_Upcoming_Events.widget.php
// Location: /widgets/upcoming_events/EEW_Upcoming_Events.widget.php