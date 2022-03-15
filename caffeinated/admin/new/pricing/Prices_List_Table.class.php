<?php

/**
 * Prices_List_Table
 *
 * Class for preparing the table listing all the event categories
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package               Event_Categories_Admin_List_Table
 * @subpackage            includes/core/admin/pricing_manager/Prices_List_Table.core.php
 * @author                Brent Christensen
 */
class Prices_List_Table extends EE_Admin_List_Table
{

    private $_PRT;

    /**
     * Array of price types.
     *
     * @var EE_Price_Type[]
     */
    protected $_price_types = [];


    public function __construct(EE_Admin_Page $admin_page)
    {
        parent::__construct($admin_page);
        require_once(EE_MODELS . 'EEM_Price_Type.model.php');
        $this->_PRT         = EEM_Price_Type::instance();
        $this->_price_types = $this->_PRT->get_all_deleted_and_undeleted();
    }


    protected function _setup_data()
    {
        $trashed               = $this->_admin_page->get_view() == 'trashed' ? true : false;
        $this->_data           = $this->_admin_page->get_prices_overview_data($this->_per_page, false, $trashed);
        $this->_all_data_count = $this->_admin_page->get_prices_overview_data($this->_per_page, true, false);
        $this->_trashed_count  = $this->_admin_page->get_prices_overview_data($this->_per_page, true, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = [
            'singular' => esc_html__('price', 'event_espresso'),
            'plural'   => esc_html__('prices', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        ];

        $this->_columns = [
            'cb'          => '<input type="checkbox" />', // Render a checkbox instead of text
            'id'          => esc_html__('ID', 'event_espresso'),
            'name'        => esc_html__('Name', 'event_espresso'),
            'type'        => esc_html__('Price Type', 'event_espresso'),
            'description' => esc_html__('Description', 'event_espresso'),
            'amount'      => esc_html__('Amount', 'event_espresso'),
        ];

        $this->_sortable_columns = [
            // true means its already sorted
            'name'   => ['name' => false],
            'type'   => ['type' => false],
            'amount' => ['amount' => false],
        ];

        $this->_hidden_columns = [];

        $this->_ajax_sorting_callback = 'update_prices_order';
    }


    protected function _get_table_filters()
    {
    }


    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_all_data_count;
        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_default_prices', 'pricing_trash_price')) {
            $this->_views['trashed']['count'] = $this->_trashed_count;
        }
    }


    /**
     * overriding parent method so that we can make sure the row isn't sortable for certain items
     *
     * @param object $item the current item
     * @return string
     */
    protected function _get_row_class($item)
    {
        return $item->type_obj() instanceof EE_Price_Type
                     && $item->type_obj()->base_type() !== 1
                     && $item->type_obj()->base_type() !== 4
            ? ' class="rowsortable"'
            : '';
    }


    /**
     * @param EE_Price $price
     * @param string   $action
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    protected function getActionUrl(EE_Price $price, string $action): string
    {
        if (! in_array($action, self::$actions)) {
            throw new DomainException(esc_html__('Invalid Action', 'event_espresso'));
        }
        return EE_Admin_Page::add_query_args_and_nonce(
            [
                'action'   => "{$action}_price",
                'id'       => $price->ID(),
                'noheader' => $action !== self::ACTION_EDIT,
            ],
            PRICING_ADMIN_URL
        );
    }


    public function column_cb($item)
    {
        return $item->type_obj() instanceof EE_Price_Type && $item->type_obj()->base_type() !== 1
            ? sprintf(
                '<input type="checkbox" name="checkbox[%1$s]" value="%1$s" />',
                $item->ID()
            )
            : '';
    }


    /**
     * @param EE_Price $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_id($item)
    {
        $content = '<span class="ee-entity-id">' . $item->ID() . '</span>';
        $content .= '<span class="show-on-mobile-view-only">' . $this->column_name($item, false) . '</span>';
        return $this->columnContent('id', $content, 'end');
    }


    /**
     * @param EE_Price $price
     * @param bool     $prep_content
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_name(EE_Price $price, bool $prep_content = true): string
    {

        // Build row actions
        $actions = [];
        // edit price link
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_default_price',
                'pricing_edit_price',
                $price->ID()
            )
        ) {
            $actions['edit'] = $this->getActionLink(
                $this->getActionUrl($price, self::ACTION_EDIT),
                esc_html__('Edit', 'event_espresso'),
                esc_attr__('Edit Price', 'event_espresso')
            );
        }

        $name_link = EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_default_price',
            'edit_price',
            $price->ID()
        )
            ? $this->getActionLink(
                $this->getActionUrl($price, self::ACTION_EDIT),
                stripslashes($price->name()),
                esc_attr__('Edit Price', 'event_espresso')
            )
            : $price->name();

        if ($price->type_obj() instanceof EE_Price_Type && $price->type_obj()->base_type() !== 1) {
            if ($this->_view == 'all') {
                // trash price link
                if (
                    EE_Registry::instance()->CAP->current_user_can(
                        'ee_delete_default_price',
                        'pricing_trash_price',
                        $price->ID()
                    )
                ) {
                    $actions['trash'] = $this->getActionLink(
                        $this->getActionUrl($price, self::ACTION_TRASH),
                        esc_html__('Trash', 'event_espresso'),
                        esc_attr__('Move Price to Trash', 'event_espresso')
                    );
                }
            } else {
                if (
                    EE_Registry::instance()->CAP->current_user_can(
                        'ee_delete_default_price',
                        'pricing_restore_price',
                        $price->ID()
                    )
                ) {
                    $actions['restore'] = $this->getActionLink(
                        $this->getActionUrl($price, self::ACTION_RESTORE),
                        esc_html__('Restore', 'event_espresso'),
                        esc_attr__('Restore Price', 'event_espresso')
                    );
                }

                // delete price link
                if (
                    EE_Registry::instance()->CAP->current_user_can(
                        'ee_delete_default_price',
                        'pricing_delete_price',
                        $price->ID()
                    )
                ) {
                    $actions['delete'] = $this->getActionLink(
                        $this->getActionUrl($price, self::ACTION_DELETE),
                        esc_html__('Delete Permanently', 'event_espresso'),
                        esc_attr__('Delete Price Permanently', 'event_espresso')
                    );
                }
            }
        }

        $content = $prep_content ? $name_link . $this->row_actions($actions) : $name_link;
        return $prep_content ? $this->columnContent('name', $content) : $content;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_type(EE_Price $price): string
    {
        $content = isset($this->_price_types[ $price->type() ])
            ? $this->_price_types[ $price->type() ]->name()
            : '';
        return $this->columnContent('type', $content);
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_description(EE_Price $price): string
    {
        $content = stripslashes($price->desc());
        return $this->columnContent('description', $content);
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_amount(EE_Price $price): string
    {
        $price_type = isset($this->_price_types[ $price->type() ])
            ? $this->_price_types[ $price->type() ]
            : null;
        $content = $price_type instanceof EE_Price_Type && $price_type->is_percent() ?
            '<div class="pad-amnt-rght">' . number_format($price->amount(), 1) . '%</div>'
            : '<div class="pad-amnt-rght">' . EEH_Template::format_currency($price->amount()) . '</div>';
        return $this->columnContent('amount', $content, 'end');
    }
}
