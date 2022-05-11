<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit(); }
/*
 * EEW_New_Addon
 * Displays a List of New_Addon in the Sidebar
 *
 * @package			Event Espresso
 * @subpackage 	eea-new-addon
 * @author				Brent Christensen
 * @since 				4.3
 *
 * ------------------------------------------------------------------------
 */
class EEW_New_Addon extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	public function __construct() {
		parent::__construct(
			'ee-new_addon-widget',
			esc_html__( 'Event Espresso New Addon Widget', 'event_espresso' ),
			 array(
			 	'description' => esc_html__( 'Displays Espresso New Addon in a widget.', 'event_espresso' )
			 ),
			array(
				'width' => 300,
				'height' => 350,
				'id_base' => 'ee-new_addon-widget'
			)
		);
	}



	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 * @return string|void
	 */
	public function form( $instance ) {

		EE_Registry::instance()->load_class( 'Question_Option', array(), FALSE, FALSE, TRUE );

		// Set up some default widget settings.
		$defaults = array(
			'title' => 'New Addon'
		);

		$instance = wp_parse_args((array) $instance, $defaults);

		add_filter( 'FHEE__EEH_Form_Fields__label_html', '__return_empty_string' );
		$yes_no_values = array(
			EE_Question_Option::new_instance( array( 'QSO_value' => 0, 'QSO_desc' => esc_html__('No', 'event_espresso'))),
			EE_Question_Option::new_instance( array( 'QSO_value' => 1, 'QSO_desc' => esc_html__('Yes', 'event_espresso')))
		);

		?>

		<p>
			<label for="<?php echo $this->get_field_id('title'); ?>">
				<?php esc_html_e('Title:', 'event_espresso'); ?>
			</label>
			<input type="text" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" width="20" value="<?php echo $instance['title']; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('yes_or_no_question'); ?>">
				<?php esc_html_e('Yes or No?', 'event_espresso'); ?>
			</label>
			<?php
				echo EEH_Form_Fields::select(
					 esc_html__('Yes or No?', 'event_espresso'),
					$instance['yes_or_no_question'],
					$yes_no_values,
					$this->get_field_name('yes_or_no_question'),
					$this->get_field_id('yes_or_no_question')
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
	 * @param array $instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $instance ) {
		// Strip tags (if needed) and update the widget settings.
		$instance['title'] = strip_tags((string) $new_instance['title'] );
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
		// get the current post
		global $post;
		if ( isset( $post->post_content )) {
			 // check the post content for the short code
			 if ( strpos( $post->post_content, '[ESPRESSO_NEW_ADDON') === FALSE ) {
				 EED_New_Addon::$shortcode_active = TRUE;
				// Before widget (defined by themes).
				echo $args['before_widget'];
				// Title of widget (before and after defined by themes).
				 $title = apply_filters( 'widget_title', $instance['title'] );
				if ( ! empty( $title )) {
					echo $args['before_title'] . $title . $args['after_title'];
				}
				// load scripts
				EE_New_Addon::instance()->enqueue_scripts();
				// settings
				$attributes = array();
				echo EE_New_Addon::instance()->display_new_addon( $attributes );
				// After widget (defined by themes).
				echo $args['after_widget'];
			}
		}
	}






}

// End of file EEW_New_Addon.widget.php
// Location: /wp-content/plugins/eea-new-addon/EEW_New_Addon.widget.php