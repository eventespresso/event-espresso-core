<ul><li>
        <div class="metabox-holder">
            <div class="postbox">
                <h3>
                    <?php _e("Developers Section", 'event_espresso'); ?>
                </h3>

                <div class="padding">
                    <?php
                    if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/index.php")) {
                        ?>
                        <p class="red_alert">
                            <?php _e('Remember, if updates are made or features are added to these gateways in the future. You will need to make the updates to your customized gateways.', 'event_espresso'); ?>
                        </p>
                        <p>
                            <?php _e("Modifying and adding payment gateways is easy.", 'event_espresso'); ?>
                        </p>
                        <p>
                            <?php _e("You just need to add/edit the appropriate files in the following location.", 'event_espresso'); ?>
                        </p>
                        <p> <span class="green_alert">
                                <?php _e("Path:", 'event_espresso'); ?>
                                <?php echo str_replace(ABSPATH, "", EVENT_ESPRESSO_GATEWAY_DIR); ?></span> </p>
                        <?php
                    } else {
                        if (isset($_REQUEST['event_espresso_admin_action']) && $_REQUEST['event_espresso_admin_action'] == 'copy_gateways') {
                            add_action('admin_init', 'event_espresso_smartCopy');
                        }
                        if (isset($_SESSION['event_espresso_gateways_copied']) && $_SESSION['event_espresso_gateways_copied'] == true) {
                            ?>
                            <div class="updated fade below-h2" id="message" style="background-color: rgb(255, 251, 204);">
                                <p><?php _e("Your gateways have been moved.", 'event_espresso'); ?></p>
                            </div>
                            <?php
                            $_SESSION['event_espresso_gateways_copied'] = false;
                        }

                        if (@event_espresso_count_files(EVENT_ESPRESSO_GATEWAY_DIR) > 0) {

                            if (!is_writable(EVENT_ESPRESSO_GATEWAY_DIR)) {
                                ?>
                                <p class="fugue f-error"><?php _e("The permissions on your templates directory are incorrect.", 'event_espresso'); ?> </p>
                                <p class="fugue f-error"><?php _e("Please set the permissions to 775 on the following directory.", 'event_espresso'); ?><br /><br />
                                    <span class='display-path'><strong><?php _e("Path:", 'event_espresso'); ?></strong> <?php echo str_replace(ABSPATH, "", EVENT_ESPRESSO_GATEWAY_DIR); ?> </span></p>
                                <?php
                            }
                        } else {
                            ?>
                            <p><?php _e('If you plan on adding additional payment gateways. Please use the link below to move your gateway files to a safe place. Only use this option if you absolutely need to or instructed to by a represntative from Event Espresso. ', 'event_espresso'); ?></p>
                            <p class="fugue f-warn"><?php _e("Your gateway files have not been moved.", 'event_espresso'); ?></p>
                            <?php if (!is_writable(EVENT_ESPRESSO_GATEWAY_DIR)) { ?>
                                <p>
                                    <?php _e('In order to use this this feature, you will need to move the files located in the', 'event_espresso'); ?> <span class="display-path"><strong><?php echo EVENT_ESPRESSO_PLUGINFULLPATH ?>gateways/</strong></span> <?php _e('directory into the', 'event_espresso'); ?> <span class="display-path"><strong><?php echo EVENT_ESPRESSO_GATEWAY_DIR ?></strong></span> <?php _e('directory', 'event_espresso'); ?>.
                                </p>
                                <p class="fugue f-error">
                                    <?php _e("The permissions on your GATEWAYs directory are incorrect.", 'event_espresso'); ?>
                                </p>
                                <p class="fugue f-error">
                                    <?php _e("To move your files automatically, please set the permissions to 775 on the following directory.", 'event_espresso'); ?>
                                    <br />
                                    <br />
                                    <span class='display-path'><strong>
                                            <?php _e("Path:", 'event_espresso'); ?>
                                        </strong> <?php echo EVENT_ESPRESSO_GATEWAY_DIR; ?> </span></p>
                            <?php } else { ?>
                                <p class="updated"><?php printf(__("Click here to <a href='%s'>Move your files</a> to a safe place.", 'event_espresso'), wp_nonce_url("admin.php?event_espresso_admin_action=copy_gateways", 'copy_gateways')); ?> </p>
                            <?php
                            }
                        }
                    }
                    ?>
                </div>
            </div>
        </div>
    </li></ul>