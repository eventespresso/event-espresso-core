<?php if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 * @ package            Event Espresso
 * @ author            Event Espresso
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link                    http://www.eventespresso.com
 * @ version            4.0
 * ------------------------------------------------------------------------
 * EE_WP_User_Field
 *
 * @package               Event Espresso
 * @subpackage            /core/db_models/fields
 * @author                Mike Nelson
 *                        Child of EE_Foreign_key_Int_Field, except dynamically gets the default value
 *                        from get_current_user_id(), and no need to specify which models this field points to
 *                        because it always points to WP_User model
 *                        ------------------------------------------------------------------------
 */
class EE_WP_User_Field extends EE_Foreign_Key_Int_Field
{
    /**
     * No need to provide a default or the model pointed to- the default is
     * always get_current_user_id() and the model pointed to is always WP_User
     *
     * @param string  $table_column name fo column for field
     * @param string  $nicename     should eb internationalized with __('blah','event_espresso')
     * @param boolean $nullable
     */
    function __construct($table_column, $nicename, $nullable)
    {
        parent::__construct($table_column, $nicename, $nullable, null, 'WP_User');
    }

    /**
     * Gets the default which is always the current user. This can't be set when initially
     * constructing the model field because that's done before $current_user is set
     *
     * @return mixed
     */
    function get_default_value()
    {
        if (did_action('init')) {
            return get_current_user_id();
        } else {
            EE_Error::doing_it_wrong('EE_WP_User_Field::get_default_value',
                __('You cant get a default value for a wp_User_Field because the "init" action is called, because current_user global hasnt yet been setup. Consider doing your business logic on the "init" hook or later.',
                    'event_espresso'), '4.6.20');
            return 1;
        }
    }
}