<?php

/**
 * Extend_Transactions_Admin_Page
 *
 * This is the Transactions Caffeinated admin page.
 *
 *
 * @package         Extend_Transactions_Admin_Page
 * @subpackage      caffeinated/admin/extend/transactions/Extend_Transactions_Admin_Page.core.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Transactions_Admin_Page extends Transactions_Admin_Page
{
    /**
     * This is used to hold the reports template data which is setup early in the request.
     *
     * @type array
     */
    protected $_reports_template_data = [];


    /**
     * @Constructor
     * @access public
     *
     * @param bool $routing
     *
     * @throws ReflectionException
     */
    public function __construct($routing = true)
    {
        parent::__construct($routing);
        define('TXN_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'transactions/templates/');
        define('TXN_CAF_ASSETS', EE_CORE_CAF_ADMIN_EXTEND . 'transactions/assets/');
        define('TXN_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'transactions/assets/');
    }


    protected function _set_page_config()
    {
        parent::_set_page_config();

        $this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'transactions';

        $new_page_routes = [
            'reports' => [
                'func'       => '_transaction_reports',
                'capability' => 'ee_read_transactions',
            ],
        ];

        $this->_page_routes = array_merge($this->_page_routes, $new_page_routes);

        $new_page_config    = [
            'reports' => [
                'nav'           => [
                    'label' => esc_html__('Reports', 'event_espresso'),
                    'icon'  => 'dashicons-chart-bar',
                    'order' => 20,
                ],
                'help_tabs'     => [
                    'transactions_reports_help_tab' => [
                        'title'    => esc_html__('Transaction Reports', 'event_espresso'),
                        'filename' => 'transactions_reports',
                    ],
                ],
                'require_nonce' => false,
            ],
        ];
        $this->_page_config = array_merge($this->_page_config, $new_page_config);
    }


    /**
     *    load_scripts_styles_reports
     *
     * @access public
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function load_scripts_styles_reports()
    {
        wp_register_script(
            'ee-txn-reports-js',
            TXN_CAF_ASSETS_URL . 'ee-transaction-admin-reports.js',
            ['google-charts'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_enqueue_script('ee-txn-reports-js');
        $this->_transaction_reports_js_setup();
        EE_Registry::$i18n_js_strings['currency_format'] = EEH_Money::get_format_for_google_charts();
    }


    /**
     * This is called when javascript is being enqueued to setup the various data needed for the reports js.
     * Also $this->{$_reports_template_data} property is set for later usage by the _transaction_reports method.
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _transaction_reports_js_setup()
    {
        $this->_reports_template_data['admin_reports'][] = $this->_revenue_per_day_report();
        $this->_reports_template_data['admin_reports'][] = $this->_revenue_per_event_report();
    }


    /**
     * _transaction_reports
     *    generates Business Reports regarding Transactions
     *
     * @return void
     * @throws EE_Error
     */
    protected function _transaction_reports()
    {
        $template_path                              = EE_ADMIN_TEMPLATE . 'admin_reports.template.php';
        $this->_admin_page_title                    = esc_html__('Transactions', 'event_espresso');
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            $template_path,
            $this->_reports_template_data,
            true
        );

        // the final template wrapper
        $this->display_admin_page_with_no_sidebar();
    }


    /**
     * _revenue_per_day_report
     * generates Business Report showing Total Revenue per Day.
     *
     * @param string $period The period (acceptable by PHP Datetime constructor) for which the report is generated.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    private function _revenue_per_day_report($period = '-1 month')
    {
        $report_ID = 'txn-admin-revenue-per-day-report-dv';

        $TXN = EEM_Transaction::instance();

        $results  = $TXN->get_revenue_per_day_report($period);
        $results  = (array) $results;
        $revenue  = [];
        $subtitle = '';

        if ($results) {
            $revenue[] = [
                esc_html__('Date (only shows dates that have a revenue greater than 1)', 'event_espresso'),
                esc_html__('Total Revenue', 'event_espresso'),
            ];
            foreach ($results as $result) {
                $revenue[] = [$result->txnDate, (float) $result->revenue];
            }

            // setup the date range.
            $beginning_date = new DateTime('now' . $period, new DateTimeZone(EEH_DTT_Helper::get_timezone()));
            $ending_date    = new DateTime('now', new DateTimeZone(EEH_DTT_Helper::get_timezone()));
            $subtitle       = sprintf(
                wp_strip_all_tags(
                    _x('For the period: %s to %s', 'Used to give date range', 'event_espresso')
                ),
                $beginning_date->format('Y-m-d'),
                $ending_date->format('Y-m-d')
            );
        }

        $report_title = wp_strip_all_tags(__('Total Revenue per Day', 'event_espresso'));

        $report_params = [
            'title'     => $report_title,
            'subtitle'  => $subtitle,
            'id'        => $report_ID,
            'revenue'   => $revenue,
            'noResults' => empty($revenue) || count($revenue) === 1,
            'noTxnMsg'  => sprintf(
                wp_strip_all_tags(
                    __('%sThere is no revenue to report for the last 30 days.%s', 'event_espresso')
                ),
                '<h2>' . $report_title . '</h2><p>',
                '</p>'
            ),
        ];
        wp_localize_script('ee-txn-reports-js', 'txnRevPerDay', $report_params);

        return $report_ID;
    }


    /**
     * _revenue_per_event_report
     * generates Business Report showing total revenue per event.
     *
     * @param string $period The period (acceptable by PHP Datetime constructor) for which the report is generated.
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    private function _revenue_per_event_report($period = '-1 month')
    {
        $report_ID = 'txn-admin-revenue-per-event-report-dv';

        $TXN      = EEM_Transaction::instance();
        $results  = $TXN->get_revenue_per_event_report($period);
        $results  = (array) $results;
        $revenue  = [];
        $subtitle = '';

        if ($results) {
            $revenue[] = [
                esc_html__('Event (only events that have a revenue greater than 1 are shown)', 'event_espresso'),
                esc_html__('Total Revenue', 'event_espresso'),
            ];
            foreach ($results as $result) {
                if ($result->revenue > 1) {
                    $event_name = stripslashes(html_entity_decode($result->event_name, ENT_QUOTES, 'UTF-8'));
                    $event_name = wp_trim_words($event_name, 5, '...');
                    $revenue[]  = [$event_name, (float) $result->revenue];
                }
            }

            // setup the date range.
            $beginning_date = new DateTime('now' . $period, new DateTimeZone(EEH_DTT_Helper::get_timezone()));
            $ending_date    = new DateTime('now', new DateTimeZone(EEH_DTT_Helper::get_timezone()));
            $subtitle       = sprintf(
                wp_strip_all_tags(
                    _x('For the period: %s to %s', 'Used to give date range', 'event_espresso')
                ),
                $beginning_date->format('Y-m-d'),
                $ending_date->format('Y-m-d')
            );
        }

        $report_title = wp_strip_all_tags(__('Total Revenue per Event', 'event_espresso'));

        $report_params = [
            'title'     => $report_title,
            'subtitle'  => $subtitle,
            'id'        => $report_ID,
            'revenue'   => $revenue,
            'noResults' => empty($revenue),
            'noTxnMsg'  => sprintf(
                wp_strip_all_tags(
                    __('%sThere is no revenue to report for the last 30 days.%s', 'event_espresso')
                ),
                '<h2>' . $report_title . '</h2><p>',
                '</p>'
            ),
        ];
        wp_localize_script('ee-txn-reports-js', 'txnRevPerEvent', $report_params);

        return $report_ID;
    }
}
