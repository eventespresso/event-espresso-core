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
            'base_type' => esc_html__('Base Type', 'event_espresso'),
            'percent'   => sprintf(
                               /* translators: 1: HTML new line, 2: open span tag, 3: close span tag */
                esc_html__('Applied %1$s as %2$s%%%3$s or %2$s$%3$s', 'event_espresso'),
                '',
                '<span class="big-text">',
                '</span>'
            ),
            'order'     => esc_html__('Order of Application', 'event_espresso'),
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


    /**
     * @param EE_Price_Type $price_type
     * @param string   $action
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    protected function getActionUrl(EE_Price_Type $price_type, string $action): string
    {
        if (! in_array($action, self::$actions)) {
            throw new DomainException(esc_html__('Invalid Action', 'event_espresso'));
        }
        return EE_Admin_Page::add_query_args_and_nonce(
            [
                'action'   => "{$action}_price_type",
                'id'       => $price_type->ID(),
                'noheader' => $action !== self::ACTION_EDIT,
            ],
            PRICING_ADMIN_URL
        );
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
    public function column_id($item): string
    {
        $content = '<span class="ee-entity-id">' . $item->ID() . '</span>';
        $content .= '<span class="show-on-mobile-view-only">' . $this->column_name($item, false) . '</span>';
        return $this->columnContent('id', $content, 'end');
    }


    /**
     * @param EE_Price_Type $price_type
     * @param bool          $prep_content
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_name(EE_Price_Type $price_type, bool $prep_content = true): string
    {

        // Build row actions
        $actions   = [];
        $name_link = $price_type->name();
        // edit price link
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_default_price_type',
                'pricing_edit_price_type',
                $price_type->ID()
            )
        ) {
            $name_link = $this->getActionLink(
                $this->getActionUrl($price_type, self::ACTION_EDIT),
                stripslashes($price_type->name()),
                sprintf(
                    /* translators: The name of the price type */
                    esc_attr__('Edit Price Type (%s)', 'event_espresso'),
                    $price_type->name()
                )
            );

            $actions['edit'] = $this->getActionLink(
                $this->getActionUrl($price_type, self::ACTION_EDIT),
                esc_html__('Edit', 'event_espresso'),
                sprintf(
                    /* translators: The name of the price type */
                    esc_attr__('Edit Price Type (%s)', 'event_espresso'),
                    $price_type->name()
                )
            );
        }

        if ($price_type->base_type() !== 1) {
            if ($this->_view == 'all') {
                // trash price link
                if (
                    EE_Registry::instance()->CAP->current_user_can(
                        'ee_delete_default_price_type',
                        'pricing_trash_price_type',
                        $price_type->ID()
                    )
                ) {
                    $actions['trash'] = $this->getActionLink(
                        $this->getActionUrl($price_type, self::ACTION_TRASH),
                        esc_html__('Trash', 'event_espresso'),
                        sprintf(
                            /* translators: The name of the price type */
                            esc_attr__('Move Price Type %s to Trash', 'event_espresso'),
                            $price_type->name()
                        )
                    );
                }
            } else {
                // restore price link
                if (
                    EE_Registry::instance()->CAP->current_user_can(
                        'ee_delete_default_price_type',
                        'pricing_restore_price_type',
                        $price_type->ID()
                    )
                ) {
                    $actions['restore'] = $this->getActionLink(
                        $this->getActionUrl($price_type, self::ACTION_RESTORE),
                        esc_html__('Restore', 'event_espresso'),
                        sprintf(
                            /* translators: The name of the price type */
                            esc_attr__('Restore Price Type (%s)', 'event_espresso'),
                            $price_type->name()
                        )
                    );
                }
                // delete price link
                if (
                    EE_Registry::instance()->CAP->current_user_can(
                        'ee_delete_default_price_type',
                        'pricing_delete_price_type',
                        $price_type->ID()
                    )
                ) {
                    $actions['delete'] = $this->getActionLink(
                        $this->getActionUrl($price_type, self::ACTION_DELETE),
                        esc_html__('Delete Permanently', 'event_espresso'),
                        sprintf(
                            /* translators: The name of the price type */
                            esc_attr__('Delete Price Type %s Permanently', 'event_espresso'),
                            $price_type->name()
                        )
                    );
                }
            }
        }

        $content = $prep_content ? $name_link . $this->row_actions($actions) : $name_link;
        return $prep_content ? $this->columnContent('name', $content) : $content;
    }


    public function column_base_type($price_type): string
    {
        return $this->columnContent('base_type', $price_type->base_type_name());
    }


    public function column_percent($price_type): string
    {
        $content = $price_type->is_percent() ? '%' : EE_Registry::instance()->CFG->currency->sign;
        return $this->columnContent('percent', $content, 'center');
    }


    public function column_order($price_type): string
    {
        return $this->columnContent('order', $price_type->order(), 'end');
    }
}
