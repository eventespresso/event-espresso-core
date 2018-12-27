<?php

use EventEspresso\ui\browser\checkins\entities\CheckinStatusDashicon;

/**
 * EE_Registration_CheckIn_List_Table
 * This class handles all the logic for the display of the Check-in List table.  When viewed, all Check-ins for a given
 * registration are displayed.
 *
 * @package            Event Espresso
 * @subpackage         includes/core/admin/registrations/EE_Registration_CheckIn_List_Table
 * @author             Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Registration_CheckIn_List_Table extends EE_Admin_List_Table
{


    public function __construct($admin_page)
    {
        parent::__construct($admin_page);
    }


    protected function _setup_data()
    {
        $this->_data = $this->_get_checkins($this->_per_page);
        $this->_all_data_count = $this->_get_checkins($this->_per_page, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => __('check-in', 'event_espresso'),
            'plural'   => __('check-ins', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );

        $this->_columns = array(
            'cb'            => '<input type="checkbox" />', // Render a checkbox instead of text
            'CHK_in'        => __('Check-In', 'event_espresso'),
            'CHK_timestamp' => __('Timestamp', 'event_espresso'),
        );

        $this->_sortable_columns = array(
            'CHK_timestamp' => array('CHK_timestamp' => true),
        );

        $this->_primary_column = 'CHK_in';

        $this->_hidden_columns = array();
    }


    protected function _get_table_filters()
    {
        return array();
    }

    // remove the search box
    public function search_box($text, $input_id)
    {
        return '';
    }


    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_get_checkins(null, true);
    }


    public function column_cb($item)
    {
        return sprintf('<input type="checkbox" name="checkbox[%1$s]" />', $item->ID());
    }


    public function column_CHK_in(EE_Checkin $item)
    {
        $checkin_status_dashicon = CheckinStatusDashicon::fromCheckin($item);
        return '<span class="' . $checkin_status_dashicon->cssClasses() . '"></span><span class="show-on-mobile-view-only">' . $item->get_datetime('CHK_timestamp') . '</span>';
    }


    public function column_CHK_timestamp(EE_Checkin $item)
    {
        $actions = array();
        $delete_url = EE_Admin_Page::add_query_args_and_nonce(array('action'  => 'delete_checkin_row',
                                                                    'DTT_ID'  => $this->_req_data['DTT_ID'],
                                                                    '_REG_ID' => $this->_req_data['_REG_ID'],
                                                                    'CHK_ID'  => $item->ID(),
        ));
        $actions['delete_checkin'] = EE_Registry::instance()->CAP->current_user_can(
            'ee_delete_checkins',
            'espresso_registrations_delete_checkin_row'
        )
            ? '<a href="' . $delete_url . '" title="'
              . esc_attr__('Click here to delete this check-in record', 'event_espresso') . '">'
              . __('Delete', 'event_espresso') . '</a>'
            : '';

        return sprintf('%1$s %2$s', $item->get_datetime('CHK_timestamp'), $this->row_actions($actions));
    }


    /**
     * This retrieves all the Check-ins for the given parameters.
     * experimenting with having the query for the table values within the list table.
     *
     * @access protected
     * @param int  $per_page How many to retrieve per page
     * @param bool $count    Whether to return a count or not
     * @return EE_Checkin[]|int
     */
    protected function _get_checkins($per_page = 10, $count = false)
    {
        $REG_ID = isset($this->_req_data['_REG_ID']) ? $this->_req_data['_REG_ID'] : false;
        $DTT_ID = isset($this->_req_data['DTT_ID']) ? $this->_req_data['DTT_ID'] : false;

        // if user does not have the capability for the checkins for this registration then get out!
        if (! EE_Registry::instance()->CAP->current_user_can(
            'ee_read_checkin',
            'espresso_registrations_registration_checkins',
            $REG_ID
        )) {
            return $count ? 0 : array();
        }

        // if no reg id then get out cause need a reg id
        if (empty($REG_ID) || empty($DTT_ID)) {
            throw new EE_Error(
                __(
                    'This route cannot be viewed unless registration and datetime IDs are included in the request (via REG_ID and DTT_ID parameters)',
                    'event_espresso'
                )
            );
        }

        // set orderby
        $orderby = 'CHK_timestamp'; // note that with this table we're only providing the option to orderby the timestamp value.

        $order = ! empty($this->_req_data['order']) ? $this->_req_data['order'] : 'ASC';

        $current_page = isset($this->_req_data['paged']) && ! empty($this->_req_data['paged']) ? $this->_req_data['paged'] : 1;
        $per_page = isset($this->_req_data['perpage']) && ! empty($this->_req_data['perpage']) ? $this->_req_data['perpage'] : $per_page;
        $limit = null;
        if (! $count) {
            $offset = ($current_page - 1) * $per_page;
            $limit = array($offset, $per_page);
        }

        $_where = array(
            'REG_ID' => $REG_ID,
            'DTT_ID' => $DTT_ID,
        );

        $query_params = array($_where, 'order_by' => array($orderby => $order), 'limit' => $limit);

        // if no per_page value then we just want to return a count of all Check-ins
        if ($count) {
            return EEM_Checkin::instance()->count(array($_where));
        }

        return $count
            ? EEM_Checkin::instance()->count(array($_where))
            : EEM_Checkin::instance()->get_all($query_params);
    }
}
