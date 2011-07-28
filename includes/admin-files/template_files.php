<?php
//Template customization
?>
<li>
    <div class="metabox-holder">
        <div class="postbox">
            <h3>
                <?php _e("Template Customization", 'event_espresso'); ?>
            </h3>

            <div class="padding">
                <?php
                if (isset($_REQUEST['event_espresso_admin_action']) && $_REQUEST['event_espresso_admin_action'] == 'copy_templates') {
                    add_action('admin_init', 'event_espresso_smartCopy');
                }
                ?>
                <?php
                if (isset($_SESSION['event_espresso_themes_copied']) && $_SESSION['event_espresso_themes_copied'] == true) {
                    ?>
                    <div class="updated fade below-h2" id="message" style="background-color: rgb(255, 251, 204); border:#999 solid 1px; padding:2px;">
                        <p>
                    <?php _e("Your templates have been copied."); ?>
                        </p>
                    </div>
                    <?php
                    $_SESSION['event_espresso_themes_copied'] = false;
                }
                ?>
                <?php
                $files = array('attendee_list.php', 'event_list.php', 'event_list_display.php', 'event_post.php', 'payment_page.php', 'registration_page.php', 'registration_page_display.php', 'confirmation_display.php', 'return_payment.php', 'widget.php');
                //echo EVENT_ESPRESSO_TEMPLATE_DIR . $files[3];
                if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[0]) || file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[1]) || file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[2]) || file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[3]) || file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[4]) || file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[5]) || file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[6]) || file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[7]) || file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[8]) || file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[9])) {
                    ?>
                    <p>
    <?php _e("Modifying your event listings and registration pages is easy."); ?>
                    </p>
                    <p>
    <?php _e("You just need to edit the appropriate files in the following location.", 'event_espresso'); ?>
                    </p>
                    <p> <span class="green_alert">
                            <?php _e("Path:", 'event_espresso'); ?>
    <?php echo str_replace(ABSPATH, "", EVENT_ESPRESSO_TEMPLATE_DIR); ?></span> </p>
                    <div  style="border: 1px solid #999; background:#F0F0F0; padding:5px; width:90%;">
                        <p><strong>
    <?php _e('Current Template Files', 'event_espresso'); ?>
                                :</strong> </p>
                        <ul>
                            <?php
                            foreach ($files as $file) {
                                switch ($file) {
                                    case 'attendee_list.php':
                                        $info = __('(displays a list of attendees)', 'event_espresso');
                                        break;
                                    case 'event_list.php':
                                        $info = __('(logic for displaying the list of events)', 'event_espresso');
                                        break;
                                    case 'event_list_display.php':
                                        $info = __('(displays a list of events)', 'event_espresso');
                                        break;
                                    case 'event_post.php':
                                        $info = __('(create-a-post template)', 'event_espresso');
                                        break;
                                    case 'payment_page.php':
                                        $info = __('(displays your payment page text)', 'event_espresso');
                                        break;
                                    case 'registration_page.php':
                                        $info = __('(logic for displaying the registration form)', 'event_espresso');
                                        break;
                                    case 'registration_page_display.php':
                                        $info = __('(displays your registration form)', 'event_espresso');
                                        break;
                                    case 'confirmation_display.php':
                                        $info = __('(displays a confimration page for free events)', 'event_espresso');
                                        break;
                                    case 'return_payment.php':
                                        $info = __('(page that is displayed when returning to pay)', 'event_espresso');
                                        break;
                                    case 'widget.php':
                                        $info = __('(creates a widget for use in your theme)', 'event_espresso');
                                        break;
                                    default:
                                        $info = '';
                                        break;
                                }
                                if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $file)) {
                                    ?>
                                    <li><strong style="color:#090"><?php _e($file . ' - Moved', 'event_espresso'); ?></strong> - <?php echo $info; ?></li>
                                        <?php } else { ?>
                                    <li><strong style="color:#F00">
                                    <?php _e($file . ' - Not Moved', 'event_espresso'); ?></strong> - <?php echo $info; ?></li>

                                    <?php
                                }
                            }
                            ?>
                        </ul>
                        <p class="red_alert">
    <?php _e('Remember, if updates are made or features are added to these templates in the future. You will need to make the updates to your customized templates.', 'event_espresso'); ?>
                        </p>
                    </div>
                    <?php
                } else if (!is_writable(EVENT_ESPRESSO_TEMPLATE_DIR)) {
                    ?>
                    <p>
    <?php _e('In order to use this this feature, you will need to move the files located in the', 'event_espresso'); ?> <span class="display-path"><strong><?php echo EVENT_ESPRESSO_PLUGINFULLPATH ?>templates/</strong></span> <?php _e('directory into the', 'event_espresso'); ?> <span class="display-path"><strong><?php echo EVENT_ESPRESSO_TEMPLATE_DIR ?></strong></span> <?php _e('directory', 'event_espresso'); ?>.
                    </p>
                    <p class="fugue f-error">
    <?php _e("The permissions on your templates directory are incorrect.", 'event_espresso'); ?>
                    </p>
                    <p class="fugue f-error">
    <?php _e("To move your files automatically, please set the permissions to 775 on the following directory.", 'event_espresso'); ?>
                        <br />
                        <br />
                        <span class='display-path'><strong>
                    <?php _e("Path:", 'event_espresso'); ?>
                            </strong> <?php echo EVENT_ESPRESSO_TEMPLATE_DIR; ?> </span></p>
                    <?php
                } else {
                    ?>
                    <p>
    <?php _e('If you plan on modifying the look of your event listings, registration page, or attendee list. Use the option below to move these templates to a safe place. Keep in mind, if updates are made or features are added to these templates in the future. You will need to make the updates to your customized templates.', 'event_espresso'); ?>
                    </p>
                    <p class="fugue f-warn">
    <?php _e("Your template files have not been moved.", 'event_espresso'); ?>
                    </p>
                    <p class="updated"><?php printf(__("Click here to <a href='%s'>Move your files</a> to a safe place.", 'event_espresso'), wp_nonce_url("admin.php?event_espresso_admin_action=copy_templates", 'copy_templates')); ?> </p>
                    <?php
                }
                ?>

            </div>
        </div>
    </div>
    
</li>
