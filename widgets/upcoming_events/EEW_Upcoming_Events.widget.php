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
	 * @param array $instance Previously saved values from database.
	 * @return string|void
	 */
	public function form( $instance ) {

		EE_Registry::instance()->load_class( 'Question_Option', array(), FALSE, FALSE, TRUE );
		// Set up some default widget settings.
		$defaults = array(
			'title' => __('Upcoming Events', 'event_espresso'),
			'category_name' => '',
			'show_expired' => FALSE,
			'show_desc' => TRUE,
			'show_dates' => TRUE,
			'show_everywhere' => FALSE,
			'date_limit' => 2,
			'limit' => 10,
			'date_range' => FALSE,
			'image_size' => 'medium'
		);

		$instance = wp_parse_args( (array) $instance, $defaults );
		// don't add HTML labels for EE_Form_Fields generated inputs
		add_filter( 'FHEE__EEH_Form_Fields__label_html', '__return_empty_string' );
		$yes_no_values = array(
			EE_Question_Option::new_instance( array( 'QSO_value' => FALSE, 'QSO_desc' => __('No', 'event_espresso'))),
			EE_Question_Option::new_instance( array( 'QSO_value' => TRUE, 'QSO_desc' => __('Yes', 'event_espresso')))
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
			/** @type EEM_Term $EEM_Term */
			$EEM_Term = EE_Registry::instance()->load_model( 'Term' );
			$categories = $EEM_Term->get_all_ee_categories( TRUE );
			if ( $categories ) {
				foreach ( $categories as $category ) {
					if ( $category instanceof EE_Term ) {
						$event_categories[] = EE_Question_Option::new_instance( array( 'QSO_value' => $category->get( 'slug' ), 'QSO_desc' => $category->get( 'name' )));
					}
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
			$sizes = get_intermediate_image_sizes();
			if ( $sizes ) {
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
		<p>
			<label for="<?php echo $this->get_field_id('show_everywhere'); ?>">
		        <?php _e('Show on all Pages:', 'event_espresso'); ?>
			</label>
	 	    <?php
	 	    echo EEH_Form_Fields::select(
	 	        __('Show on all Pages:', 'event_espresso'),
	 	        $instance['show_everywhere'],
	 	        $yes_no_values,
	 	        $this->get_field_name('show_everywhere'),
	 	        $this->get_field_id('show_everywhere')
	 	    );
	 	    ?>
	 	</p>
		<p>
			<label for="<?php echo $this->get_field_id('date_limit'); ?>">
				<?php _e('Number of Dates to Display:', 'event_espresso'); ?>
			</label>
			<input id="<?php echo $this->get_field_id('date_limit'); ?>" name="<?php echo $this->get_field_name('date_limit'); ?>" value="<?php echo esc_attr( $instance['date_limit'] ); ?>" size="3" type="text" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('date_range'); ?>">
				<?php _e('Show Date Range:', 'event_espresso'); ?>
			</label>
			<?php
			echo EEH_Form_Fields::select(
				 __('Show Date Range:', 'event_espresso'),
				$instance['date_range'],
				$yes_no_values,
				$this->get_field_name('date_range'),
				$this->get_field_id('date_range')
			);
			?><span class="description"><br /><?php _e('This setting will replace the list of dates in the widget.', 'event_espresso'); ?></span>
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
		$instance['show_everywhere'] = $new_instance['show_everywhere'];
		$instance['date_limit'] = $new_instance['date_limit'];
		$instance['date_range'] = $new_instance['date_range'];
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
			$before_widget = '';
			$before_title = '';
			$after_title = '';
			$after_widget = '';
			// but NOT an events archives page, cuz that would be like two event lists on the same page
			$show_everywhere = isset( $instance['show_everywhere'] ) ? (bool) absint( $instance['show_everywhere'] ) : TRUE;
			if ( $show_everywhere || ! ( $post->post_type == 'espresso_events' && is_archive() )) {
				// let's use some of the event helper functions'
				// make separate vars out of attributes


				extract($args);

				// add function to make the title a link
	            add_filter('widget_title', array($this, 'make_the_title_a_link'), 15);

				// filter the title
				$title = apply_filters('widget_title', $instance['title']);

				// remove the function from the filter, so it does not affect other widgets
	            remove_filter('widget_title', array($this, 'make_the_title_a_link'), 15);

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
				$date_limit = isset( $instance['date_limit'] ) && ! empty( $instance['date_limit'] ) ? $instance['date_limit'] : NULL;
				$date_range = isset( $instance['date_range'] ) && ! empty( $instance['date_range'] ) ? $instance['date_range'] : FALSE;
				// start to build our where clause
				$where = array(
//					'Datetime.DTT_is_primary' => 1,
					'status' => array( 'IN', array( 'publish', 'sold_out' ) )
				);
				// add category
				if ( $category ) {
					$where['Term_Taxonomy.taxonomy'] = 'espresso_event_categories';
					$where['Term_Taxonomy.Term.slug'] = $category;
				}
				// if NOT expired then we want events that start today or in the future
				if ( ! $show_expired ) {
					$where['Datetime.DTT_EVT_end'] = array( '>=', EEM_Datetime::instance()->current_time_for_query( 'DTT_EVT_end' ) );
				}
				// allow $where to be filtered
				$where = apply_filters( 'FHEE__EEW_Upcoming_Events__widget__where', $where, $category, $show_expired );
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
						if ( $event instanceof EE_Event && ( !is_single() || $post->ID != $event->ID() ) ) {
							//printr( $event, '$event  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
							echo '<li id="ee-upcoming-events-widget-li-' . $event->ID() . '" class="ee-upcoming-events-widget-li">';
							// how big is the event name ?
							$name_length = strlen( $event->name() );
							switch( $name_length ) {
								case $name_length > 70 :
									$len_class =  ' three-line';
									break;
								case $name_length > 35 :
									$len_class =  ' two-line';
									break;
								default :
									$len_class =  ' one-line';
							}
							$event_url = apply_filters( 'FHEE_EEW_Upcoming_Events__widget__event_url', $event->get_permalink(), $event );
							echo '<h5 class="ee-upcoming-events-widget-title-h5"><a class="ee-widget-event-name-a' . $len_class . '" href="' . $event_url . '">' . $event->name() . '</a></h5>';
							if ( post_password_required( $event->ID() ) ) {
								$pswd_form = apply_filters( 'FHEE_EEW_Upcoming_Events__widget__password_form', get_the_password_form( $event->ID() ), $event );
								echo $pswd_form;
							} else {
								if ( has_post_thumbnail( $event->ID() ) && $image_size != 'none' ) {
									echo '<div class="ee-upcoming-events-widget-img-dv"><a class="ee-upcoming-events-widget-img" href="' . $event_url . '">' . get_the_post_thumbnail( $event->ID(), $image_size ) . '</a></div>';
								}
								$desc = $event->short_description( 25 );
								if ( $show_dates ) {
									$date_format = apply_filters( 'FHEE__espresso_event_date_range__date_format', get_option( 'date_format' ));
									$time_format = apply_filters( 'FHEE__espresso_event_date_range__time_format', get_option( 'time_format' ));
									$single_date_format = apply_filters( 'FHEE__espresso_event_date_range__single_date_format', get_option( 'date_format' ));
									$single_time_format = apply_filters( 'FHEE__espresso_event_date_range__single_time_format', get_option( 'time_format' ));
									if ( $date_range == TRUE ) {
										echo espresso_event_date_range( $date_format, $time_format, $single_date_format, $single_time_format, $event->ID() );
									}else{
										echo espresso_list_of_event_dates( $event->ID(), $date_format, $time_format, FALSE, NULL, TRUE, TRUE, $date_limit );
									}
								}
								if ( $show_desc && $desc ) {
									echo '<p style="margin-top: .5em">' . $desc . '</p>';
								}
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



	/**
	 * make_the_title_a_link
	 * callback for widget_title filter
	 *
	 * @param $title
	 * @return string
	 */
	public function make_the_title_a_link($title) {
	    return '<a href="' . EEH_Event_View::event_archive_url() . '">' . $title . '</a>';
	}

}
// End of file EEW_Upcoming_Events.widget.php
// Location: /widgets/upcoming_events/EEW_Upcoming_Events.widget.php
