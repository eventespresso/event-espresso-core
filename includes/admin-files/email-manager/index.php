<?php
require_once("add_new.php");
require_once("edit.php");
require_once("update.php");
require_once("add_to_db.php");

function event_espresso_ticket_config_mnu() {
    global $wpdb, $current_user, $espresso_premium;
    ?>


    <div class="wrap">
        <div id="icon-options-event" class="icon32"> </div>
        <h2><?php echo _e('Manage Event Tickets', 'event_espresso') ?>
            <?php
            if (!isset($_REQUEST['action']) || ($_REQUEST['action'] != 'edit' && $_REQUEST['action'] != 'add_new_ticket')) {
                echo '<a href="admin.php?page=event_tickets&amp;action=add_new_ticket" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Ticket', 'event_espresso') . '</a>';
            }
            ?>
        </h2>
        <div id="poststuff" class="metabox-holder has-right-sidebar">
            <?php event_espresso_display_right_column(); ?>
            <div id="post-body">
                <div id="post-body-content">


                    <?php
                    if (!empty($_POST['delete_ticket'])) {
                        if (is_array($_POST['checkbox'])) {
                            while (list($key, $value) = each($_POST['checkbox'])):
                                $del_id = $key;
                                //Delete ticket data
                                $sql = "DELETE FROM " . EVENTS_TICKET_TABLE . " WHERE id='$del_id'";
                                $wpdb->query($sql);
                            endwhile;
                        }
                        ?>
                        <div id="message" class="updated fade">
                            <p><strong>
                                    <?php _e('Ticketss have been successfully deleted.', 'event_espresso'); ?>
                                </strong></p>
                        </div>
                    <?php } ?>
                    <?php
                    if (isset($_REQUEST['action'])) {
                        switch ($_REQUEST['action']) {
                            case 'update':
                                update_event_ticket();
                                break;
                            case 'add':
                                add_ticket_to_db();
                                break;
                            case 'add_new_ticket':
                                add_new_event_ticket();
                                break;
                            case 'edit':
                                edit_event_ticket();
                                break;
                        }
                    }
                    ?>

                    <p><?php _e('Create customized tickets for use in multiple events.', 'event_espresso'); ?></p>
                    <form id="form1" name="form1" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
                        <table id="table" class="widefat manage-tickets">
                            <thead>
                                <tr>
                                    <th class="manage-column column-cb check-column" id="cb" scope="col" style="width:3.5%;"><input type="checkbox"></th>
                                    <th class="manage-column column-comments num" id="id" style="padding-top:7px; width:3.5%;" scope="col" title="Click to Sort"><?php _e('ID', 'event_espresso'); ?></th>
                                    <th class="manage-column column-title" id="name" scope="col" title="Click to Sort" style="width:60%;"><?php _e('Name', 'event_espresso'); ?></th>
                                    <?php if (function_exists('espresso_is_admin') && espresso_is_admin() == true) { ?>
                                        <th class="manage-column column-creator" id="creator" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Creator', 'event_espresso'); ?></th>
                                    <?php } ?>
                                    <th class="manage-column column-title" id="action" scope="col" title="Click to Sort" style="width:30%;"><?php _e('Action', 'event_espresso'); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $sql = "SELECT * FROM " . EVENTS_TICKET_TABLE . " e";
                                if (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_event_manager' || espresso_member_data('role') == 'espresso_group_admin')) {
                                    $sql .= " JOIN $wpdb->users u on u.ID = e.wp_user WHERE e.wp_user = " . $current_user->ID;
                                }
                                $wpdb->query($sql);
                                if ($wpdb->num_rows > 0) {
                                    $results = $wpdb->get_results($sql . " ORDER BY e.id ASC");
                                    foreach ($results as $result) {
                                        $ticket_id = $result->id;
                                        $ticket_name = stripslashes($result->ticket_name);
                                        $ticket_text = stripslashes($result->ticket_text);
                                        $wp_user = $result->wp_user;
                                        ?>
                                        <tr>
<td><input name="checkbox[<?php echo $ticket_id ?>]" type="checkbox"  title="Delete <?php echo stripslashes($ticket_name) ?>"></td>
                                            <td><?php echo $ticket_id ?></td>
                                             <td class="post-title page-title column-title"><strong><a href="admin.php?page=event_tickets&action=edit&id=<?php echo $ticket_id ?>"><?php echo $ticket_name?></a></strong>
              <div class="row-actions"><span class="edit"><a href="admin.php?page=event_tickets&action=edit&id=<?php echo $ticket_id ?>"><?php _e('Edit', 'event_espresso'); ?></a> | </span><span class="delete"><a onclick="return confirmDelete();" class="delete submitdelete" href="admin.php?page=event_tickets&action=delete_ticket&id=<?php echo $ticket_id?>"><?php _e('Delete', 'event_espresso'); ?></a></span></div>
              </td>                                            <?php if (function_exists('espresso_user_meta') && espresso_is_admin() == true) { ?>
                                                <td><?php echo espresso_user_meta($wp_user, 'user_firstname') != '' ? espresso_user_meta($wp_user, 'user_firstname') . ' ' . espresso_user_meta($wp_user, 'user_lastname') : espresso_user_meta($wp_user, 'display_name'); ?></td>
                                            <?php } ?>
                                            <td><a href="admin.php?page=event_tickets&action=edit&id=<?php echo $ticket_id ?>">
                                                    <?php _e('Edit Ticket', 'event_espresso'); ?>
                                                </a></td>
                                        </tr>
                                    <?php }
                                } ?>
                            </tbody>
                        </table>
                        <p>

                            <input type="checkbox" name="sAll" onclick="selectAll(this)" />
                            <strong>
                                <?php _e('Check All', 'event_espresso'); ?>
                            </strong>
                            <input name="delete_ticket" type="submit" class="button-secondary" id="delete_ticket" value="<?php _e('Delete Ticket', 'event_espresso'); ?>" style="margin-left:100px;" onclick="return confirmDelete();"> <?php echo '<a href="admin.php?page=event_tickets&amp;action=add_new_ticket" style="margin-left:5px"class="button-primary">' . __('Add New Ticket', 'event_espresso') . '</a>';?>
                        </p>
                    </form>
                </div>
            </div>
        </div>
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
                    null

                ]

            } );

        } );
    </script>

    <?php
    echo event_espresso_custom_ticket_info();
}
