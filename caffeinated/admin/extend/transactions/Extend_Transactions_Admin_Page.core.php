<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package         Event Espresso
 * @author          Seth Shoultes
 * @copyright    (c)2009-2012 Event Espresso All Rights Reserved.
 * @license         http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link            http://www.eventespresso.com
 * @version         4.0
 *
 * ------------------------------------------------------------------------
 *
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
     * @type array
     */
    protected $_reports_template_data = array();
    
    /**
     * @Constructor
     * @access public
     *
     * @param bool $routing
     *
     * @return \Extend_Transactions_Admin_Page
     */
    public function __construct($routing = true)
    {
        parent::__construct($routing);
        define('TXN_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'transactions/templates/');
        define('TXN_CAF_ASSETS', EE_CORE_CAF_ADMIN_EXTEND . 'transactions/assets/');
        define('TXN_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'transactions/assets/');
    }
    
    
    /**
     *    _extend_page_config
     *
     * @access protected
     * @return void
     */
    protected function _extend_page_config()
    {
        $this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'transactions';
        
        $new_page_routes = array(
            'reports' => array(
                'func'       => '_transaction_reports',
                'capability' => 'ee_read_transactions'
            )
        );
        
        $this->_page_routes = array_merge($this->_page_routes, $new_page_routes);
        
        $new_page_config    = array(
            'reports' => array(
                'nav'           => array(
                    'label' => __('Reports', 'event_espresso'),
                    'order' => 20
                ),
                'help_tabs'     => array(
                    'transactions_reports_help_tab' => array(
                        'title'    => __('Transaction Reports', 'event_espresso'),
                        'filename' => 'transactions_reports'
                    )
                ),
                /*'help_tour' => array( 'Transaction_Reports_Help_Tour' ),*/
                'require_nonce' => false
            )
        );
        $this->_page_config = array_merge($this->_page_config, $new_page_config);
    }
    
    
    /**
     *    load_scripts_styles_reports
     *
     * @access public
     * @return void
     */
    public function load_scripts_styles_reports()
    {
        wp_register_script('ee-txn-reports-js', TXN_CAF_ASSETS_URL . 'ee-transaction-admin-reports.js',
            array('google-charts'), EVENT_ESPRESSO_VERSION, true);
        wp_enqueue_script('ee-txn-reports-js');
        $this->_transaction_reports_js_setup();
        EE_Registry::$i18n_js_strings['currency_format'] = EEH_Money::get_format_for_google_charts();
    }
    
    
    /**
     * This is called when javascript is being enqueued to setup the various data needed for the reports js.
     * Also $this->{$_reports_template_data} property is set for later usage by the _transaction_reports method.
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
     */
    protected function _transaction_reports()
    {
        $template_path                              = EE_ADMIN_TEMPLATE . 'admin_reports.template.php';
        $this->_admin_page_title                    = __('Transactions', 'event_espresso');
        $this->_template_args['admin_page_content'] = EEH_Template::display_template($template_path,
            $this->_reports_template_data, true);
        
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
     */
    private function _revenue_per_day_report($period = '-1 month')
    {
        
        $report_ID = 'txn-admin-revenue-per-day-report-dv';
        
        $TXN = EEM_Transaction::instance();
        
        $results  = $TXN->get_revenue_per_day_report($period);
        $results  = (array)$results;
        $revenue  = array();
        $subtitle = '';
        
        if ($results) {
            $revenue[] = array(
                __('Date (only shows dates that have a revenue greater than 1)', 'event_espresso'),
                __('Total Revenue', 'event_espresso')
            );
            foreach ($results as $result) {
                $revenue[] = array($result->txnDate, (float)$result->revenue);
            }
            
            //setup the date range.
            $beginning_date = new DateTime('now' . $period, new DateTimeZone(EEH_DTT_Helper::get_timezone()));
            $ending_date    = new DateTime('now', new DateTimeZone(EEH_DTT_Helper::get_timezone()));
            $subtitle       = sprintf(_x('For the period: %s to %s', 'Used to give date range', 'event_espresso'),
                $beginning_date->format('Y-m-d'), $ending_date->format('Y-m-d'));
        }
        
        $report_title = esc_html__('Total Revenue per Day', 'event_espresso');
        
        $report_params = array(
            'title'     => $report_title,
            'subtitle'  => $subtitle,
            'id'        => $report_ID,
            'revenue'   => $revenue,
            'noResults' => empty($revenue) || count($revenue) === 1,
            'noTxnMsg'  => sprintf(__('%sThere is no revenue to report for the last 30 days.%s', 'event_espresso'),
                '<h2>' . $report_title . '</h2><p>', '</p>')
        );
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
     */
    private function _revenue_per_event_report($period = '-1 month')
    {
        
        $report_ID = 'txn-admin-revenue-per-event-report-dv';
        
        $TXN      = EEM_Transaction::instance();
        $results  = $TXN->get_revenue_per_event_report($period);
        $results  = (array)$results;
        $revenue  = array();
        $subtitle = '';
        
        if ($results) {
            $revenue[] = array(
                __('Event (only events that have a revenue greater than 1 are shown)', 'event_espresso'),
                __('Total Revenue', 'event_espresso')
            );
            foreach ($results as $result) {
                if ($result->revenue > 1) {
                    $event_name = stripslashes(html_entity_decode($result->event_name, ENT_QUOTES, 'UTF-8'));
                    $event_name = wp_trim_words($event_name, 5, '...');
                    $revenue[]  = array($event_name, (float)$result->revenue);
                }
            }
            
            //setup the date range.
            $beginning_date = new DateTime('now' . $period, new DateTimeZone(EEH_DTT_Helper::get_timezone()));
            $ending_date    = new DateTime('now', new DateTimeZone(EEH_DTT_Helper::get_timezone()));
            $subtitle       = sprintf(_x('For the period: %s to %s', 'Used to give date range', 'event_espresso'),
                $beginning_date->format('Y-m-d'), $ending_date->format('Y-m-d'));
        }
        
        $report_title = esc_html__('Total Revenue per Event', 'event_espresso');
        
        $report_params = array(
            'title'     => $report_title,
            'subtitle'  => $subtitle,
            'id'        => $report_ID,
            'revenue'   => $revenue,
            'noResults' => empty($revenue),
            'noTxnMsg'  => sprintf(__('%sThere is no revenue to report for the last 30 days.%s', 'event_espresso'),
                '<h2>' . $report_title . '</h2><p>', '</p>')
        );
        wp_localize_script('ee-txn-reports-js', 'txnRevPerEvent', $report_params);
        
        return $report_ID;
    }
    
}
