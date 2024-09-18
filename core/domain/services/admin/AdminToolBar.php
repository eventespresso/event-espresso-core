<?php

namespace EventEspresso\core\domain\services\admin;

use EE_Capabilities;
use EEH_URL;
use EEM_Registration;
use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;
use EventEspresso\core\domain\services\database\MaintenanceStatus;
use EventEspresso\core\domain\services\registration\RegStatus;
use WP_Admin_Bar;

/**
 * AdminToolBar
 * Adds Event Espresso items to the WordPress Admin Bar
 *
 * @package        Event Espresso
 * @subpackage     core/
 * @author         Brent Christensen
 */
class AdminToolBar
{
    private ?WP_Admin_Bar $admin_bar        = null;

    private EE_Capabilities $capabilities;

    private string $events_admin_url = '';

    private string $menu_class       = 'espresso_menu_item_class';

    private string $reg_admin_url    = '';


    /**
     * AdminToolBar constructor.
     *
     * @param EE_Capabilities $capabilities
     */
    public function __construct(EE_Capabilities $capabilities)
    {
        $this->capabilities = $capabilities;
        add_action('admin_bar_menu', [$this, 'espressoToolbarItems'], 100);
        $this->enqueueAssets();
    }


    /**
     *    espresso_toolbar_items
     *
     * @access public
     * @param WP_Admin_Bar $admin_bar
     * @return void
     */
    public function espressoToolbarItems(WP_Admin_Bar $admin_bar)
    {
        // if it's an AJAX request, or user is NOT an admin, or in full M-Mode
        if (
            (defined('DOING_AJAX') && DOING_AJAX)
            || ! $this->capabilities->current_user_can('ee_read_ee', 'ee_admin_bar_menu_top_level')
            || MaintenanceStatus::isFullSite()
        ) {
            return;
        }
        $this->admin_bar = $admin_bar;
        // we don't use the constants EVENTS_ADMIN_URL or REG_ADMIN_URL
        // because they're only defined in each of their respective constructors
        // and this might be a frontend request, in which case they aren't available
        $this->events_admin_url = admin_url('admin.php?page=espresso_events');
        $this->reg_admin_url    = admin_url('admin.php?page=espresso_registrations');
        // now let's add all the menu items
        $this->addTopLevelMenu();
        $this->addEventsSubMenu();
        $this->addEventsAddEditHeader();
        $this->addEventsAddNew();
        $this->addEventsEditCurrentEvent();
        $this->addEventsViewHeader();
        $this->addEventsViewAll();
        $this->addEventsViewToday();
        $this->addEventsViewThisMonth();
        $this->addRegistrationSubMenu();
        $this->addRegistrationOverviewToday();
        $this->addRegistrationOverviewTodayApproved();
        $this->addRegistrationOverviewTodayPendingPayment();
        $this->addRegistrationOverviewTodayNotApproved();
        $this->addRegistrationOverviewTodayCancelled();
        $this->addRegistrationOverviewThisMonth();
        $this->addRegistrationOverviewThisMonthApproved();
        $this->addRegistrationOverviewThisMonthPending();
        $this->addRegistrationOverviewThisMonthNotApproved();
        $this->addRegistrationOverviewThisMonthCancelled();
        $this->addExtensionsAndServices();
        $this->addFontSizeSubMenu();
    }


