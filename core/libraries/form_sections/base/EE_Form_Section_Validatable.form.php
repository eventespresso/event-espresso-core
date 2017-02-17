<?php
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 * @ package            Event Espresso
 * @ author            Seth Shoultes
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link                    http://www.eventespresso.com
 * @ version            4.3
 * ------------------------------------------------------------------------
 * EE_Form_Section_Validatable
 * Class for cross-cutting job of handling forms.
 * In the presentation layer Form Sections handle the display of form inputs on the page.
 * In both the presentation and controller layer, Form Sections handle validation (by js and php)
 * Used from within a controller, Form Sections handle input sanitization.
 * And the EE_Model_Form_Section takes care of taking a model object and producing a generic form section,
 * and takes a filled form section, and can save the model object to the database.
 * Note there are actually two children of EE_Form_Section_Validatable: EE_Form_Section_Proper and EE_Form_Input_Base.
 * The former is what you probably expected EE_Form_Section_Validatable to be, whereas the latter is the parent class
 * for all fields within a form section. So this means that a Form Input is considered a subsection of form section in
 * its own right.
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 *                        ------------------------------------------------------------------------
 */
abstract class EE_Form_Section_Validatable extends EE_Form_Section_Base
{

    /**
     * Array of validation errors in this section. Does not contain validation errors in subsections, however.
     * Those are stored individually on each subsection.
     *
     * @var EE_Validation_Error[]
     */
    protected $_validation_errors = array();



    /**
     * Errors on this form section. Note: EE_Form_Section_Proper
     * has another function for getting all errors in this form section and subsections
     * called get_validation_errors_accumulated
     *
     * @return EE_Validation_Error[]
     */
    public function get_validation_errors()
    {
        return $this->_validation_errors;
    }



    /**
     * returns a ul html element with all the validation errors in it.
     * If we want this to be customizable, we may decide to create a strategy for displaying it.
     *
     * @return string
     */
    public function get_validation_error_string()
    {
        $validation_error_messages = array();
        if ($this->get_validation_errors()) {
            foreach ($this->get_validation_errors() as $validation_error) {
                if ($validation_error instanceof EE_Validation_Error) {
                    $validation_error_messages[] = $validation_error->getMessage();
                }
            }
        }
        return implode(", ", $validation_error_messages);
    }



    /**
     * Performs validation on this form section (and subsections). Should be called after _normalize()
     *
     * @return boolean of whether or not the form section is valid
     */
    abstract protected function _validate();



    /**
     * Checks if this field has any validation errors
     *
     * @return boolean
     */
    public function is_valid()
    {
        if (count($this->_validation_errors)) {
            return false;
        } else {
            return true;
        }
    }



    /**
     * Sanitizes input for this form section
     *
     * @param array $req_data is the full request data like $_POST
     * @return boolean of whether a normalization error occurred
     */
    abstract protected function _normalize($req_data);



    /**
     * Creates a validation error from the arguments provided, and adds it to the form section's list.
     * If such an EE_Validation_Error object is passed in as the first arg, simply sets this as its form section, and
     * adds it to the list of validation errors of errors
     *
     * @param mixed     $message_or_object  internationalized string describing the validation error; or it could be a
     *                                      proper EE_Validation_Error object
     * @param string    $error_code         a short key which can be used to uniquely identify the error
     * @param Exception $previous_exception if there was an exception that caused the error, that exception
     * @return void
     */
    public function add_validation_error($message_or_object, $error_code = null, $previous_exception = null)
    {
        if ($message_or_object instanceof EE_Validation_Error) {
            $validation_error = $message_or_object;
            $validation_error->set_form_section($this);
        } else {
            $validation_error = new EE_Validation_Error($message_or_object, $error_code, $this, $previous_exception);
        }
        $this->_validation_errors[] = $validation_error;
    }



    /**
     * When generating the JS for the jquery validation rules like<br>
     * <code>$( "#myform" ).validate({
     * rules: {
     * password: "required",
     * password_again: {
     * equalTo: "#password"
     * }
     * }
     * });</code>
     * gets the sections like
     * <br><code>password: "required",
     * password_again: {
     * equalTo: "#password"
     * }</code>
     * except we leave it as a PHP object, and leave wp_localize_script to
     * turn it into a JSON object which can be used by the js
     *
     * @return array
     */
    abstract public function get_jquery_validation_rules();



    /**
     * Checks if this form section's data is present in the req data specified
     *
     * @param array $req_data usually $_POST, if null that's what's used
     * @return boolean
     */
    abstract public function form_data_present_in($req_data = null);



    /**
     * Removes teh sensitive data from this form section (usually done after
     * utilizing the data business function, but before saving it somewhere. Eg,
     * may remove a password from the form after verifying it was correct)
     *
     * @return void
     */
    abstract public function clean_sensitive_data();
}