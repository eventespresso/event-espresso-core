<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

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
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * espresso_events_Event_Categories_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 * 
 *
 * @package		espresso_events_Event_Categories_Hooks
 * @subpackage	includes/core/admin/messages/espresso_events_Event_Categories_Hooks.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Event_Categories_Hooks extends EE_Admin_Hooks {


	public function __construct( EE_Admin_Page $admin_page ) {
		parent::__construct($admin_page);
	}


	protected function _set_hooks_properties() {
		$this->_name = 'event_categories';
		$this->_metaboxes = array(
			0 => array(
				'page_route' => array( 'edit_event', 'add_event' ),
				'func' => 'event_details_metabox',
				'label' => __('Event Category', 'event_espresso'),
				'context' => 'side',
				'priority' => 'default'
				)
			);
	}




	public function event_details_metabox() {
		$event_id = $this->_adminpage_obj->get_event_object()->id;
		global $wpdb;
		?>
		<div class="inside">
			<?php
			$sql = "SELECT * FROM " . EVENTS_CATEGORY_TABLE;
			$sql = apply_filters('filter_hook_espresso_event_editor_categories_sql', $sql);
			$event_categories = $wpdb->get_results($sql);
			$num_rows = $wpdb->num_rows;
			if ($num_rows > 0) {
				if ($num_rows > 10) {
					echo '<div style="height:250px;overflow:auto;">';
				}
				foreach ($event_categories as $category) {
					$category_id = $category->id;
					$category_name = $category->category_name;

					$in_event_categories = $wpdb->get_results( $wpdb->prepare("SELECT * FROM " . EVENTS_CATEGORY_REL_TABLE . " WHERE event_id=%s AND cat_id=%s", $event_id, $category_id ) );
					foreach ($in_event_categories as $in_category) {
						$in_event_category = $in_category->cat_id;
					}
					if (empty($in_event_category))
						$in_event_category = '';
					?>
					<p id="event-category-<?php echo $category_id; ?>">
						<label for="in-event-category-<?php echo $category_id; ?>" class="selectit">
							<input value="<?php echo $category_id; ?>" type="checkbox" name="event_category[]" id="in-event-category-<?php echo $category_id; ?>"<?php echo ($in_event_category == $category_id ? ' checked="checked"' : "" ); ?>/>
							<?php echo $category_name; ?>
						</label>
					</p>
					<?php
				}
				if ($num_rows > 10) {
					echo '</div>';
				}
			} else {
				_e('No Categories', 'event_espresso');
			}
			?>
			<p>
				<a href="admin.php?page=espresso_event_categories" target="_blank">
					<?php _e('Manage Categories', 'event_espresso'); ?>
				</a>
			</p>
		</div>
		<?php
	}

} //end class espresso_events_Event_Categories_Hooks