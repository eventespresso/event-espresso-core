<?php

namespace EventEspresso\caffeinated\modules\recaptcha_invisible;

use EE_Error;
use EE_Form_Section_Proper;
use EE_Invisible_Recaptcha_Input;
use EE_Registration_Config;
use EE_Request;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use RuntimeException;
use WP_Error;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ProcessInvisibleRecaptcha
 * Provides methods for integrating Google's Invisible reCAPTCHA into EE Forms
 * and for verifying the 'g-recaptcha-response' response token
 *
 * @package EventEspresso\caffeinated\modules\recaptcha_invisible
 * @author  Brent Christensen
 * @since   $VID:$
 */
class InvisibleRecaptcha
{

    const URL_GOOGLE_RECAPTCHA_API          = 'https://www.google.com/recaptcha/api/siteverify';

    const SESSION_DATA_KEY_RECAPTCHA_PASSED = 'recaptcha_passed';

    /**
     * @var EE_Registration_Config $config
     */
    private $config;


    /**
     * InvisibleRecaptcha constructor.
     *
     * @param EE_Registration_Config $registration_config
     */
    public function __construct(EE_Registration_Config $registration_config)
    {
        $this->config = $registration_config;
    }


    /**
     * @param array $input_settings
     * @return EE_Invisible_Recaptcha_Input
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function getInput(array $input_settings = array())
    {
        return new EE_Invisible_Recaptcha_Input(
            $input_settings,
            $this->config
        );
    }


    /**
     * @param array $input_settings
     * @return string
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function getInputHtml(array $input_settings = array())
    {
        return $this->getInput($input_settings)->get_html_for_input();
    }


    /**
     * @param EE_Form_Section_Proper $form
     * @param array                  $input_settings
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function addToFormSection(EE_Form_Section_Proper $form, array $input_settings = array())
    {
        $form->add_subsections(
            array(
                'espresso_recaptcha' => $this->getInput($input_settings),
            ),
            null,
            false
        );
    }


    /**
     * @param EE_Request $request
     * @return boolean
     * @throws RuntimeException
     */
    public function verifyToken(EE_Request $request)
    {
        static $previous_recaptcha_response = array();
        $grecaptcha_response = $request->get('g-recaptcha-response');
        // if this token has already been verified, then return previous response
        if (isset($previous_recaptcha_response[ $grecaptcha_response ])) {
            return $previous_recaptcha_response[ $grecaptcha_response ];
        }
        // will update to true if everything passes
        $previous_recaptcha_response[ $grecaptcha_response ] = false;
        $response                                            = wp_safe_remote_post(
            InvisibleRecaptcha::URL_GOOGLE_RECAPTCHA_API,
            array(
                'body' => array(
                    'secret'   => $this->config->recaptcha_privatekey,
                    'response' => $grecaptcha_response,
                    'remoteip' => $request->ip_address(),
                ),
            )
        );
        if ($response instanceof WP_Error) {
            $this->generateError($response->get_error_messages());
            return false;
        }
        $results = json_decode(wp_remote_retrieve_body($response), true);
        if (filter_var($results['success'], FILTER_VALIDATE_BOOLEAN) !== true) {
            $errors   = array_map(
                array($this, 'getErrorCode'),
                $results['error-codes']
            );
            $errors[] = 'challenge timestamp: ' . $results['challenge_ts'] . '.';
            $this->generateError(implode(' ', $errors));
        }
        $previous_recaptcha_response[ $grecaptcha_response ] = true;
        return true;
    }


    /**
     * @param string $error_response
     * @return void
     * @throws RuntimeException
     */
    public function generateError($error_response = '')
    {
        throw new RuntimeException(
            sprintf(
                esc_html__(
                    'We\'re sorry but an attempt to verify the form\'s reCAPTCHA has failed. %1$s %2$s Please try again.',
                    'event_espresso'
                ),
                '<br />',
                current_user_can('manage_options') ? $error_response : ''
            )
        );
    }


    /**
     * @param string $error_code
     * @return string
     */
    public function getErrorCode(&$error_code)
    {
        $error_codes = array(
            'missing-input-secret'   => 'The secret parameter is missing.',
            'invalid-input-secret'   => 'The secret parameter is invalid or malformed.',
            'missing-input-response' => 'The response parameter is missing.',
            'invalid-input-response' => 'The response parameter is invalid or malformed.',
            'bad-request'            => 'The request is invalid or malformed.',
            'timeout-or-duplicate'   => 'The request took too long to be sent or was a duplicate of a previous request.',
        );
        return isset($error_codes[ $error_code ]) ? $error_codes[ $error_code ] : '';
    }
}
