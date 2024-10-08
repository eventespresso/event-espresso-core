<?php

/**
 * Populates the new wp_user related fields for existing records in the db  for price types,
 * (introduced in this version, 4.5.0).
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage migrations
 */
class EE_DMS_4_5_0_update_wp_user_for_price_types extends EE_Data_Migration_Script_Stage_Table
{
    public function __construct()
    {
        global $wpdb;
        $this->_pretty_name = esc_html__("Price Types", "event_espresso");
        $this->_old_table   = $wpdb->prefix . "esp_price_type";
        parent::__construct();
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _migrate_old_row($old_row)
    {
        // foreach ticket row we add the id for the current logged in user.
        global $wpdb;
        $user_id = EEH_Activation::get_default_creator_id();
        $user_id = $user_id ?: 0;
        $updated = $wpdb->update(
            $this->_old_table,
            ['PRT_wp_user' => $user_id],
            ['PRT_ID' => $old_row['PRT_ID']],
            ['%d'], // PRT_wp_user
            ['%d']  // PRT_ID
        );
        if (false === $updated) {
            $this->add_error(
                sprintf(
                    esc_html__(
                        "Error in updating table %s setting PRT_wp_user = %d where PRT_ID = %d",
                        'event_espresso'
                    ),
                    $this->_old_table,
                    $user_id,
                    $old_row['PRT_ID']
                )
            );
        }
    }
}
