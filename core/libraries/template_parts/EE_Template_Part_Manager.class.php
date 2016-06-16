<?php
//namespace EventEspresso\core\libraries\templates;
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Template_Part_Manager
 *
 * class for managing template parts and controlling the order in which they are applied to content
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 $VID:$
 *
 */
class EE_Template_Part_Manager {

	/**
	 * @param EE_Template_Part_PriorityQueue $template_parts
	 */
	protected $template_parts;

	/**
	 * @param array $priorities
	 */
	protected $priorities = array();

	/**
	 * @param int $event_desc_priority
	 */
	protected $event_desc_priority;

	/**
	 * @param string $before_event_content
	 */
	protected $before_event_content;

	/**
	 * @param string $event_content
	 */
	protected $event_content;

	/**
	 * @param string $after_event_content
	 */
	protected $after_event_content;



	/**
	 *    class constructor
	 */
	public function __construct() {
		$this->template_parts = new EE_Template_Part_PriorityQueue();
	}



	/**
	 *    add_template_part
	 *
	 *    used for setting the details about a particular template part
	 *
	 * @param string $name     - just a simple string identifier - do NOT use 'event'
	 * @param string $label    - template part label displayed in admin
	 * @param string $template - name or path of template to be used by EEH_Template::locate_template()
	 * @param int $priority    - order in which template parts should be applied
	 */
	public function add_template_part( $name, $label, $template, $priority ) {
		// SplPriorityQueue doesn't play nice with multiple items having the same priority
		// so if the incoming priority is already occupied, then let's increment it by one,
		// and then pass everything back into this method and try again with the new priority
		if ( isset( $this->priorities[ $priority ] ) ) {
			$priority++;
			$this->add_template_part( $name, $label, $template, $priority );
			return;
		}
		// kk now we can mark this priority as being occupied
		$this->priorities[ $priority ] = true;
		// create the template part and add to the queue
		$this->template_parts->insert(
			new EE_Template_Part( $name, $label, $template, $priority ),
			$priority
		);
		if ( $name == 'event' ) {
			$this->event_desc_priority = $priority;
		}
	}



	/**
	 *    apply_template_part_filters
	 *
	 *    adds template parts to the supplied content
	 *    according to the details set when the template parts were added
	 *
	 * @access public
	 * @param string $content
	 * @return string
	 */
	public function apply_template_part_filters( $content = '' ) {
		$this->template_parts->rewind();
		// loop through template parts and position content
		while ( $this->template_parts->valid() ) {
			$this->_position_template_part(
				$content,
				$this->template_parts->current()->template(),
				$this->template_parts->current()->priority()
			);
			$this->template_parts->next();
		}
		// now simply add our three strings of content together
		return $this->before_event_content . $this->event_content . $this->after_event_content;
	}



	/**
	 *    position_template_part
	 *
	 * based on the priority of the incoming template part
	 * relative to the known event description template part priority,
	 * this method will assign template parts to one of the following:
	 *        $this->before_event_content
	 *        $this->event_content
	 *        $this->after_event_content
	 *
	 * @access protected
	 * @param string $content
	 * @param string $template
	 * @param int $priority
	 * @return string
	 */
	protected function _position_template_part( $content, $template, $priority ) {
		// Event Description content is the actual incoming content itself
		if ( $priority === $this->event_desc_priority ) {
			$this->event_content = $content;
		} else if ( $priority < $this->event_desc_priority ) {
			// everything BEFORE the Event Description
			$this->before_event_content .= EEH_Template::locate_template( $template );
		} else if ( $priority > $this->event_desc_priority ) {
			// everything AFTER the Event Description
			$this->after_event_content .= EEH_Template::locate_template( $template );
		}
	}



	/**
	 *    generate_sortable_list_of_template_parts
	 *
	 *    creates an HTML list (<ul>) with list items (<li>) for each template part,
	 *    in a format that can be used as a sortable list in the admin
	 *
	 * @access public
	 * @param string $list_css_id
	 * @param string $list_css_class
	 * @param string $list_item_css_class
	 * @param string $list_item_css_id_prefix
	 * @return string
	 */
	public function generate_sortable_list_of_template_parts(
		$list_css_id = '',
		$list_css_class = '',
		$list_item_css_class = '',
		$list_item_css_id_prefix = ''
	) {
		$event_archive_display_order = EEH_HTML::ul( $list_css_id, $list_css_class );
		$this->template_parts->rewind();
		// loop through template parts and add template content
		while ( $this->template_parts->valid() ) {
			$event_archive_display_order .= EEH_HTML::li(
				EEH_HTML::span( '', '', 'dashicons dashicons-arrow-up-alt2' ) .
				EEH_HTML::span( '', '', 'dashicons dashicons-arrow-down-alt2' ) .
				$this->template_parts->current()->label(),
				$list_item_css_id_prefix . $this->template_parts->current()->name(),
				$list_item_css_class
			);
			$this->template_parts->next();
		}
		$event_archive_display_order .= EEH_HTML::ulx();
		return $event_archive_display_order;
	}



	/**
	 *    display_template_parts
	 *
	 * just for debugging purposes
	 *
	 * @access    public
	 * @return string
	 */
	public function display_template_parts() {
		if ( WP_DEBUG ) {
			$this->template_parts->rewind();
			while ( $this->template_parts->valid() ) {
				EEH_Debug_Tools::printr( $this->template_parts->current(), 'template_part', __FILE__, __LINE__ );
				$this->template_parts->next();
			}
		}
	}
}
// End of file EE_Template_Part_Manager.class.php
// Location: /EE_Template_Part_Manager.class.php