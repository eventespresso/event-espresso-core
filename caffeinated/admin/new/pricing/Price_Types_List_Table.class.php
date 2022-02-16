<?php

/**
 * Price_Types_List_Table
 *
 * Class for preparing the table listing all the event categories
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package     Event_Categories_Admin_List_Table
 * @subpackage  includes/core/admin/pricing_manager/Prices_List_Table.core.php
 * @author      Brent Christensen
 */
class Price_Types_List_Table extends EE_Admin_List_Table
{
    /**
     * @var Pricing_Admin_Page
     */
    protected $_admin_page;


    protected function _setup_data()
    {
        $trashed               = $this->_admin_page->get_view() == 'trashed';
        $this->_data           = $this->_admin_page->get_price_types_overview_data($this->_per_page, false, $trashed);
        $this->_all_data_count = $this->_admin_page->get_price_types_overview_data($this->_per_page, true);
        $this->_trashed_count  = $this->_admin_page->get_price_types_overview_data($this->_per_page, true, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = [
            'singular' => esc_html__('price type', 'event_espresso'),
            'plural'   => esc_html__('price types', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        ];

        $this->_columns = [
            'cb'        => '<input type="checkbox" />', // Render a checkbox instead of text
            'id'        => esc_html__('ID', 'event_espresso'),
            'name'      => esc_html__('Name', 'event_espresso'),
            'base_type' => '<div class="jst-cntr">' . esc_html__('Base Type', 'event_espresso') . '</div>',
            'percent'   => '<div class="jst-cntr">'
                           . sprintf(
                               /* translators: 1: HTML new line, 2: open span tag, 3: close span tag */
                               esc_html__('Applied %1$s as %2$s%%%3$s or %2$s$%3$s', 'event_espresso'),
                               '',
                               '<span class="big-text">',
                               '</span>'
                           )
                           . '</div>',
            'order'     => '<div class="jst-cntr">'
                           . sprintf(
                               /* translators: HTML new line */
                               esc_html__('Order of %s Application', 'event_espresso'),
                               ''
                           )
                           . '</div>',
        ];

        $this->_sortable_columns = [
            // TRUE means its already sorted
            'name' => ['name' => false],
        ];

        $this->_hidden_columns = [];
    }


    protected function _get_table_filters()
    {
    }


    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_all_data_count;
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_default_price_types',
                'pricing_trash_price_type'
            )
        ) {
            $this->_views['trashed']['count'] = $this->_trashed_count;
        }
    }


    public function column_cb($item): string
    {
        if ($item->base_type() !== 1) {
            return sprintf(
                '<input type="checkbox" name="checkbox[%1$s]" />',
                $item->ID()
            );
        }
        return '';
    }


    /**
     * @param EE_Price_Type $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_id(EE_Price_Type $item): string
    {
        $content = $item->ID();
        $content .= '  <span class="show-on-mobile-view-only">' . $item->name() . '</span>';
        return $this->columnContent('id', $content, 'end');
    }


    public function column_name($item): string
    {

        // Build row actions
        $actions   = [];
        $name_link = $item->name();
        // edit price link
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_default_price_type',
                'pricing_edit_price_type',
                $item->ID()
            )
        ) {
            $edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action' => 'edit_price_type',
                    'id'     => $item->ID(),
                ],
                PRICING_ADMIN_URL
            );

            $name_link = '<a href="' . $edit_lnk_url . '" aria-label="'
                         . sprintf(
                             /* translators: The name of the price type */
                             esc_attr__('Edit Price Type (%s)', 'event_espresso'),
                             $item->name()
                         )
                         . '">'
                         . stripslashes($item->name()) . '</a>';

            $actions['edit'] = '<a href="' . $edit_lnk_url . '" aria-label="'
                               . sprintf(
                                   /* translators: The name of the price type */
                                   esc_attr__('Edit Price Type (%s)', 'event_espresso'),
                                   $item->name()
                               )
                               . '">'
                               . esc_html__('Edit', 'event_espresso') . '</a>';
        }

        if ($item->base_type() !== 1) {
            if ($this->_view == 'all') {
                // trash price link
                if (
                    EE_Registry::instance()->CAP->current_user_can(
                        'ee_delete_default_price_type',
                        'pricing_trash_price_type',
                        $item->ID()
                    )
                ) {
                    $trash_lnk_url    = EE_Admin_Page::add_query_args_and_nonce(
                        [
                            'action'   => 'trash_price_type',
                            'id'       => $item->ID(),
                            'noheader' => true,
                        ],
                        PRICING_ADMIN_URL
                    );
                    $actions['trash'] = '<a href="' . $trash_lnk_url . '" aria-label="'
                                        . sprintf(
                                            /* translators: The name of the price type */
                                            esc_attr__('Move Price Type %s to Trash', 'event_espresso'),
                                            $item->name()
                                        )
                                        . '">'
                                        . esc_html__('Move to Trash', 'event_espresso') . '</a>';
                }
            } else {
                // restore price link
                if (
                    EE_Registry::instance()->CAP->current_user_can(
                        'ee_delete_default_price_type',
                        'pricing_restore_price_type',
                        $item->ID()
                    )
                ) {
                    $restore_lnk_url    = EE_Admin_Page::add_query_args_and_nonce(
                        [
                            'action'   => 'restore_price_type',
                            'id'       => $item->ID(),
                            'noheader' => true,
                        ],
                        PRICING_ADMIN_URL
                    );
                    $actions['restore'] = '<a href="' . $restore_lnk_url . '" aria-label="'
                                          . sprintf(
                                              /* translators: The name of the price type */
                                              esc_attr__('Restore Price Type (%s)', 'event_espresso'),
                                              $item->name()
                                          )
                                          . '">'
                                          . esc_html__('Restore', 'event_espresso') . '</a>';
                }
                // delete price link
                if (
                    EE_Registry::instance()->CAP->current_user_can(
                        'ee_delete_default_price_type',
                        'pricing_delete_price_type',
                        $item->ID()
                    )
                ) {
                    $delete_lnk_url    = EE_Admin_Page::add_query_args_and_nonce(
                        [
                            'action'   => 'delete_price_type',
                            'id'       => $item->ID(),
                            'noheader' => true,
                        ],
                        PRICING_ADMIN_URL
                    );
                    $actions['delete'] = '
                        <a href="' . $delete_lnk_url . '" 
                            aria-label="' . sprintf(
                            /* translators: The name of the price type */
                            esc_attr__('Delete Price Type %s Permanently', 'event_espresso'),
                            $item->name()
                        ) . '"
                        >
                            ' . esc_html__('Delete Permanently', 'event_espresso') . '
                        </a>';
                }
            }
        }

        // Return the name contents
        return sprintf(
            '%1$s <span style="color:silver">(id:%2$s)</span>%3$s',
            $name_link,
            $item->ID(),
            $this->row_actions($actions)
        );
    }


    public function column_base_type($item): string
    {
        return '<div class="jst-cntr">' . $item->base_type_name() . '</div>';
    }


    public function column_percent($item): string
    {
        return '<div class="jst-cntr">'
               . ($item->is_percent() ? '%' : EE_Registry::instance()->CFG->currency->sign)
               . '</div>';
    }


    public function column_order($item): string
    {
        return '<div class="jst-cntr">' . $item->order() . '</div>';
    }
}
