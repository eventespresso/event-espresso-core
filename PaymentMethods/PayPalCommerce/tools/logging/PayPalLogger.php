<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\tools\logging;

use EE_Error;
use EE_Gateway;
use EE_Payment_Method;
use EEM_Payment_Method;
use EventEspresso\core\exceptions\ExceptionLogger;
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
     * @param mixed             $object_logged
     * @param bool                   $return_json Should we echo json and exit
     * @param bool                   $popup_log
     * @param bool                   $show_alert  Show an alert on the front end or not
     * @return void
     */
    public static function errorLogAndExit(
        string $error_message = '',
        array $data = [],
        ?EE_Payment_Method $paypal_pm = null,
        bool $return_json = true,
        bool $popup_log = false,
        bool $show_alert = false,
        $object_logged = null
    ): void {
        PayPalLogger::errorLog($error_message, $data, $paypal_pm, $popup_log, $object_logged);
        // Do we echo json and exit or just close the window ?
        if ($return_json) {
            PayPalLogger::exitWithJson($error_message, $show_alert);
        }
        if ($popup_log) {
            PayPalLogger::logInWindow($error_message);
        }
        PayPalLogger::closeWindowAndExit();
    }


    /**
     * Log an error, return a json message.
     *
     * @param string                 $error_message
     * @param array                  $data
     * @param EE_Payment_Method|null $paypal_pm
     * @param mixed             $object_logged
     * @param bool                   $popup_log
     * @return bool
     */
    public static function errorLog(
        string $error_message = '',
        array $data = [],
        ?EE_Payment_Method $paypal_pm = null,
        bool $popup_log = false,
        $object_logged = null
    ): bool {
        $default_msg = 'PayPal Commerce error';
        if ($data) {
            $data        = PayPalLogger::cleanDataArray($data);
            $default_msg = $error_message;
        }
        try {
            if (! $paypal_pm instanceof EE_Payment_Method) {
                // Default to the standard PP Commerce PM.
                $paypal_pm = EEM_Payment_Method::instance()->get_one_by_slug(Domain::PM_SLUG);
            }
            $paypal_gateway = $paypal_pm->type_obj()->get_gateway();
            if ($paypal_gateway instanceof EE_Gateway) {
                $paypal_gateway->log([$default_msg => $data], $object_logged);
            }
            if ($popup_log) {
                PayPalLogger::logInWindow(json_encode($data));
            }
        } catch (ReflectionException | EE_Error $error) {
            new ExceptionLogger($error);
            return false;
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
            'merchantIdInPayPal',
        ];
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                // Json encoded ?
                $value = json_decode($value) ?? $value;
            }
            $value = is_array($value) ? PayPalLogger::cleanDataArray($value) : $value;
            // Validate the data type. Some objects won't encode easily, so try getting from them some basic info.
            if (is_object($value)) {
                $obj_vars = get_object_vars($value);
                $value    = ! empty($obj_vars) ? PayPalLogger::cleanDataArray($obj_vars) : get_class($value);
            }
            if (is_string($key) && in_array($key, $sensitive_data)) {
                $data[ $key ] = empty($value) ? '**empty**' : '**hidden**';
            } else {
                $data[ $key ] = $value;
            }
        }
        return $data;
    }


    /**
     * Return error message as json allowing to show an alert on the front-end.
     *
     * @param string $error_message
     * @param bool   $show_alert
     * @return void
     */
    public static function exitWithJson(string $error_message = '', bool $show_alert = false)
    {
        wp_send_json(
            [
                'error'   => $error_message,
                'message' => $error_message,
                'alert'   => $show_alert,
            ]
        );
    }


    /**
     * Close the OAuth window with JS.
     *
     * @param string $message
     * @return void
     */
    public static function logInWindow(string $message): void
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
        wp_die();
    }


    /**
     * Close the JS opened auth window.
     *
     * @param string $message
     * @return void
     */
    public static function closeWindowAndExit(string $message = ''): void
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
        wp_die();
    }
}
