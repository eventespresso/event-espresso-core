<?php

use EventEspresso\core\services\orm\ModelFieldFactory;

/**
 * WP User Model. Not intended to replace WP_User, but this just allows
 * for EE model queries to more easily integrate with the WP User table
 *
 * @package               Event Espresso
 * @subpackage            includes/models/
 * @author                Michael Nelson
 */
class EEM_WP_User extends EEM_Base
{

    /**
     * private instance of the EEM_WP_User object
     *
     * @type EEM_WP_User
     */
    protected static $_instance;


    /**
     *    constructor
     *
     * @param null              $timezone
     * @param ModelFieldFactory $model_field_factory
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    protected function __construct($timezone = null, ModelFieldFactory $model_field_factory)
    {
        $this->singular_item = esc_html__('WP_User', 'event_espresso');
        $this->plural_item = esc_html__('WP_Users', 'event_espresso');
        global $wpdb;
        $this->_tables = array(
            'WP_User' => new EE_Primary_Table($wpdb->users, 'ID', true),
        );
        $this->_fields = array(
            'WP_User' => array(
                'ID'                  => $model_field_factory->createPrimaryKeyIntField(
                    'ID',
                    esc_html__('WP_User ID', 'event_espresso')
                ),
                'user_login'          => $model_field_factory->createPlainTextField(
                    'user_login',
                    esc_html__('User Login', 'event_espresso'),
                    false
                ),
                'user_pass'           => $model_field_factory->createPlainTextField(
                    'user_pass',
                    esc_html__('User Password', 'event_espresso'),
                    false
                ),
                'user_nicename'       => $model_field_factory->createPlainTextField(
                    'user_nicename',
                    esc_html__(' User Nice Name', 'event_espresso'),
                    false
                ),
                'user_email'          => $model_field_factory->createEmailField(
                    'user_email',
                    esc_html__('User Email', 'event_espresso'),
                    false,
                    null
                ),
                'user_registered'     => $model_field_factory->createDatetimeField(
                    'user_registered',
                    esc_html__('Date User Registered', 'event_espresso'),
                    $timezone
                ),
                'user_activation_key' => $model_field_factory->createPlainTextField(
                    'user_activation_key',
                    esc_html__('User Activation Key', 'event_espresso'),
                    false
                ),
                'user_status'         => $model_field_factory->createIntegerField(
                    'user_status',
                    esc_html__('User Status', 'event_espresso')
                ),
                'display_name'        => $model_field_factory->createPlainTextField(
                    'display_name',
                    esc_html__('Display Name', 'event_espresso'),
                    false
                ),
            ),
        );
        $this->_model_relations = array(
            'Attendee'       => new EE_Has_Many_Relation(),
            // all models are related to the change log
            // 'Change_Log'     => new EE_Has_Many_Relation(),
            'Event'          => new EE_Has_Many_Relation(),
            'Message'        => new EE_Has_Many_Relation(),
            'Payment_Method' => new EE_Has_Many_Relation(),
            'Price'          => new EE_Has_Many_Relation(),
            'Price_Type'     => new EE_Has_Many_Relation(),
            'Question'       => new EE_Has_Many_Relation(),
            'Question_Group' => new EE_Has_Many_Relation(),
            'Ticket'         => new EE_Has_Many_Relation(),
            'Venue'          => new EE_Has_Many_Relation(),
        );
        $this->foreign_key_aliases = [
            'Event.EVT_wp_user'          => 'WP_User.ID',
            'Payment_Method.PMD_wp_user' => 'WP_User.ID',
            'Price.PRC_wp_user'          => 'WP_User.ID',
            'Price_Type.PRT_wp_user'     => 'WP_User.ID',
            'Question.QST_wp_user'       => 'WP_User.ID',
            'Question_Group.QSG_wp_user' => 'WP_User.ID',
            'Ticket.VNU_wp_user'         => 'WP_User.ID',
            'Venue.TKT_wp_user'          => 'WP_User.ID',
        ];
        $this->_wp_core_model = true;
        $this->_caps_slug = 'users';
        $this->_cap_contexts_to_cap_action_map[ EEM_Base::caps_read ] = 'list';
        $this->_cap_contexts_to_cap_action_map[ EEM_Base::caps_read_admin ] = 'list';
        foreach ($this->_cap_contexts_to_cap_action_map as $context => $action) {
            $this->_cap_restriction_generators[ $context ] = new EE_Restriction_Generator_WP_User();
        }
        // @todo: account for create_users controls whether they can create users at all
        parent::__construct($timezone);
    }


    /**
     * We don't need a foreign key to the WP_User model, we just need its primary key
     *
     * @return string
     * @throws EE_Error
     */
    public function wp_user_field_name()
    {
        return $this->primary_key_name();
    }


    /**
     * This WP_User model IS owned, even though it doesn't have a foreign key to itself
     *
     * @return boolean
     */
    public function is_owned()
    {
        return true;
    }
}
