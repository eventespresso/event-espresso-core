<?php

use EventEspresso\core\services\request\DataType;

/**
 * Pricing_Admin_Page class
 *
 * @package     Event Espresso
 * @subpackage  includes/core/admin/pricing/Pricing_Admin_Page.core.php
 * @author      Brent Christensen
 */
class Pricing_Admin_Page extends EE_Admin_Page
{

    protected function _init_page_props()
    {
        $this->page_slug        = PRICING_PG_SLUG;
        $this->page_label       = PRICING_LABEL;
        $this->_admin_base_url  = PRICING_ADMIN_URL;
        $this->_admin_base_path = PRICING_ADMIN;
    }


    protected function _ajax_hooks()
    {
        add_action('wp_ajax_espresso_update_prices_order', [$this, 'update_price_order']);
    }


    protected function _define_page_props()
    {
        $this->_admin_page_title = PRICING_LABEL;
        $this->_labels           = [
            'buttons' => [
                'add'         => esc_html__('Add New Default Price', 'event_espresso'),
                'edit'        => esc_html__('Edit Default Price', 'event_espresso'),
                'delete'      => esc_html__('Delete Default Price', 'event_espresso'),
                'add_type'    => esc_html__('Add New Default Price Type', 'event_espresso'),
                'edit_type'   => esc_html__('Edit Price Type', 'event_espresso'),
                'delete_type' => esc_html__('Delete Price Type', 'event_espresso'),
            ],
        ];
    }


