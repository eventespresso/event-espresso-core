<?php

function event_espresso_discount_config_mnu() {
    global $wpdb;
    ?>
    <div class="wrap">
        <div id="icon-options-event" class="icon32"> </div>
        <h2><?php echo _e('Manage Event Promotional Codes', 'event_espresso') ?>
            <?php
            if (!isset($_REQUEST['action']) || ($_REQUEST['action'] != 'edit' && $_REQUEST['action'] != 'new')) {
                echo '<a href="admin.php?page=discounts&amp;action=new" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Code', 'event_espresso') . '</a>';
            }
            ?>
        </h2>
        <div id="poststuff" class="metabox-holder has-right-sidebar">
            <?php event_espresso_display_right_column(); ?>
            <div id="post-body">
                <div id="post-body-content">

                    <?php
                    if (isset($_REQUEST['action'])) {
                        switch ($_REQUEST['action']) {
                            case 'add':
                                require_once("add_discount.php");
                                add_discount_to_db(); //Add the discount to the DB
                                break;
                            case 'new':
                                require_once("new_discount.php");
                                add_new_event_discount(); //Add new discount form
                                break;
                            case 'edit':
                                require_once("edit_discount.php");
                                edit_event_discount(); //Edit discount form
                                break;
                            case 'update':
                                require_once("update_discount.php");
                                update_event_discount(); //Update discount in DB
                                break;
                            case 'delete_discount':
                                require_once("delete_discount.php");
                                delete_event_discount(); //Delete discount in DB
                                break;
                        }
                    }
                    if (!empty($_REQUEST['delete_discount'])) {//This is for the delete checkboxes
                        require_once("delete_discount.php");
                        delete_event_discount();
                    }
                    ?>

                    <form id="form1" name="form1" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
                        <table id="table" class="widefat manage-discounts">
                            <thead>
                                <tr>
                                    <th class="manage-column column-cb check-column" id="cb" scope="col" style="width:2.5%;"><input type="checkbox"></th>
                                    <th class="manage-column column-comments num" id="id" style="padding-top:7px; width:2.5%;" scope="col" title="Click to Sort"><?php _e('ID', 'event_espresso'); ?></th>
                                    <th class="manage-column column-title" id="name" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Name', 'event_espresso'); ?></th>
                                    <?php if (function_exists('espresso_is_admin') && espresso_is_admin() == true) { ?>
                                        <th class="manage-column column-creator" id="creator" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Creator', 'event_espresso'); ?></th>
                                    <?php } ?>
                                    <th class="manage-column column-author" id="start" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Amount', 'event_espresso'); ?></th>
                                    <th class="manage-column column-date" id="begins" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Percentaage', 'event_espresso'); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $sql = "SELECT * FROM " . EVENTS_DISCOUNT_CODES_TABLE;
                                if (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_event_manager' || espresso_member_data('role') == 'espresso_group_admin')) {
                                    $sql .= " WHERE wp_user = '" . espresso_member_data('id') . "' ";
                                }
                                $event_discounts = $wpdb->get_results($sql);
                                if ($wpdb->num_rows > 0) {
                                    foreach ($event_discounts as $event_discount) {
                                        $discount_id = $event_discount->id;
                                        $coupon_code = $event_discount->coupon_code;
                                        $coupon_code_price = $event_discount->coupon_code_price;
                                        $coupon_code_description = $event_discount->coupon_code_description;
                                        $use_percentage = $event_discount->use_percentage;
                                        $wp_user = $event_discount->wp_user;
                                        ?>
                                        <tr>
                                            <td class="check-column" style="padding:7px 0 22px 5px; vertical-align:top;"><input name="checkbox[<?php echo $discount_id ?>]" type="checkbox"  title="Delete <?php echo $coupon_code ?>"></td>
                                            <td class="column-comments" style="padding-top:3px;"><?php echo $discount_id ?></td>
                                            <td class="post-title page-title column-title"><strong><a href="admin.php?page=discounts&amp;action=edit&amp;discount_id=<?php echo $discount_id ?>"><?php echo $coupon_code ?></a></strong>
                                                <div class="row-actions"><span class="edit"><a href="admin.php?page=discounts&action=edit&discount_id=<?php echo $discount_id ?>"><?php _e('Edit', 'event_espresso'); ?></a> | </span><span class="delete"><a onclick="return confirmDelete();" class="delete submitdelete" href="admin.php?page=discounts&action=delete_discount&discount_id=<?php echo $discount_id ?>"><?php _e('Delete', 'event_espresso'); ?></a></span></div></td>
                                            <?php if (function_exists('espresso_is_admin') && espresso_is_admin() == true) { ?>
                                                <td><?php echo espresso_user_meta($wp_user, 'user_firstname') != '' ? espresso_user_meta($wp_user, 'user_firstname') . ' ' . espresso_user_meta($wp_user, 'user_lastname') : espresso_user_meta($wp_user, 'display_name'); ?></td>
                                            <?php } ?>
                                            <td class="author column-author"><?php echo $coupon_code_price ?></td>
                                            <td class="author column-author"><?php echo $use_percentage ?></td>
                                        </tr>
                                    <?php }
                                } ?>
                            </tbody>
                        </table>
                        <div style="clear:both">
                            <p><input type="checkbox" name="sAll" onclick="selectAll(this)" />
                                <strong>
                                    <?php _e('Check All', 'event_espresso'); ?>
                                </strong>
                                <input name="delete_discount" type="submit" class="button-secondary" id="delete_discount" value="<?php _e('Delete Promotional Code', 'event_espresso'); ?>" style="margin:10 0 0 10px;" onclick="return confirmDelete();">

                                <a  style="margin-left:5px"class="button-primary" href="admin.php?page=discounts&amp;action=new"><?php _e('Add New Promotional Code', 'event_espresso'); ?></a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

<script type="text/javascript">
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
                    null,
    <?php echo function_exists('espresso_is_admin') && espresso_is_admin() == true ? 'null,' : ''; ?>
                    null

                ]

            } );

        } );
// Add new promo code form validation
	jQuery(function(){
		jQuery("#new-promo-code").validate( {
		rules: {
		coupon_code: "required"
		},
		messages: {
		coupon_code: "Please add your promotional code"
		}
		});
	
		});
    </script>
    <?php
}