    /**
     * @return void
     */
    private function enqueueAssets()
    {
        wp_register_style(
            'espresso-admin-toolbar',
            EE_GLOBAL_ASSETS_URL . 'css/espresso-admin-toolbar.css',
            ['dashicons'],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('espresso-admin-toolbar');
    }


    /**
     * @return void
     */
    private function addTopLevelMenu()
    {
        $this->admin_bar->add_menu(
            [
                'id'    => 'espresso-toolbar',
                'title' => '<span class="ab-icon ee-icon ee-icon-ee-cup-thick ee-icon-size-20"></span><span class="ab-label">'
                           . esc_html_x('Event Espresso', 'admin bar menu group label', 'event_espresso')
                           . '</span>',
                'href'  => $this->events_admin_url,
                'meta'  => [
                    'title' => esc_html__('Event Espresso', 'event_espresso'),
                    'class' => $this->menu_class . 'first',
                ],
            ]
        );
    }


    /**
     * @return void
     */
    private function addEventsSubMenu()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_events',
                'ee_admin_bar_menu_espresso-toolbar-events'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-events',
                    'parent' => 'espresso-toolbar',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Events', 'event_espresso'),
                    'href'   => $this->events_admin_url,
                    'meta'   => [
                        'title'  => esc_html__('Events', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class,
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addEventsAddEditHeader()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_events',
                'ee_admin_bar_menu_espresso-toolbar-events-view'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-events-add-edit',
                    'parent' => 'espresso-toolbar-events',
                    'title'  => esc_html__('Add / Edit', 'event_espresso'),
                    'href'   => '',
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addEventsAddNew()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_edit_events',
                'ee_admin_bar_menu_espresso-toolbar-events-new'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-events-new',
                    'parent' => 'espresso-toolbar-events',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Add New', 'event_espresso'),
                    'href'   => EEH_URL::add_query_args_and_nonce(
                        ['action' => 'create_new'],
                        $this->events_admin_url
                    ),
                    'meta'   => [
                        'title'  => esc_html__('Add New', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class,
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addEventsEditCurrentEvent()
    {
        if (is_single() && (get_post_type() === EspressoPostType::EVENTS)) {
            // Current post
            global $post;
            if (
                $this->capabilities->current_user_can(
                    'ee_edit_event',
                    'ee_admin_bar_menu_espresso-toolbar-events-edit',
                    $post->ID
                )
            ) {
                $this->admin_bar->add_menu(
                    [
                        'id'     => 'espresso-toolbar-events-edit',
                        'parent' => 'espresso-toolbar-events',
                        'title'  => '<span class="ee-toolbar-icon"></span>'
                                    . esc_html__('Edit Event', 'event_espresso'),
                        'href'   => EEH_URL::add_query_args_and_nonce(
                            [
                                'action' => 'edit',
                                'post'   => $post->ID,
                            ],
                            $this->events_admin_url
                        ),
                        'meta'   => [
                            'title'  => esc_html__('Edit Event', 'event_espresso'),
                            'target' => '',
                            'class'  => $this->menu_class,
                        ],
                    ]
                );
            }
        }
    }


    /**
     * @return void
     */
    private function addEventsViewHeader()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_events',
                'ee_admin_bar_menu_espresso-toolbar-events-view'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-events-view',
                    'parent' => 'espresso-toolbar-events',
                    'title'  => esc_html__('View', 'event_espresso'),
                    'href'   => '',
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addEventsViewAll()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_events',
                'ee_admin_bar_menu_espresso-toolbar-events-all'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-events-all',
                    'parent' => 'espresso-toolbar-events',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('All', 'event_espresso'),
                    'href'   => $this->events_admin_url,
                    'meta'   => [
                        'title'  => esc_html__('All', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class,
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addEventsViewToday()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_events',
                'ee_admin_bar_menu_espresso-toolbar-events-today'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-events-today',
                    'parent' => 'espresso-toolbar-events',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Today', 'event_espresso'),
                    'href'   => EEH_URL::add_query_args_and_nonce(
                        [
                            'action' => 'default',
                            'status' => 'today',
                        ],
                        $this->events_admin_url
                    ),
                    'meta'   => [
                        'title'  => esc_html__('Today', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class,
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addEventsViewThisMonth()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_events',
                'ee_admin_bar_menu_espresso-toolbar-events-month'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-events-month',
                    'parent' => 'espresso-toolbar-events',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('This Month', 'event_espresso'),
                    'href'   => EEH_URL::add_query_args_and_nonce(
                        [
                            'action' => 'default',
                            'status' => 'month',
                        ],
                        $this->events_admin_url
                    ),
                    'meta'   => [
                        'title'  => esc_html__('This Month', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class,
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addRegistrationSubMenu()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_registrations',
                'ee_admin_bar_menu_espresso-toolbar-registrations'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-registrations',
                    'parent' => 'espresso-toolbar',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Registrations', 'event_espresso'),
                    'href'   => $this->reg_admin_url,
                    'meta'   => [
                        'title'  => esc_html__('Registrations', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class,
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addRegistrationOverviewToday()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_registrations',
                'ee_admin_bar_menu_espresso-toolbar-registrations-today'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-registrations-today',
                    'parent' => 'espresso-toolbar-registrations',
                    'title'  => esc_html__('Today', 'event_espresso'),
                    'href'   => '',
                    'meta'   => [
                        'title'  => esc_html__('Today', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class,
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addRegistrationOverviewTodayApproved()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_registrations',
                'ee_admin_bar_menu_espresso-toolbar-registrations-today-approved'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-registrations-today-approved',
                    'parent' => 'espresso-toolbar-registrations',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Approved', 'event_espresso'),
                    'href'   => EEH_URL::add_query_args_and_nonce(
                        [
                            'action'      => 'default',
                            'status'      => 'today',
                            '_reg_status' => RegStatus::APPROVED,
                        ],
                        $this->reg_admin_url
                    ),
                    'meta'   => [
                        'title'  => esc_html__('Approved', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class . ' ee-toolbar-icon-approved',
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addRegistrationOverviewTodayPendingPayment()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_registrations',
                'ee_admin_bar_menu_espresso-toolbar-registrations-today-pending'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-registrations-today-pending',
                    'parent' => 'espresso-toolbar-registrations',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Pending', 'event_espresso'),
                    'href'   => EEH_URL::add_query_args_and_nonce(
                        [
                            'action'      => 'default',
                            'status'      => 'today',
                            '_reg_status' => RegStatus::PENDING_PAYMENT,
                        ],
                        $this->reg_admin_url
                    ),
                    'meta'   => [
                        'title'  => esc_html__('Pending Payment', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class . ' ee-toolbar-icon-pending',
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addRegistrationOverviewTodayNotApproved()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_registrations',
                'ee_admin_bar_menu_espresso-toolbar-registrations-today-not-approved'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-registrations-today-not-approved',
                    'parent' => 'espresso-toolbar-registrations',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Not Approved / Awaiting Review', 'event_espresso'),
                    'href'   => EEH_URL::add_query_args_and_nonce(
                        [
                            'action'      => 'default',
                            'status'      => 'today',
                            '_reg_status' => RegStatus::AWAITING_REVIEW,
                        ],
                        $this->reg_admin_url
                    ),
                    'meta'   => [
                        'title'  => esc_html__('Not Approved / Awaiting Review', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class . ' ee-toolbar-icon-not-approved',
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addRegistrationOverviewTodayCancelled()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_registrations',
                'ee_admin_bar_menu_espresso-toolbar-registrations-today-cancelled'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-registrations-today-cancelled',
                    'parent' => 'espresso-toolbar-registrations',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Cancelled', 'event_espresso'),
                    'href'   => EEH_URL::add_query_args_and_nonce(
                        [
                            'action'      => 'default',
                            'status'      => 'today',
                            '_reg_status' => RegStatus::CANCELLED,
                        ],
                        $this->reg_admin_url
                    ),
                    'meta'   => [
                        'title'  => esc_html__('Cancelled', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class . ' ee-toolbar-icon-cancelled',
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addRegistrationOverviewThisMonth()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_registrations',
                'ee_admin_bar_menu_espresso-toolbar-registrations-month'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-registrations-month',
                    'parent' => 'espresso-toolbar-registrations',
                    'title'  => esc_html__('This Month', 'event_espresso'),
                    'href'   => '', // EEH_URL::add_query_args_and_nonce(
                    //     array(
                    //         'action' => 'default',
                    //         'status' => 'month'
                    //     ),
                    //     $this->reg_admin_url
                    // ),
                    'meta'   => [
                        'title'  => esc_html__('This Month', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class,
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addRegistrationOverviewThisMonthApproved()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_registrations',
                'ee_admin_bar_menu_espresso-toolbar-registrations-month-approved'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-registrations-month-approved',
                    'parent' => 'espresso-toolbar-registrations',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Approved', 'event_espresso'),
                    'href'   => EEH_URL::add_query_args_and_nonce(
                        [
                            'action'      => 'default',
                            'status'      => 'month',
                            '_reg_status' => RegStatus::APPROVED,
                        ],
                        $this->reg_admin_url
                    ),
                    'meta'   => [
                        'title'  => esc_html__('Approved', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class . ' ee-toolbar-icon-approved',
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addRegistrationOverviewThisMonthPending()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_registrations',
                'ee_admin_bar_menu_espresso-toolbar-registrations-month-pending'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-registrations-month-pending',
                    'parent' => 'espresso-toolbar-registrations',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Pending', 'event_espresso'),
                    'href'   => EEH_URL::add_query_args_and_nonce(
                        [
                            'action'      => 'default',
                            'status'      => 'month',
                            '_reg_status' => RegStatus::PENDING_PAYMENT,
                        ],
                        $this->reg_admin_url
                    ),
                    'meta'   => [
                        'title'  => esc_html__('Pending', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class . ' ee-toolbar-icon-pending',
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addRegistrationOverviewThisMonthNotApproved()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_registrations',
                'ee_admin_bar_menu_espresso-toolbar-registrations-month-not-approved'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-registrations-month-not-approved',
                    'parent' => 'espresso-toolbar-registrations',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Not Approved / Awaiting Review', 'event_espresso'),
                    'href'   => EEH_URL::add_query_args_and_nonce(
                        [
                            'action'      => 'default',
                            'status'      => 'month',
                            '_reg_status' => RegStatus::AWAITING_REVIEW,
                        ],
                        $this->reg_admin_url
                    ),
                    'meta'   => [
                        'title'  => esc_html__('Not Approved / Awaiting Review', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class . ' ee-toolbar-icon-not-approved',
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addRegistrationOverviewThisMonthCancelled()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_registrations',
                'ee_admin_bar_menu_espresso-toolbar-registrations-month-cancelled'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-registrations-month-cancelled',
                    'parent' => 'espresso-toolbar-registrations',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Cancelled', 'event_espresso'),
                    'href'   => EEH_URL::add_query_args_and_nonce(
                        [
                            'action'      => 'default',
                            'status'      => 'month',
                            '_reg_status' => RegStatus::CANCELLED,
                        ],
                        $this->reg_admin_url
                    ),
                    'meta'   => [
                        'title'  => esc_html__('Cancelled', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class . ' ee-toolbar-icon-cancelled',
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addExtensionsAndServices()
    {
        if (
            $this->capabilities->current_user_can(
                'ee_read_ee',
                'ee_admin_bar_menu_espresso-toolbar-extensions-and-services'
            )
        ) {
            $this->admin_bar->add_menu(
                [
                    'id'     => 'espresso-toolbar-extensions-and-services',
                    'parent' => 'espresso-toolbar',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . esc_html__('Extensions & Services', 'event_espresso'),
                    'href'   => admin_url('admin.php?page=espresso_packages'),
                    'meta'   => [
                        'title'  => esc_html__('Extensions & Services', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class,
                    ],
                ]
            );
        }
    }


    /**
     * @return void
     */
    private function addFontSizeSubMenu()
    {
        if (! is_admin()) {
            return;
        }
        $this->admin_bar->add_menu(
            [
                'id'     => 'espresso-toolbar-font-size',
                'parent' => 'espresso-toolbar',
                'title'  => '<span class="ee-toolbar-icon"></span>'
                            . esc_html__('Set Font Size', 'event_espresso'),
                'href'   => '',
                'meta'   => [
                    'title'  => esc_html__('Set Font Size', 'event_espresso'),
                    'target' => '',
                    'class'  => $this->menu_class,
                ],
            ]
        );

        $settings_admin_url = admin_url('admin.php?page=espresso_general_settings');

        $font_sizes = [
            'tiny'    => AdminFontSize::FONT_SIZE_TINY,
            'smaller' => AdminFontSize::FONT_SIZE_SMALLER,
            'small'   => AdminFontSize::FONT_SIZE_SMALL,
            'default' => AdminFontSize::FONT_SIZE_DEFAULT,
            'big'     => AdminFontSize::FONT_SIZE_BIG,
            'bigger'  => AdminFontSize::FONT_SIZE_BIGGER,
        ];

        foreach ($font_sizes as $font_size => $value) {
            $this->admin_bar->add_menu(
                [
                    'id'     => "espresso-toolbar-set-font-size-$font_size",
                    'parent' => 'espresso-toolbar-font-size',
                    'title'  => '<span class="ee-toolbar-icon"></span>'
                                . sprintf(
                                    /* translators: Font Size Small */
                                    esc_html__('Font Size %1$s', 'event_espresso'),
                                    ucwords($font_size)
                                ),
                    'href'   => EEH_URL::add_query_args_and_nonce(
                        ['action' => 'set_font_size', 'font_size' => $value],
                        $settings_admin_url
                    ),
                    'meta'   => [
                        'title'  => esc_html__('increases or decreases the Event Espresso admin font size', 'event_espresso'),
                        'target' => '',
                        'class'  => $this->menu_class,
                    ],
                ]
            );
        }
    }
}
