<?php

namespace EventEspresso\core\libraries\rest_api\controllers\rpc;

use WP_Error;
use WP_REST_Response;
use WP_REST_Request;
use EE_Registration;
use EEM_Registration;
use EE_Capabilities;
use EE_Checkin;
use EEM_Checkin;
use EED_Core_Rest_Api;
use EventEspresso\core\libraries\rest_api\controllers\Base as Base;
use EventEspresso\core\libraries\rest_api\controllers\model\Read;

/**
 * Controller for handling checkin/checkout requests
 * Handles the RPC-style requests to check a registrant into a datetime
 * or check them out
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class Checkin extends Base
{

    /**
     * @param WP_REST_Request $request
     * @param string          $version
     * @return WP_Error|WP_REST_Response
     */
    public static function handleRequestToggleCheckin(WP_REST_Request $request, $version)
    {
        $controller = new Checkin();
        return $controller->createCheckinCheckoutObject($request, $version);
    }


    /**
     * Toggles whether the user is checked in or not.
     *
     * @param WP_REST_Request $request
     * @param string          $version
     * @return WP_Error|WP_REST_Response
     */
    protected function createCheckinCheckoutObject(WP_REST_Request $request, $version)
    {
        $reg_id = $request->get_param('REG_ID');
        $dtt_id = $request->get_param('DTT_ID');
        $force = $request->get_param('force');
        if ($force == 'true') {
            $force = true;
        } else {
            $force = false;
        }
        $reg = EEM_Registration::instance()->get_one_by_ID($reg_id);
        if (! $reg instanceof EE_Registration) {
            return $this->sendResponse(
                new WP_Error(
                    'rest_registration_toggle_checkin_invalid_id',
                    sprintf(
                        __(
                            'You cannot checkin registration with ID %1$s because it doesn\'t exist.',
                            'event_espresso'
                        ),
                        $reg_id
                    ),
                    array('status' => 422)
                )
            );
        }
        if (! EE_Capabilities::instance()->current_user_can('ee_edit_checkin', 'rest_api_checkin_endpoint', $reg_id)) {
            return $this->sendResponse(
                new WP_Error(
                    'rest_user_cannot_toggle_checkin',
                    sprintf(
                        __('You are not allowed to checkin registration with ID %1$s.', 'event_espresso'),
                        $reg_id
                    ),
                    array('status' => 403)
                )
            );
        }
        $success = $reg->toggle_checkin_status($dtt_id, ! $force);
        if ($success === false) {
            // check if we know they can't check in because they're not approved and we aren't forcing
            if (! $reg->is_approved() && ! $force) {
                // rely on EE_Error::add_error messages to have been added to give more data about why it failed
                return $this->sendResponse(
                    new WP_Error(
                        'rest_toggle_checkin_failed',
                        __(
                        // @codingStandardsIgnoreStart
                            'Registration check-in failed because the registration is not approved. You may attempt to force checking in though.',
                            // @codingStandardsIgnoreEnd
                            'event_espresso'
                        )
                    )
                );
            }
            return $this->sendResponse(
                new WP_Error(
                    'rest_toggle_checkin_failed_not_forceable',
                    __('Registration checkin failed. Please see additional error data.', 'event_espresso')
                )
            );
        }
        $checkin = EEM_Checkin::instance()->get_one(
            array(
                array(
                    'REG_ID' => $reg_id,
                    'DTT_ID' => $dtt_id,
                ),
                'order_by' => array(
                    'CHK_timestamp' => 'DESC',
                ),
            )
        );
        if (! $checkin instanceof EE_Checkin) {
            return $this->sendResponse(
                new WP_Error(
                    'rest_toggle_checkin_error',
                    sprintf(
                        __(
                        // @codingStandardsIgnoreStart
                            'Supposedly we created a new checkin object for registration %1$s at datetime %2$s, but we can\'t find it.',
                            // @codingStandardsIgnoreEnd
                            'event_espresso'
                        ),
                        $reg_id,
                        $dtt_id
                    )
                )
            );
        }
        $get_request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . 'v' . $version . '/checkins/' . $checkin->ID()
        );
        $get_request->set_url_params(
            array(
                'id' => $checkin->ID(),
            )
        );
        return Read::handleRequestGetOne($get_request, $version, 'Checkin');
    }
}
