<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports;

use EE_Capabilities;

/**
 * Class RegistrationsCsvReportParams
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports
 * @since   4.10.31.p
 */
class RegistrationsCsvReportParams
{
    /**
     * @param string $return_url
     * @param array  $request_params
     * @param int    $EVT_ID
     * @param int    $DTT_ID
     * @return array
     */
    public static function getRequestParams(
        string $return_url,
        array $request_params = [],
        int $EVT_ID = 0,
        int $DTT_ID = 0
    ): array {
        if (
            ! EE_Capabilities::instance()->current_user_can(
                'ee_read_registrations',
                'espresso_registrations_registrations_reports',
                $EVT_ID
            )
        ) {
            return [];
        }
        unset($request_params['_wp_http_referer']);
        add_action(
            'AHEE__EE_Admin_List_Table__extra_tablenav__after_bottom_buttons',
            [RegistrationsCsvReportParams::class, 'csvReportNotice']
        );

        $route_details = [
            'route'         => 'registrations_report',
            'extra_request' => [ 'return_url' => $return_url ],
            'btn_class'     => 'button button--primary',
        ];
        if (! empty($EVT_ID)) {
            $route_details['extra_request']['EVT_ID'] = $EVT_ID;
        }
        if ($DTT_ID) {
            $route_details['extra_request']['DTT_ID'] = $DTT_ID;
        }
        // detect views (status) or searches (s) and set "use_filters" to true
        if (
            isset($request_params['_reg_status'])
            || isset($request_params['datetime_id'])
            || isset($request_params['event_id'])
            || isset($request_params['s'])
            || isset($request_params['status'])
            || isset($request_params['ticket_id'])
        ) {
            $request_params['use_filters'] = true;
            $route_details['extra_request']['use_filters'] = true;
        }
        if (
            isset($request_params['use_filters'])
            && filter_var($request_params['use_filters'], FILTER_VALIDATE_BOOLEAN)
        ) {
            $route_details['extra_request']['filters'] = array_diff_key(
                $request_params,
                [
                    'page'          => '',
                    'action'        => '',
                    'default_nonce' => '',
                ]
            );
            unset($route_details['extra_request']['filters']['use_filters']);
        }
        return $route_details;
    }


    public static function csvReportNotice()
    {
        echo '
    <span class="csv-report-notice__wrapper">
        <span class="dashicons dashicons-info"></span>
        <span class="csv-report-notice__text">
        ' .  esc_html('All Registration CSV Reports are now triggered by the preceding button') . '
        </span>
    </span>';
    }
}
