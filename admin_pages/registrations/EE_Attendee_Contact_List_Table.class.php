<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * EE_Attendee_Contact_List_Table
 * List table for the EE_Attendee records in the admin.
 *
 * @package EventEspresso
 * @author  Darren Ethier
 */
class EE_Attendee_Contact_List_Table extends EE_Admin_List_Table
{
    /**
     * @var Registrations_Admin_Page
     */
    protected $_admin_page;


    /**
     * Initial setup of data (called by parent).
     *
     * @throws EE_Error
     */
    protected function _setup_data()
    {
        $this->_data = $this->_view !== 'trash'
            ? $this->_admin_page->get_attendees($this->_per_page)
            : $this->_admin_page->get_attendees($this->_per_page, false, true);

        $this->_all_data_count = $this->_view !== 'trash'
            ? $this->_admin_page->get_attendees($this->_per_page, true)
            : $this->_admin_page->get_attendees($this->_per_page, true, true);
    }


    /**
     * Initial setup of properties.
     */
    protected function _set_properties()
    {
        $this->_wp_list_args = [
            'singular' => esc_html__('attendee', 'event_espresso'),
            'plural'   => esc_html__('attendees', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        ];

        $this->_columns = [
            'cb'                 => '<input type="checkbox" />', // Render a checkbox instead of text
            'id'                 => esc_html__('ID', 'event_espresso'),
            'ATT_fname'          => esc_html__('First Name', 'event_espresso'),
            'ATT_lname'          => esc_html__('Last Name', 'event_espresso'),
            'ATT_email'          => esc_html__('Email Address', 'event_espresso'),
            'Registration_Count' => esc_html__('# Reg', 'event_espresso'),
            'ATT_phone'          => esc_html__('Phone', 'event_espresso'),
            'ATT_address'        => esc_html__('Address', 'event_espresso'),
            'ATT_city'           => esc_html__('City', 'event_espresso'),
            'STA_ID'             => esc_html__('State/Province', 'event_espresso'),
            'CNT_ISO'            => esc_html__('Country', 'event_espresso'),
        ];

        $this->_sortable_columns = [
            'id'                 => ['id' => false],
            'ATT_lname'          => ['ATT_lname' => true], // true means its already sorted
            'ATT_fname'          => ['ATT_fname' => false],
            'ATT_email'          => ['ATT_email' => false],
            'Registration_Count' => ['Registration_Count' => false],
            'ATT_city'           => ['ATT_city' => false],
            'STA_ID'             => ['STA_ID' => false],
            'CNT_ISO'            => ['CNT_ISO' => false],
        ];

        $this->_hidden_columns = [
            'ATT_phone',
            'ATT_address',
            'ATT_city',
            'STA_ID',
            'CNT_ISO',
        ];
    }


    /**
     * Initial setup of filters
     *
     * @return array
     */
    protected function _get_table_filters(): array
    {
        return [];
    }


    /**
     * Initial setup of counts for views
     *
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     * @throws EE_Error
     */
    protected function _add_view_counts()
    {
        $this->_views['in_use']['count'] = $this->_admin_page->get_attendees($this->_per_page, true);
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_contacts',
                'espresso_registrations_delete_registration'
            )
        ) {
            $this->_views['trash']['count'] = $this->_admin_page->get_attendees($this->_per_page, true, true);
        }
    }


    /**
     * Get count of attendees.
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _get_attendees_count(): int
    {
        return EEM_Attendee::instance()->count();
    }


    /**
     * Checkbox column
     *
     * @param EE_Attendee $item Unable to typehint this method because overrides parent.
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_cb($item): string
    {
        if (! $item instanceof EE_Attendee) {
            return '';
        }
        return sprintf(
            '<input type="checkbox" name="checkbox[%1$s]" value="%1$s" />',
            $item->ID()
        );
    }


    /**
     * @param EE_Attendee|null $attendee
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_id(?EE_Attendee $attendee): string
    {
        $content = '
            <span class="ee-entity-id">' . $attendee->ID() . '</span>
            <span class="show-on-mobile-view-only">
                ' . $this->editAttendeeLink($attendee->ID(), $attendee->full_name()) . '
            </span>';
        return $this->columnContent('id', $content, 'end');
    }


    /**
     * ATT_lname column
     *
     * @param EE_Attendee $attendee
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_ATT_lname(EE_Attendee $attendee): string
    {
        // edit attendee link
        $content = $this->editAttendeeLink($attendee->ID(), $attendee->lname());
        return $this->columnContent('ATT_lname', $content);
    }


    /**
     * @param int    $ID
     * @param string $attendee_name
     * @return string
     * @since   $VID:$
     */
    private function editAttendeeLink(int $ID, string $attendee_name): string
    {
        $edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
            [
                'action' => 'edit_attendee',
                'post'   => $ID,
            ],
            REG_ADMIN_URL
        );
        return EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_contacts',
            'espresso_registrations_edit_attendee'
        )
            ? '
            <a  href="' . $edit_lnk_url . '" 
                class="ee-aria-tooltip"
                aria-label="' . esc_attr__('Edit Contact', 'event_espresso') . '"
            >
                ' . $attendee_name . '
            </a>'
            : $attendee_name;
    }


    /**
     * ATT_fname column
     *
     * @param EE_Attendee $attendee
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws ReflectionException
     * @throws ReflectionException
     * @throws ReflectionException
     */
    public function column_ATT_fname(EE_Attendee $attendee): string
    {
        // Build row actions
        $actions = [];
        // edit attendee link
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_contacts',
                'espresso_registrations_edit_attendee'
            )
        ) {
            $actions['edit'] = $this->editAttendeeLink(
                $attendee->ID(),
                esc_html__('Edit Contact', 'event_espresso')
            );
        }

        if ($this->_view === 'in_use') {
            // trash attendee link
            if (
                EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_contacts',
                    'espresso_registrations_trash_attendees'
                )
            ) {
                $trash_lnk_url    = EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'action' => 'trash_attendee',
                        'ATT_ID' => $attendee->ID(),
                    ],
                    REG_ADMIN_URL
                );
                $actions['trash'] = '
                    <a  href="' . $trash_lnk_url . '" 
                        class="ee-aria-tooltip"
                        aria-label="' . esc_attr__('Move Contact to Trash', 'event_espresso') . '"
                    >
                        ' . esc_html__('Trash', 'event_espresso') . '
                    </a>';
            }
        } else {
            if (
                EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_contacts',
                    'espresso_registrations_restore_attendees'
                )
            ) {
                // restore attendee link
                $restore_lnk_url    = EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'action' => 'restore_attendees',
                        'ATT_ID' => $attendee->ID(),
                    ],
                    REG_ADMIN_URL
                );
                $actions['restore'] = '
                    <a  href="' . $restore_lnk_url . '" 
                        class="ee-aria-tooltip"
                        aria-label="' . esc_attr__('Restore Contact', 'event_espresso') . '"
                    >
                        ' . esc_html__('Restore', 'event_espresso') . '
                    </a>';
            }
        }

        $name_link    = $this->editAttendeeLink($attendee->ID(), $attendee->fname());

        // Return the name contents
        $content = sprintf('%1$s %2$s', $name_link, $this->row_actions($actions));
        return $this->columnContent('ATT_fname', $content);
    }


    /**
     * Email Column
     *
     * @param EE_Attendee $attendee
     * @return string
     * @throws EE_Error
     */
    public function column_ATT_email(EE_Attendee $attendee): string
    {
        $content = '<a href="mailto:' . $attendee->email() . '">' . $attendee->email() . '</a>';
        return $this->columnContent('ATT_email', $content);
    }


    /**
     * Column displaying count of registrations attached to Attendee.
     *
     * @param EE_Attendee $attendee
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_Registration_Count(EE_Attendee $attendee): string
    {
        $link = EEH_URL::add_query_args_and_nonce(
            [
                'action' => 'default',
                'ATT_ID' => $attendee->ID(),
            ],
            REG_ADMIN_URL
        );
        $content = '<a href="' . $link . '">' . $attendee->getCustomSelect('Registration_Count') . '</a>';
        return $this->columnContent('Registration_Count', $content, 'end');
    }


    /**
     * ATT_address column
     *
     * @param EE_Attendee $attendee
     * @return string
     * @throws EE_Error
     */
    public function column_ATT_address(EE_Attendee $attendee): string
    {
        return $this->columnContent('ATT_address', $attendee->address());
    }


    /**
     * ATT_city column
     *
     * @param EE_Attendee $attendee
     * @return string
     * @throws EE_Error
     */
    public function column_ATT_city(EE_Attendee $attendee): string
    {
        return $this->columnContent('ATT_city', $attendee->city());
    }


    /**
     * State Column
     *
     * @param EE_Attendee $attendee
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_STA_ID(EE_Attendee $attendee): string
    {
        $states = EEM_State::instance()->get_all_states();
        $state  = isset($states[ $attendee->state_ID() ])
            ? $states[ $attendee->state_ID() ]->get('STA_name')
            : $attendee->state_ID();
        $content = ! is_numeric($state) ? $state : '';
        return $this->columnContent('STA_ID', $content);
    }


    /**
     * Country Column
     *
     * @param EE_Attendee $attendee
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws ReflectionException
     */
    public function column_CNT_ISO(EE_Attendee $attendee): string
    {
        $countries = EEM_Country::instance()->get_all_countries();
        $country   = isset($countries[ $attendee->country_ID() ])
            ? $countries[ $attendee->country_ID() ]->get('CNT_name')
            : $attendee->country_ID();
        $content = ! is_numeric($country) ? $country : '';
        return $this->columnContent('CNT_ISO', $content);
    }


    /**
     * Phone Number column
     *
     * @param EE_Attendee $attendee
     * @return string
     * @throws EE_Error
     */
    public function column_ATT_phone(EE_Attendee $attendee): string
    {
        return $this->columnContent('ATT_phone', $attendee->phone());
    }
}
