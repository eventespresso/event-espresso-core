<?php
/**
 * Class EE_URL_Validation_Strategy
 *
 * @package             Event Espresso
 * @subpackage  core
 * @author              Mike Nelson
 * @since               4.6
 *
 */
class EE_URL_Validation_Strategy extends EE_Validation_Strategy_Base
{

    /**
     * @var @boolean whether we should check if the file exists or not
     */
    protected $check_file_exists;

    /**
     * @param null $validation_error_message
     * @param boolean $check_file_exists
     */
    public function __construct($validation_error_message = null, $check_file_exists = false)
    {
        if (! $validation_error_message) {
            $validation_error_message = __("Please enter a valid URL. Eg https://eventespresso.com", "event_espresso");
        }
        $this->check_file_exists = $check_file_exists;
        parent::__construct($validation_error_message);
    }



    /**
     * just checks the field isn't blank
     *
     * @param $normalized_value
     * @return bool
     * @throws \EE_Validation_Error
     */
    public function validate($normalized_value)
    {
        if ($normalized_value) {
            if (filter_var($normalized_value, FILTER_VALIDATE_URL) === false) {
                throw new EE_Validation_Error($this->get_validation_error_message(), 'invalid_url');
            } elseif (apply_filters('FHEE__EE_URL_Validation_Strategy__validate__check_remote_file_exists', $this->check_file_exists, $this->_input)) {
                if (! EEH_URL::remote_file_exists(
                    $normalized_value,
                    array(
                            'sslverify' => false,
                            'limit_response_size' => 4095,// we don't really care for a full response, but we do want headers at least. Lets just ask for a one block
                        )
                )) {
                    throw new EE_Validation_Error(sprintf(__("That URL seems to be broken. Please enter a valid URL", "event_espresso")));
                }
            }
        }
    }



    /**
     * @return array
     */
    public function get_jquery_validation_rule_array()
    {
        return array( 'validUrl'=>true, 'messages' => array( 'validUrl' => $this->get_validation_error_message() ) );
    }
}