    /**
     * an array for storing request actions and their corresponding methods
     *
     * @return void
     */
    protected function _set_page_routes()
    {
        $PRC_ID             = $this->request->getRequestParam('PRC_ID', 0, DataType::INTEGER);
        $PRT_ID             = $this->request->getRequestParam('PRT_ID', 0, DataType::INTEGER);
        $this->_page_routes = [
            'default'                     => [
                'func'       => '_price_overview_list_table',
                'capability' => 'ee_read_default_prices',
            ],
            'add_new_price'               => [
                'func'       => '_edit_price_details',
                'args'       => ['new_price' => true],
                'capability' => 'ee_edit_default_prices',
            ],
            'edit_price'                  => [
                'func'       => '_edit_price_details',
                'args'       => ['new_price' => false],
                'capability' => 'ee_edit_default_price',
                'obj_id'     => $PRC_ID,
            ],
            'insert_price'                => [
                'func'       => '_insert_or_update_price',
                'args'       => ['new_price' => true],
                'noheader'   => true,
                'capability' => 'ee_edit_default_prices',
            ],
            'update_price'                => [
                'func'       => '_insert_or_update_price',
                'args'       => ['new_price' => false],
                'noheader'   => true,
                'capability' => 'ee_edit_default_price',
                'obj_id'     => $PRC_ID,
            ],
            'trash_price'                 => [
                'func'       => '_trash_or_restore_price',
                'args'       => ['trash' => true],
                'noheader'   => true,
                'capability' => 'ee_delete_default_price',
                'obj_id'     => $PRC_ID,
            ],
            'restore_price'               => [
                'func'       => '_trash_or_restore_price',
                'args'       => ['trash' => false],
                'noheader'   => true,
                'capability' => 'ee_delete_default_price',
                'obj_id'     => $PRC_ID,
            ],
            'delete_price'                => [
                'func'       => '_delete_price',
                'noheader'   => true,
                'capability' => 'ee_delete_default_price',
                'obj_id'     => $PRC_ID,
            ],
            'espresso_update_price_order' => [
                'func'       => 'update_price_order',
                'noheader'   => true,
                'capability' => 'ee_edit_default_prices',
            ],
            // price types
            'price_types'                 => [
                'func'       => '_price_types_overview_list_table',
                'capability' => 'ee_read_default_price_types',
            ],
            'add_new_price_type'          => [
                'func'       => '_edit_price_type_details',
                'capability' => 'ee_edit_default_price_types',
            ],
            'edit_price_type'             => [
                'func'       => '_edit_price_type_details',
                'capability' => 'ee_edit_default_price_type',
                'obj_id'     => $PRT_ID,
            ],
            'insert_price_type'           => [
                'func'       => '_insert_or_update_price_type',
                'args'       => ['new_price_type' => true],
                'noheader'   => true,
                'capability' => 'ee_edit_default_price_types',
            ],
            'update_price_type'           => [
                'func'       => '_insert_or_update_price_type',
                'args'       => ['new_price_type' => false],
                'noheader'   => true,
                'capability' => 'ee_edit_default_price_type',
                'obj_id'     => $PRT_ID,
            ],
            'trash_price_type'            => [
                'func'       => '_trash_or_restore_price_type',
                'args'       => ['trash' => true],
                'noheader'   => true,
                'capability' => 'ee_delete_default_price_type',
                'obj_id'     => $PRT_ID,
            ],
            'restore_price_type'          => [
                'func'       => '_trash_or_restore_price_type',
                'args'       => ['trash' => false],
                'noheader'   => true,
                'capability' => 'ee_delete_default_price_type',
                'obj_id'     => $PRT_ID,
            ],
            'delete_price_type'           => [
                'func'       => '_delete_price_type',
                'noheader'   => true,
                'capability' => 'ee_delete_default_price_type',
                'obj_id'     => $PRT_ID,
            ],
            'tax_settings'                => [
                'func'       => '_tax_settings',
                'capability' => 'manage_options',
            ],
            'update_tax_settings'         => [
                'func'       => '_update_tax_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ],
        ];
    }


    protected function _set_page_config()
    {
        $PRC_ID             = $this->request->getRequestParam('id', 0, DataType::INTEGER);
        $this->_page_config = [
            'default'            => [
                'nav'           => [
                    'label' => esc_html__('Default Pricing', 'event_espresso'),
                    'order' => 10,
                ],
                'list_table'    => 'Prices_List_Table',
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'help_tabs'     => [
                    'pricing_default_pricing_help_tab'                           => [
                        'title'    => esc_html__('Default Pricing', 'event_espresso'),
                        'filename' => 'pricing_default_pricing',
                    ],
                    'pricing_default_pricing_table_column_headings_help_tab'     => [
                        'title'    => esc_html__('Default Pricing Table Column Headings', 'event_espresso'),
                        'filename' => 'pricing_default_pricing_table_column_headings',
                    ],
                    'pricing_default_pricing_views_bulk_actions_search_help_tab' => [
                        'title'    => esc_html__('Default Pricing Views & Bulk Actions & Search', 'event_espresso'),
                        'filename' => 'pricing_default_pricing_views_bulk_actions_search',
                    ],
                ],
                'require_nonce' => false,
            ],
            'add_new_price'      => [
                'nav'           => [
                    'label'      => esc_html__('Add New Default Price', 'event_espresso'),
                    'order'      => 20,
                    'persistent' => false,
                ],
                'help_tabs'     => [
                    'add_new_default_price_help_tab' => [
                        'title'    => esc_html__('Add New Default Price', 'event_espresso'),
                        'filename' => 'pricing_add_new_default_price',
                    ],
                ],
                'metaboxes'     => array_merge(
                    ['_publish_post_box'],
                    $this->_default_espresso_metaboxes
                ),
                'require_nonce' => false,
            ],
            'edit_price'         => [
                'nav'           => [
                    'label'      => esc_html__('Edit Default Price', 'event_espresso'),
                    'order'      => 20,
                    'url'        => $PRC_ID
                        ? add_query_arg(['id' => $PRC_ID], $this->_current_page_view_url)
                        : $this->_admin_base_url,
                    'persistent' => false,
                ],
                'metaboxes'     => array_merge(
                    ['_publish_post_box'],
                    $this->_default_espresso_metaboxes
                ),
                'help_tabs'     => [
                    'edit_default_price_help_tab' => [
                        'title'    => esc_html__('Edit Default Price', 'event_espresso'),
                        'filename' => 'pricing_edit_default_price',
                    ],
                ],
                'require_nonce' => false,
            ],
            'price_types'        => [
                'nav'           => [
                    'label' => esc_html__('Price Types', 'event_espresso'),
                    'order' => 30,
                ],
                'list_table'    => 'Price_Types_List_Table',
                'help_tabs'     => [
                    'pricing_price_types_help_tab'                           => [
                        'title'    => esc_html__('Price Types', 'event_espresso'),
                        'filename' => 'pricing_price_types',
                    ],
                    'pricing_price_types_table_column_headings_help_tab'     => [
                        'title'    => esc_html__('Price Types Table Column Headings', 'event_espresso'),
                        'filename' => 'pricing_price_types_table_column_headings',
                    ],
                    'pricing_price_types_views_bulk_actions_search_help_tab' => [
                        'title'    => esc_html__('Price Types Views & Bulk Actions & Search', 'event_espresso'),
                        'filename' => 'pricing_price_types_views_bulk_actions_search',
                    ],
                ],
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'require_nonce' => false,
            ],
            'add_new_price_type' => [
                'nav'           => [
                    'label'      => esc_html__('Add New Price Type', 'event_espresso'),
                    'order'      => 40,
                    'persistent' => false,
                ],
                'help_tabs'     => [
                    'add_new_price_type_help_tab' => [
                        'title'    => esc_html__('Add New Price Type', 'event_espresso'),
                        'filename' => 'pricing_add_new_price_type',
                    ],
                ],
                'metaboxes'     => array_merge(
                    ['_publish_post_box'],
                    $this->_default_espresso_metaboxes
                ),
                'require_nonce' => false,
            ],
            'edit_price_type'    => [
                'nav'           => [
                    'label'      => esc_html__('Edit Price Type', 'event_espresso'),
                    'order'      => 40,
                    'persistent' => false,
                ],
                'help_tabs'     => [
                    'edit_price_type_help_tab' => [
                        'title'    => esc_html__('Edit Price Type', 'event_espresso'),
                        'filename' => 'pricing_edit_price_type',
                    ],
                ],
                'metaboxes'     => array_merge(
                    ['_publish_post_box'],
                    $this->_default_espresso_metaboxes
                ),
                'require_nonce' => false,
            ],
            'tax_settings'       => [
                'nav'           => [
                    'label' => esc_html__('Tax Settings', 'event_espresso'),
                    'order' => 40,
                ],
                'labels'        => [
                    'publishbox' => esc_html__('Update Tax Settings', 'event_espresso'),
                ],
                'metaboxes'     => array_merge(
                    ['_publish_post_box'],
                    $this->_default_espresso_metaboxes
                ),
                'require_nonce' => true,
            ],
        ];
    }


    protected function _add_screen_options()
    {
        // todo
    }


    protected function _add_screen_options_default()
    {
        $this->_per_page_screen_option();
    }


    protected function _add_screen_options_price_types()
    {
        $page_title              = $this->_admin_page_title;
        $this->_admin_page_title = esc_html__('Price Types', 'event_espresso');
        $this->_per_page_screen_option();
        $this->_admin_page_title = $page_title;
    }


    protected function _add_feature_pointers()
    {
    }


    public function load_scripts_styles()
    {
        // styles
        wp_enqueue_style('espresso-ui-theme');
        wp_register_style(
            'espresso_PRICING',
            PRICING_ASSETS_URL . 'espresso_pricing_admin.css',
            [],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('espresso_PRICING');

        // scripts
        wp_enqueue_script('ee_admin_js');
        wp_enqueue_script('jquery-ui-position');
        wp_enqueue_script('jquery-ui-widget');
        wp_register_script(
            'espresso_PRICING',
            PRICING_ASSETS_URL . 'espresso_pricing_admin.js',
            ['jquery'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_enqueue_script('espresso_PRICING');
    }


    public function load_scripts_styles_default()
    {
        wp_enqueue_script('espresso_ajax_table_sorting');
    }


    public function admin_footer_scripts()
    {
    }


    public function admin_init()
    {
    }


    public function admin_notices()
    {
    }


    protected function _set_list_table_views_default()
    {
        $this->_views = [
            'all' => [
                'slug'        => 'all',
                'label'       => esc_html__('View All Default Pricing', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'trash_price' => esc_html__('Move to Trash', 'event_espresso'),
                ],
            ],
        ];

        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_default_prices', 'pricing_trash_price')) {
            $this->_views['trashed'] = [
                'slug'        => 'trashed',
                'label'       => esc_html__('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'restore_price' => esc_html__('Restore from Trash', 'event_espresso'),
                    'delete_price'  => esc_html__('Delete Permanently', 'event_espresso'),
                ],
            ];
        }
    }


    protected function _set_list_table_views_price_types()
    {
        $this->_views = [
            'all' => [
                'slug'        => 'all',
                'label'       => esc_html__('All', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'trash_price_type' => esc_html__('Move to Trash', 'event_espresso'),
                ],
            ],
        ];

        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_default_price_types',
                'pricing_trash_price_type'
            )
        ) {
            $this->_views['trashed'] = [
                'slug'        => 'trashed',
                'label'       => esc_html__('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'restore_price_type' => esc_html__('Restore from Trash', 'event_espresso'),
                    'delete_price_type'  => esc_html__('Delete Permanently', 'event_espresso'),
                ],
            ];
        }
    }


    /**
     * generates HTML for main Prices Admin page
     *
     * @return void
     * @throws EE_Error
     */
    protected function _price_overview_list_table()
    {
        $this->_admin_page_title .= ' ' . $this->get_action_link_or_button(
                'add_new_price',
                'add',
                [],
                'add-new-h2'
            );
        $this->_admin_page_title .= $this->_learn_more_about_pricing_link();
        $this->_search_btn_label = esc_html__('Default Prices', 'event_espresso');
        $this->display_admin_list_table_page_with_sidebar();
    }


    /**
     * retrieve data for Prices List table
     *
     * @param int  $per_page how many prices displayed per page
     * @param bool $count    return the count or objects
     * @param bool $trashed  whether the current view is of the trash can - eww yuck!
     * @return EE_Soft_Delete_Base_Class[]|int int = count || array of price objects
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_prices_overview_data(int $per_page = 10, bool $count = false, bool $trashed = false)
    {
        // start with an empty array
        $event_pricing = [];

        require_once(PRICING_ADMIN . 'Prices_List_Table.class.php');
        require_once(EE_MODELS . 'EEM_Price.model.php');
        // $PRC = EEM_Price::instance();

        $orderby = $this->request->getRequestParam('orderby', '');
        $order   = $this->request->getRequestParam('order', 'ASC');

        switch ($orderby) {
            case 'name':
                $orderby = ['PRC_name' => $order];
                break;
            case 'type':
                $orderby = ['Price_Type.PRT_name' => $order];
                break;
            case 'amount':
                $orderby = ['PRC_amount' => $order];
                break;
            default:
                $orderby = ['PRC_order' => $order, 'Price_Type.PRT_order' => $order, 'PRC_ID' => $order];
        }

        $current_page = $this->request->getRequestParam('paged', 1, DataType::INTEGER);
        $per_page     = $this->request->getRequestParam('perpage', $per_page, DataType::INTEGER);

        $where = [
            'PRC_is_default' => 1,
            'PRC_deleted'    => $trashed,
        ];

        $offset = ($current_page - 1) * $per_page;
        $limit  = [$offset, $per_page];

        $search_term = $this->request->getRequestParam('s');
        if ($search_term) {
            $search_term = "%{$search_term}%";
            $where['OR'] = [
                'PRC_name'            => ['LIKE', $search_term],
                'PRC_desc'            => ['LIKE', $search_term],
                'PRC_amount'          => ['LIKE', $search_term],
                'Price_Type.PRT_name' => ['LIKE', $search_term],
            ];
        }

        $query_params = [
            $where,
            'order_by' => $orderby,
            'limit'    => $limit,
            'group_by' => 'PRC_ID',
        ];

        if ($count) {
            return $trashed
                ? EEM_Price::instance()->count([$where])
                : EEM_Price::instance()->count_deleted_and_undeleted([$where]);
        }
        return EEM_Price::instance()->get_all_deleted_and_undeleted($query_params);
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _edit_price_details()
    {
        // grab price ID
        $PRC_ID = $this->request->getRequestParam('id', 0, DataType::INTEGER);
        // change page title based on request action
        switch ($this->_req_action) {
            case 'add_new_price':
                $this->_admin_page_title = esc_html__('Add New Price', 'event_espresso');
                break;
            case 'edit_price':
                $this->_admin_page_title = esc_html__('Edit Price', 'event_espresso');
                break;
            default:
                $this->_admin_page_title = ucwords(str_replace('_', ' ', $this->_req_action));
        }
        // add PRC_ID to title if editing
        $this->_admin_page_title = $PRC_ID ? $this->_admin_page_title . ' # ' . $PRC_ID : $this->_admin_page_title;

        if ($PRC_ID) {
            $price                    = EEM_Price::instance()->get_one_by_ID($PRC_ID);
            $additional_hidden_fields = [
                'PRC_ID' => ['type' => 'hidden', 'value' => $PRC_ID],
            ];
            $this->_set_add_edit_form_tags('update_price', $additional_hidden_fields);
        } else {
            $price = EEM_Price::instance()->get_new_price();
            $this->_set_add_edit_form_tags('insert_price');
        }

        if (! $price instanceof EE_Price) {
            throw new RuntimeException(
                sprintf(
                    esc_html__(
                        'A valid Price could not be retrieved from the database with ID: %1$s',
                        'event_espresso'
                    ),
                    $PRC_ID
                )
            );
        }


        $this->_template_args['PRC_ID'] = $PRC_ID;
        $this->_template_args['price']  = $price;

        $default_base_price                         = $price->type_obj() && $price->type_obj()->base_type() === 1;
        $this->_template_args['default_base_price'] = $default_base_price;

        // get price types
        $price_types = EEM_Price_Type::instance()->get_all([['PBT_ID' => ['!=', 1]]]);
        if (empty($price_types)) {
            $msg = esc_html__(
                'You have no price types defined. Please add a price type before adding a price.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            $this->display_admin_page_with_sidebar();
        }
        $attributes       = [];
        $price_type_names = [];
        $attributes[]     = 'id="PRT_ID"';
        if ($default_base_price) {
            $attributes[]       = 'disabled="disabled"';
            $price_type_names[] = ['id' => 1, 'text' => esc_html__('Base Price', 'event_espresso')];
        }
        foreach ($price_types as $type) {
            $price_type_names[] = ['id' => $type->ID(), 'text' => $type->name()];
        }
        $this->_template_args['attributes']  = implode(' ', $attributes);
        $this->_template_args['price_types'] = $price_type_names;

        $this->_template_args['learn_more_about_pricing_link'] = $this->_learn_more_about_pricing_link();
        $this->_template_args['admin_page_content']            = $this->_edit_price_details_meta_box();

        $this->_set_publish_post_box_vars('id', $PRC_ID);
        // the details template wrapper
        $this->display_admin_page_with_sidebar();
    }


    /**
     *
     * @return string
     */
    public function _edit_price_details_meta_box(): string
    {
        return EEH_Template::display_template(
            PRICING_TEMPLATE_PATH . 'pricing_details_main_meta_box.template.php',
            $this->_template_args,
            true
        );
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function set_price_column_values(): array
    {
        $PRC_order = 0;
        $PRT_ID    = $this->request->getRequestParam('PRT_ID', 0, DataType::INTEGER);
        if ($PRT_ID) {
            /** @var EE_Price_Type $price_type */
            $price_type = EEM_Price_Type::instance()->get_one_by_ID($PRT_ID);
            if ($price_type instanceof EE_Price_Type) {
                $PRC_order = $price_type->order();
            }
        }
        return [
            'PRT_ID'         => $PRT_ID,
            'PRC_amount'     => $this->request->getRequestParam('PRC_amount', 0, DataType::FLOAT),
            'PRC_name'       => $this->request->getRequestParam('PRC_name'),
            'PRC_desc'       => $this->request->getRequestParam('PRC_desc'),
            'PRC_is_default' => 1,
            'PRC_overrides'  => null,
            'PRC_order'      => $PRC_order,
            'PRC_deleted'    => 0,
            'PRC_parent'     => 0,
        ];
    }


    /**
     * @param bool $insert - whether to insert or update
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _insert_or_update_price(bool $insert = false)
    {
        // why be so pessimistic ???  : (
        $updated = 0;

        $set_column_values = $this->set_price_column_values();
        // is this a new Price ?
        if ($insert) {
            // run the insert
            $PRC_ID = EEM_Price::instance()->insert($set_column_values);
            if ($PRC_ID) {
                // make sure this new price modifier is attached to the ticket but ONLY if it is not a tax type
                $price = EEM_price::instance()->get_one_by_ID($PRC_ID);
                if (
                    $price instanceof EE_Price
                    && $price->type_obj() instanceof EE_Price_type
                    && $price->type_obj()->base_type() !== EEM_Price_Type::base_type_tax
                ) {
                    $ticket = EEM_Ticket::instance()->get_one_by_ID(1);
                    $ticket->_add_relation_to($price, 'Price');
                    $ticket->save();
                }
                $updated = 1;
            }
            $action_desc = 'created';
        } else {
            $PRC_ID = $this->request->getRequestParam('PRC_ID', 0, DataType::INTEGER);
            // run the update
            $where_cols_n_values = ['PRC_ID' => $PRC_ID];
            $updated             = EEM_Price::instance()->update($set_column_values, [$where_cols_n_values]);

            $price = EEM_Price::instance()->get_one_by_ID($PRC_ID);
            if ($price instanceof EE_Price && $price->type_obj()->base_type() !== EEM_Price_Type::base_type_tax) {
                // if this is $PRC_ID == 1,
                // then we need to update the default ticket attached to this price so the TKT_price value is updated.
                if ($PRC_ID === 1) {
                    $ticket = $price->get_first_related('Ticket');
                    if ($ticket) {
                        $ticket->set('TKT_price', $price->get('PRC_amount'));
                        $ticket->set('TKT_name', $price->get('PRC_name'));
                        $ticket->set('TKT_description', $price->get('PRC_desc'));
                        $ticket->save();
                    }
                } else {
                    // we make sure this price is attached to base ticket. but ONLY if its not a tax ticket type.
                    $ticket = EEM_Ticket::instance()->get_one_by_ID(1);
                    $ticket->_add_relation_to($PRC_ID, 'Price');
                    $ticket->save();
                }
            }

            $action_desc = 'updated';
        }

        $query_args = ['action' => 'edit_price', 'id' => $PRC_ID];

        $this->_redirect_after_action($updated, 'Prices', $action_desc, $query_args);
    }


    /**
     * @param bool $trash - whether to move item to trash (TRUE) or restore it (FALSE)
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _trash_or_restore_price(bool $trash = true)
    {
        $entity_model = EEM_Price::instance();
        $action       = $trash ? EE_Admin_List_Table::ACTION_TRASH : EE_Admin_List_Table::ACTION_RESTORE;
        $result       = $this->trashRestoreDeleteEntities(
            $entity_model,
            'id',
            $action,
            'PRC_deleted',
            [$this, 'adjustTicketRelations']
        );

        if ($result) {
            $msg = $trash
                ? esc_html(
                    _n(
                        'The Price has been trashed',
                        'The Prices have been trashed',
                        $result,
                        'event_espresso'
                    )
                )
                : esc_html(
                    _n(
                        'The Price has been restored',
                        'The Prices have been restored',
                        $result,
                        'event_espresso'
                    )
                );
            EE_Error::add_success($msg);
        }

        $this->_redirect_after_action(
            $result,
            _n('Price', 'Prices', $result, 'event_espresso'),
            $trash ? 'trashed' : 'restored',
            ['action' => 'default'],
            true
        );
    }


    /**
     * @param EEM_Base   $entity_model
     * @param int|string $entity_ID
     * @param string     $action
     * @param int        $result
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function adjustTicketRelations(
        EEM_Base $entity_model,
        $entity_ID,
        string $action,
        int $result
    ) {
        if (! $entity_ID || (float) $result < 1) {
            return;
        }

        $entity = $entity_model->get_one_by_ID($entity_ID);
        if (! $entity instanceof EE_Price || $entity->type_obj()->base_type() === EEM_Price_Type::base_type_tax) {
            return;
        }

        // get default tickets for updating
        $default_tickets = EEM_Ticket::instance()->get_all_default_tickets();
        foreach ($default_tickets as $default_ticket) {
            if (! $default_ticket instanceof EE_Ticket) {
                continue;
            }
            switch ($action) {
                case EE_Admin_List_Table::ACTION_DELETE:
                case EE_Admin_List_Table::ACTION_TRASH:
                    // if trashing then remove relations to base default ticket.
                    $default_ticket->_remove_relation_to($entity_ID, 'Price');
                    break;
                case EE_Admin_List_Table::ACTION_RESTORE:
                    // if restoring then add back to base default ticket
                    $default_ticket->_add_relation_to($entity_ID, 'Price');
                    break;
            }
            $default_ticket->save();
        }
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _delete_price()
    {
        $entity_model = EEM_Price::instance();
        $deleted      = $this->trashRestoreDeleteEntities($entity_model, 'id');
        $entity       = $entity_model->item_name($deleted);
        $this->_redirect_after_action(
            $deleted,
            $entity,
            'deleted',
            ['action' => 'default']
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function update_price_order()
    {
        // grab our row IDs
        $row_ids = $this->request->getRequestParam('row_ids', '');
        $row_ids = explode(',', rtrim($row_ids, ','));

        $all_updated = true;
        foreach ($row_ids as $i => $row_id) {
            // Update the prices when re-ordering
            $fields_n_values = ['PRC_order' => $i + 1];
            $query_params    = [['PRC_ID' => absint($row_id)]];
            // any failure will toggle $all_updated to false
            $all_updated = $row_id && EEM_Price::instance()->update($fields_n_values, $query_params) !== false
                ? $all_updated
                : false;
        }
        $success = $all_updated
            ? esc_html__('Price order was updated successfully.', 'event_espresso')
            : false;
        $errors  = ! $all_updated
            ? esc_html__('An error occurred. The price order was not updated.', 'event_espresso')
            : false;

        echo wp_json_encode(['return_data' => false, 'success' => $success, 'errors' => $errors]);
        die();
    }






    /******************************************************************************************************************
     ***********************************************  TICKET PRICE TYPES  *********************************************
     ******************************************************************************************************************/


    /**
     * generates HTML for main Prices Admin page
     *
     * @return void
     * @throws EE_Error
     */
    protected function _price_types_overview_list_table()
    {
        $this->_admin_page_title .= ' ' . $this->get_action_link_or_button(
                'add_new_price_type',
                'add_type',
                [],
                'add-new-h2'
            );
        $this->_admin_page_title .= $this->_learn_more_about_pricing_link();
        $this->_search_btn_label = esc_html__('Price Types', 'event_espresso');
        $this->display_admin_list_table_page_with_sidebar();
    }


    /**
     * retrieve data for Price Types List table
     *
     * @param int  $per_page how many prices displayed per page
     * @param bool $count    return the count or objects
     * @param bool $trashed  whether the current view is of the trash can - eww yuck!
     * @return EE_Soft_Delete_Base_Class[]|int int = count || array of price objects
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_price_types_overview_data(int $per_page = 10, bool $count = false, bool $trashed = false)
    {
        // start with an empty array
        require_once(PRICING_ADMIN . 'Price_Types_List_Table.class.php');

        $orderby = $this->request->getRequestParam('orderby', '');
        $order   = $this->request->getRequestParam('order', 'ASC');

        switch ($orderby) {
            case 'name':
                $orderby = ['PRT_name' => $order];
                break;
            default:
                $orderby = ['PRT_order' => $order];
        }

        $current_page = $this->request->getRequestParam('paged', 1, DataType::INTEGER);
        $per_page     = $this->request->getRequestParam('perpage', $per_page, DataType::INTEGER);

        $offset = ($current_page - 1) * $per_page;
        $limit  = [$offset, $per_page];

        $where = ['PRT_deleted' => $trashed, 'PBT_ID' => ['!=', 1]];

        $search_term = $this->request->getRequestParam('s');
        if ($search_term) {
            $where['OR'] = [
                'PRT_name' => ['LIKE', "%{$search_term}%"],
            ];
        }
        $query_params = [
            $where,
            'order_by' => $orderby,
            'limit'    => $limit,
        ];
        return $count
            ? EEM_Price_Type::instance()->count_deleted_and_undeleted($query_params)
            : EEM_Price_Type::instance()->get_all_deleted_and_undeleted($query_params);
    }


    /**
     * _edit_price_type_details
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _edit_price_type_details()
    {
        // grab price type ID
        $PRT_ID = $this->request->getRequestParam('id', 0, DataType::INTEGER);
        // change page title based on request action
        switch ($this->_req_action) {
            case 'add_new_price_type':
                $this->_admin_page_title = esc_html__('Add New Price Type', 'event_espresso');
                break;
            case 'edit_price_type':
                $this->_admin_page_title = esc_html__('Edit Price Type', 'event_espresso');
                break;
            default:
                $this->_admin_page_title = ucwords(str_replace('_', ' ', $this->_req_action));
        }
        // add PRT_ID to title if editing
        $this->_admin_page_title = $PRT_ID ? $this->_admin_page_title . ' # ' . $PRT_ID : $this->_admin_page_title;

        if ($PRT_ID) {
            $price_type               = EEM_Price_Type::instance()->get_one_by_ID($PRT_ID);
            $additional_hidden_fields = ['PRT_ID' => ['type' => 'hidden', 'value' => $PRT_ID]];
            $this->_set_add_edit_form_tags('update_price_type', $additional_hidden_fields);
        } else {
            $price_type = EEM_Price_Type::instance()->get_new_price_type();
            $this->_set_add_edit_form_tags('insert_price_type');
        }

        if (! $price_type instanceof EE_Price_Type) {
            throw new RuntimeException(
                sprintf(
                    esc_html__(
                        'A valid Price Type could not be retrieved from the database with ID: %1$s',
                        'event_espresso'
                    ),
                    $PRT_ID
                )
            );
        }

        $this->_template_args['PRT_ID']     = $PRT_ID;
        $this->_template_args['price_type'] = $price_type;

        $base_types    = EEM_Price_Type::instance()->get_base_types();
        $select_values = [];
        foreach ($base_types as $ref => $text) {
            if ($ref == EEM_Price_Type::base_type_base_price) {
                // do not allow creation of base_type_base_prices because that's a system only base type.
                continue;
            }
            $select_values[] = ['id' => $ref, 'text' => $text];
        }

        $this->_template_args['base_type_select'] = EEH_Form_Fields::select_input(
            'base_type',
            $select_values,
            $price_type->base_type(),
            'id="price-type-base-type-slct"'
        );

        $this->_template_args['learn_more_about_pricing_link'] = $this->_learn_more_about_pricing_link();
        $this->_template_args['admin_page_content']            = $this->_edit_price_type_details_meta_box();

        $redirect_URL = add_query_arg(['action' => 'price_types'], $this->_admin_base_url);
        $this->_set_publish_post_box_vars('id', $PRT_ID, false, $redirect_URL);
        // the details template wrapper
        $this->display_admin_page_with_sidebar();
    }


    /**
     * _edit_price_type_details_meta_box
     *
     * @return string
     */
    public function _edit_price_type_details_meta_box(): string
    {
        return EEH_Template::display_template(
            PRICING_TEMPLATE_PATH . 'pricing_type_details_main_meta_box.template.php',
            $this->_template_args,
            true
        );
    }


    /**
     * @return array
     */
    protected function set_price_type_column_values(): array
    {
        $base_type  = $this->request->getRequestParam(
            'base_type',
            EEM_Price_Type::base_type_base_price,
            DataType::INTEGER
        );
        $is_percent = $this->request->getRequestParam('PRT_is_percent', 0, DataType::INTEGER);
        $order      = $this->request->getRequestParam('PRT_order', 0, DataType::INTEGER);
        switch ($base_type) {
            case EEM_Price_Type::base_type_base_price:
                $is_percent = 0;
                $order      = 0;
                break;

            case EEM_Price_Type::base_type_discount:
            case EEM_Price_Type::base_type_surcharge:
                break;

            case EEM_Price_Type::base_type_tax:
                $is_percent = 1;
                break;
        }

        return [
            'PBT_ID'         => $base_type,
            'PRT_name'       => $this->request->getRequestParam('PRT_name', ''),
            'PRT_is_percent' => $is_percent,
            'PRT_order'      => $order,
            'PRT_deleted'    => 0,
        ];
    }


    /**
     * @param bool $new_price_type - whether to insert or update
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _insert_or_update_price_type(bool $new_price_type = false)
    {
        // why be so pessimistic ???  : (
        $success = 0;

        $set_column_values = $this->set_price_type_column_values();
        // is this a new Price ?
        if ($new_price_type) {
            // run the insert
            if ($PRT_ID = EEM_Price_Type::instance()->insert($set_column_values)) {
                $success = 1;
            }
            $action_desc = 'created';
        } else {
            $PRT_ID = $this->request->getRequestParam('PRT_ID', 0, DataType::INTEGER);
            // run the update
            $where_cols_n_values = ['PRT_ID' => $PRT_ID];
            if (EEM_Price_Type::instance()->update($set_column_values, [$where_cols_n_values])) {
                $success = 1;
            }
            $action_desc = 'updated';
        }

        $query_args = ['action' => 'edit_price_type', 'id' => $PRT_ID];
        $this->_redirect_after_action($success, 'Price Type', $action_desc, $query_args);
    }


    /**
     * @param bool $trash - whether to move item to trash (TRUE) or restore it (FALSE)
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _trash_or_restore_price_type(bool $trash = true)
    {
        $entity_model = EEM_Price_Type::instance();
        $action       = $trash ? EE_Admin_List_Table::ACTION_TRASH : EE_Admin_List_Table::ACTION_RESTORE;
        $success      = $this->trashRestoreDeleteEntities($entity_model, 'id', $action, 'PRT_deleted');
        if ($success) {
            $msg = $trash
                ? esc_html(
                    _n(
                        'The Price Type has been trashed',
                        'The Price Types have been trashed',
                        $success,
                        'event_espresso'
                    )
                )
                : esc_html(
                    _n(
                        'The Price Type has been restored',
                        'The Price Types have been restored',
                        $success,
                        'event_espresso'
                    )
                );
            EE_Error::add_success($msg);
        }
        $this->_redirect_after_action('', '', '', ['action' => 'price_types'], true);
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _delete_price_type()
    {
        $entity_model = EEM_Price_Type::instance();
        $deleted      = $this->trashRestoreDeleteEntities($entity_model, 'id');
        $this->_redirect_after_action(
            $deleted,
            $entity_model->item_name($deleted),
            'deleted',
            ['action' => 'price_types']
        );
    }


    /**
     * @return string
     */
    protected function _learn_more_about_pricing_link(): string
    {
        return '<a class="hidden" style="margin:0 20px; cursor:pointer; font-size:12px;" >' . esc_html__(
                'learn more about how pricing works',
                'event_espresso'
            ) . '</a>';
    }


    /**
     * @throws EE_Error
     */
    protected function _tax_settings()
    {
        $this->_set_add_edit_form_tags('update_tax_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->_template_args['admin_page_content'] = $this->tax_settings_form()->get_html();
        $this->display_admin_page_with_sidebar();
    }


    /**
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     */
    protected function tax_settings_form(): EE_Form_Section_Proper
    {
        $tax_settings = EE_Config::instance()->tax_settings;
        return new EE_Form_Section_Proper(
            [
                'name'            => 'tax_settings_form',
                'html_id'         => 'tax_settings_form',
                'html_class'      => 'padding',
                'layout_strategy' => new EE_Div_Per_Section_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__Pricing_Admin_Page__tax_settings_form__form_subsections',
                    [
                        'tax_settings' => new EE_Form_Section_Proper(
                            [
                                'name'            => 'tax_settings_tbl',
                                'html_id'         => 'tax_settings_tbl',
                                'html_class'      => 'form-table',
                                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                                'subsections'     => [
                                    'prices_displayed_including_taxes' => new EE_Yes_No_Input(
                                        [
                                            'html_label_text'         => esc_html__(
                                                "Show Prices With Taxes Included?",
                                                'event_espresso'
                                            ),
                                            'html_help_text'          => esc_html__(
                                                'Indicates whether or not to display prices with the taxes included',
                                                'event_espresso'
                                            ),
                                            'default'                 => $tax_settings->prices_displayed_including_taxes
                                                                         ??
                                                                         true,
                                            'display_html_label_text' => false,
                                        ]
                                    ),
                                ],
                            ]
                        ),
                    ]
                ),
            ]
        );
    }


    /**
     * _update_tax_settings
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.9.13
     */
    public function _update_tax_settings()
    {
        $tax_settings = EE_Config::instance()->tax_settings;
        if (! $tax_settings instanceof EE_Tax_Config) {
            $tax_settings = new EE_Tax_Config();
        }
        try {
            $tax_form = $this->tax_settings_form();
            // check for form submission
            if ($tax_form->was_submitted()) {
                // capture form data
                $tax_form->receive_form_submission();
                // validate form data
                if ($tax_form->is_valid()) {
                    // grab validated data from form
                    $valid_data = $tax_form->valid_data();
                    // set data on config
                    $tax_settings->prices_displayed_including_taxes =
                        $valid_data['tax_settings']['prices_displayed_including_taxes'];
                } else {
                    if ($tax_form->submission_error_message() !== '') {
                        EE_Error::add_error(
                            $tax_form->submission_error_message(),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                    }
                }
            }
        } catch (EE_Error $e) {
            EE_Error::add_error($e->get_error(), __FILE__, __FUNCTION__, __LINE__);
        }

        $what    = 'Tax Settings';
        $success = $this->_update_espresso_configuration(
            $what,
            $tax_settings,
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
        $this->_redirect_after_action($success, $what, 'updated', ['action' => 'tax_settings']);
    }
}
