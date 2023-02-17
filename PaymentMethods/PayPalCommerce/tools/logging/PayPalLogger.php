<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\tools\logging;

use EE_Error;
use EE_Payment_Method;
use EED_PayPalOnboard;
use EEM_Payment_Method;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use ReflectionException;

/**
 * Class PayPalLogger
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class PayPalLogger
{
    /**
     * Log an error, return a json message and maybe exit.
     *
     * @param string                 $error_message
     * @param array                  $data
     * @param EE_Payment_Method|null $paypal_pm
     * @param bool                   $return_json Should we echo json and exit
     * @param bool                   $popup_log
     * @param bool                   $show_alert  Show an alert on the front end or not
     * @return void
     * @throws EE_Error
     */
    public static function errorLogAndExit(
        string $error_message = '',
        array $data = [],
        ?EE_Payment_Method $paypal_pm = null,
        bool $return_json = true,
        bool $popup_log = false,
        bool $show_alert = false
    ) {
        self::errorLog($error_message, $data, $paypal_pm, $popup_log);
        // Do we echo json and exit ?
        if ($return_json) {
            EED_PayPalOnboard::exitWithError($error_message, $show_alert);
        }
        if ($popup_log) {
            self::logInWindow($error_message);
        }
        self::closeWindowAndExit();
    }


    /**
     * Log an error, return a json message.
     *
     * @param string                 $error_message
     * @param array                  $data
     * @param EE_Payment_Method|null $paypal_pm
     * @param bool                   $popup_log
     * @return bool
     * @throws EE_Error|ReflectionException
     */
    public static function errorLog(
        string $error_message = '',
        array $data = [],
        ?EE_Payment_Method $paypal_pm = null,
        bool $popup_log = false
    ): bool {
        $default_msg = 'PayPal Commerce error';
        if ($data) {
            $data        = self::cleanDataArray($data);
            $default_msg = $error_message;
        }
        if (! $paypal_pm instanceof EE_Payment_Method) {
            // Default to the standard PP Commerce PM.
            $paypal_pm = EEM_Payment_Method::instance()->get_one_by_slug(Domain::PM_SLUG);
        }
        $paypal_pm->type_obj()->get_gateway()->log([$default_msg => $data], $paypal_pm);
        if ($popup_log) {
            self::logInWindow(json_encode($data));
        }
        // Yes, always return true.
        return true;
    }


    /**
     * Clean the array of data from sensitive information.
     *
     * @param array $data
     * @return array
     */
    private static function cleanDataArray(array $data): array
    {
        $sensitive_data = [
            'access_token',
            'refresh_token',
            'nonce',
            'seller_nonce',
            'client_secret',
            Domain::API_KEY_AUTH_CODE,
            'Authorization',
        ];
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                // Json encoded ?
                $value = json_decode($value) ?? $value;
            }
            $value = is_array($value) ? self::cleanDataArray($value) : $value;
            if (is_string($key) && in_array($key, $sensitive_data)) {
                $data[ $key ] = empty($value) ? '**empty**' : '**hidden**';
            } else {
                $data[ $key ] = $value;
            }
        }
        return $data;
    }


    /**
     * Close the OAuth window with JS.
     *
     * @param string $message
     * @return void
     */
    public static function logInWindow(string $message)
    {
        $js_out = '<script type="text/javascript">
                if (window.opener) {
                    try {
                        window.opener.console.log("' . $message . '");
                    } catch (e) {
                        console.log("' . $message . '");
                    }
                }
            </script>';
        echo $js_out;
        exit();
    }


    /**
     * Close the JS opened auth window.
     *
     * @param string $message
     * @return void
     */
    public static function closeWindowAndExit(string $message = '')
    {
        $js_out = '<script type="text/javascript">';
        if (! empty($message)) {
            $js_out .= '
                if (window.opener) {
                    try {
                        window.opener.console.log("' . $message . '");
                    } catch (e) {
                        console.log("' . $message . '");
                    }
                }
            ';
        }
        $js_out .= 'window.opener = self;
            window.close();
            </script>';
        echo $js_out;
        exit();
    }
}
