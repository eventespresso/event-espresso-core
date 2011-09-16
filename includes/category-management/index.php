<?php
require_once("add_new_category.php");
require_once("edit_event_category.php");
require_once("update_event_category.php");
require_once("add_cat_to_db.php");

function event_espresso_categories_config_mnu() {
    global $wpdb, $current_user;
    ?>
    <div class="wrap">
        <div id="icon-options-event" class="icon32"> </div>
        <h2><?php _e('Manage Event Categories', 'event_espresso'); ?>
            <?php
            if (!isset($_REQUEST['action']) || ($_REQUEST['action'] != 'edit' && $_REQUEST['action'] != 'add_new_category')) {
                echo '<a href="admin.php?page=event_categories&amp;action=add_new_category" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Category', 'event_espresso') . '</a>';
            }
            ?>
        </h2>

        <div id="poststuff" class="metabox-holder has-right-sidebar">
            <?php event_espresso_display_right_column(); ?>
            <div id="post-body">
                <div id="post-body-content">
                    <?php
                    if (!empty($_POST['delete_category']) || (isset($_REQUEST['action']) && $_REQUEST['action'] == 'delete_category')) {
                        if (is_array($_POST['checkbox'])) {
                            while (list($key, $value) = each($_POST['checkbox'])):
                                $del_id = $key;
                                //Delete category data
                                $sql = "DELETE FROM " . EVENTS_CATEGORY_TABLE . " WHERE id='$del_id'";
                                $wpdb->query($sql);

                                $sql = "DELETE FROM " . EVENTS_CATEGORY_REL_TABLE . " WHERE cat_id='$del_id'";
                                $wpdb->query($sql);
                            endwhile;
                        }
                        if ($_REQUEST['action'] == 'delete_category') {
                            //Delete discount data
                            $sql = "DELETE FROM " . EVENTS_CATEGORY_TABLE . " WHERE id='" . $_REQUEST['id'] . "'";
                            $wpdb->query($sql);
                            $sql = "DELETE FROM " . EVENTS_CATEGORY_REL_TABLE . " WHERE cat_id='" . $_REQUEST['id'] . "'";
                            $wpdb->query($sql);
                        }
                        ?>
                        <div id="message" class="updated fade">
                            <p><strong>
                                    <?php _e('Categories have been successfully deleted from the event.', 'event_espresso'); ?>
                                </strong></p>
                        </div>
                        <?php
                    }
                    if (isset($_REQUEST['action'])) {
                        switch ($_REQUEST['action']) {
                            case 'update':
                                update_event_category();
                                break;
                            case 'add':
                                add_cat_to_db();
                                break;
                            case 'add_new_category':
                                add_new_event_category();
                                break;
                            case 'edit':
                                edit_event_category();
                                break;
                        }
                    }
                    ?>
                    <form id="form1" name="form1" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">

                        <table id="table" class="widefat manage-categories">
                            <thead>
                                <tr>
                                    <th class="manage-column column-cb check-column" id="cb" scope="col" style="width:2.5%;"><input type="checkbox"></th>
                                    <th class="manage-column column-comments num" id="id" style="padding-top:7px; width:2.5%;" scope="col" title="Click to Sort"><?php _e('ID', 'event_espresso'); ?></th>
                                    <th class="manage-column column-title" id="name" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Name', 'event_espresso'); ?></th>
                                    <?php if (function_exists('espresso_is_admin') && espresso_is_admin() == true) { ?>
                                        <th class="manage-column column-creator" id="creator" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Creator', 'event_espresso'); ?></th>
                                    <?php } ?>

                                    <th class="manage-column column-author" id="start" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Shortcode', 'event_espresso'); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $sql = "SELECT * FROM " . EVENTS_CATEGORY_TABLE . " c";
                                if (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_event_manager' || espresso_member_data('role') == 'espresso_group_admin')) {
                                    $sql .= " JOIN $wpdb->users u on u.ID = c.wp_user WHERE c.wp_user = " . $current_user->ID;
                                }
                                $wpdb->query($sql);

                                if ($wpdb->num_rows > 0) {
                                    $results = $wpdb->get_results($sql . " ORDER BY c.id ASC");
                                    foreach ($results as $result) {
                                        $category_id = $result->id;
                                        $category_name = stripslashes($result->category_name);
                                        $category_identifier = stripslashes($result->category_identifier);
                                        $category_desc = stripslashes($result->category_desc);
                                        $display_category_desc = stripslashes($result->display_desc);
                                        $wp_user = $result->wp_user;
                                        ?>
                                        <tr>
                                            <td class="check-column" style="padding:7px 0 22px 5px; vertical-align:top;"><input name="checkbox[<?php echo $category_id ?>]" type="checkbox"  title="Delete <?php echo stripslashes($category_name) ?>"></td>
                                            <td class="column-comments" style="padding-top:3px;"><?php echo $category_id ?></td>
                                            <td class="post-title page-title column-title"><strong><a href="admin.php?page=event_categories&action=edit&id=<?php echo $category_id ?>"><?php echo $category_name ?></a></strong>
                                               <div class="row-actions">
																								  <span class="edit"><a href="admin.php?page=event_categories&action=edit&id=<?php echo $category_id ?>"><?php _e('Edit', 'event_espresso'); ?></a> | </span>
																									<span class="delete"><a onclick="return confirmDelete();" class="submitdelete" href="admin.php?page=event_categories&action=delete_category&id=<?php echo $category_id ?>"><?php _e('Delete', 'event_espresso'); ?></a></span></div>
                                            </td>
                                            <?php if (function_exists('espresso_is_admin') && espresso_is_admin() == true) { ?>
                                                <td><?php echo espresso_user_meta($wp_user, 'user_firstname') != '' ? espresso_user_meta($wp_user, 'user_firstname') . ' ' . espresso_user_meta($wp_user, 'user_lastname') : espresso_user_meta($wp_user, 'display_name'); ?></td>
                                            <?php } ?>
                                            <td>[EVENT_ESPRESSO_CATEGORY event_category_id="<?php echo $category_identifier ?>"]</td>

                                        </tr>
                                    <?php }
                                } ?>
                            </tbody>
                        </table>
                        <div style="clear:both">
                            <p>
                                <input type="checkbox" name="sAll" onclick="selectAll(this)" />
                                <strong>
                                    <?php _e('Check All', 'event_espresso'); ?>
                                </strong>
                                <input name="delete_category" type="submit" class="button-secondary" id="delete_category" value="<?php _e('Delete Category', 'event_espresso'); ?>" style="margin-left:10px 0 0 10px;" onclick="return confirmDelete();">
                                <a  style="margin-left:5px"class="button-primary" href="admin.php?page=event_categories&amp;action=add_new_category"><?php _e('Add New Category', 'event_espresso'); ?></a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div id="unique_id_info" style="display:none">
        <h2><?php _e('Unique Category Identifier', 'event_espresso'); ?></h2>
        <p><?php _e('This should be a unique identifier for the category. Example: "category1" (without qoutes.)', 'event_espresso'); ?></p>
        <p>The<?php _e(' unique ID can also be used in individual pages using the', 'event_espresso'); ?>  	[EVENT_ESPRESSO_CATEGORY event_category_id="category_identifier"] <?php _e('shortcode', 'event_espresso'); ?>.</p>
    </div>
    <script>
        jQuery(document).ready(function($) {

            /* show the table data */
            var mytable = $('#table').dataTable( {
                "bStateSave": true,
                "sPaginationType": "full_numbers",

                "oLanguage": {	"sSearch": "<strong><?php _e('Live Search Filter', 'event_espresso'); ?>:</strong>",
                    "sZeroRecords": "<?php _e('No Records Found!', 'event_espresso'); ?>" },
                "aoColumns": [
                    { "bSortable": false },
                    null,
                    null,
    <?php echo function_exists('espresso_is_admin') && espresso_is_admin() == true ? 'null,' : ''; ?>
                    { "bSortable": false }

                ]

            } );

        } );
// Add new category form validation
	jQuery(function(){
	jQuery("#add-new-cat").validate({
	rules: {
	category_name: "required"
	},
	messages: {
	 category_name: "please add a category name"
		}
	
 });		
	});
</script>					


    <?php
}
