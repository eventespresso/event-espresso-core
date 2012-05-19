<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

function espresso_price_manager_menu() {

	global $org_options;

	define('PRC_ADMIN_URL', admin_url('admin.php?page=pricing'));

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/pricing/index.php');
	espresso_prices_admin_helper();

	$_REQUEST['action'] = isset($_REQUEST['action']) ? wp_strip_all_tags($_REQUEST['action']) : NULL;
	$edit_or_add_pages = array('edit_price', 'edit_price_type', 'add_new_price', 'add_new_price_type');
	$edit_or_add_page = ( in_array($_REQUEST['action'], $edit_or_add_pages)) ? TRUE : FALSE;

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/pricing/EE_Prices_List_Table.class.php');
	$pricesListTable = new EE_Prices_List_Table();
	$pricesListTable->prepare_items();
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/pricing/EE_Price_Types_List_Table.class.php');
	$priceTypesListTable = new EE_Price_Types_List_Table();
	$priceTypesListTable->prepare_items();
	?>
	<div class="wrap">
		<div id="icon-options-event" class="icon32"> </div>
		<h2><?php _e('Manage Event Pricing', 'event_espresso'); ?></h2>
		<?php
		ob_start();
		do_meta_boxes('event-espresso_page_pricing', 'side', null);
		$sidebar_content = ob_get_clean();
		ob_start();
		if ($edit_or_add_page) {
			do_meta_boxes('event-espresso_page_pricing', 'normal', null);
		}
		?>
		<h2><?php _e('Global Prices', 'event_espresso'); ?>
			<?php
			if (!$edit_or_add_page) {
				$add_new_price_url = add_query_arg(array('action' => 'add_new_price'), PRC_ADMIN_URL);
				echo '<a href="' . $add_new_price_url . '" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Price', 'event_espresso') . '</a>';
			}
			?>
		</h2>
		<?php $pricesListTable->views(); ?>
		<form id="espresso-admin-price-list-frm" name="espresso-admin-price-list-frm" method="post" action="<?php echo PRC_ADMIN_URL ?>">
			<?php $pricesListTable->search_box('Search Prices', 'search_prices'); ?>
			<input type="hidden" name="page" value="<?php echo $_REQUEST['page'] ?>" />
			<?php $pricesListTable->display() ?>
		</form>
		<br/><br/>



		<h2>Price Types
			<?php
			if (!$edit_or_add_page) {
				$add_new_price_type_url = add_query_arg(array('action' => 'add_new_price_type'), PRC_ADMIN_URL);
				echo '<a href="' . $add_new_price_type_url . '" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Type', 'event_espresso') . '</a>';
			}
			?>					
		</h2>
		<?php $priceTypesListTable->views(); ?>
		<form id="espresso-admin-price-list-frm" name="espresso-admin-price-list-frm" method="post" action="<?php echo PRC_ADMIN_URL ?>">
			<?php $priceTypesListTable->search_box('Search Prices', 'search_prices'); ?>
			<input type="hidden" name="page" value="<?php echo $_REQUEST['page'] ?>" />
			<?php $priceTypesListTable->display() ?>
		</form>
		<?php
		$main_post_content = ob_get_clean();
		espresso_choose_layout($main_post_content, $sidebar_content);
		?>
	</div>
	<?php
}