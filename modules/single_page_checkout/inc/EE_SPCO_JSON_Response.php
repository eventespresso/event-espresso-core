<?php

/**
 *
 * Class EE_SPCO_JSON_Response
 *
 * This class is responsible for building and sending JSON responses for the Single Page Checkout (SPCO) module.
 * It collects various types of response data such as errors, success messages, and other relevant information.
 * The class provides methods to set these data, build the final response, and send it.
 * It also supports adding validation rules and handling payment related data.
 *
 * @package     Event Espresso
 * @subpackage  core
 * @author      Brent Christensen
 */
class EE_SPCO_JSON_Response
{
    protected string $_errors = '';

    protected string $_unexpected_errors = '';

    protected string $_attention = '';

    protected string $_success = '';

    protected string $_plz_select_method_of_payment = '';

    protected string $_redirect_url = '';

    protected string $_registration_time_limit = '';

    protected string $_redirect_form = '';

    protected string $_reg_step_html = '';

    protected string $_method_of_payment = '';

    protected ?float $_payment_amount = 0.00;

    protected array $_return_data = [];

    protected array $request_data = [];

    protected array $_validation_rules = [];


    public function __construct()
    {
    }


    /**
     * allows you to simply echo or print an EE_SPCO_JSON_Response object to produce a  JSON encoded string
     *
     * @return string
     */
    public function __toString()
    {
        return json_encode($this->buildResponse());
    }


    /**
     * @return array
     */
    public function buildResponse(): array
    {
        $JSON_response = [];
        // grab notices
        $notices = EE_Error::get_notices(false);
        $this->set_attention($notices['attention'] ?? '');
        $this->set_errors($notices['errors'] ?? '');
        $this->set_success($notices['success'] ?? '');
        // add notices to JSON response, but only if they exist
        if ($this->attention()) {
            $JSON_response['attention'] = $this->attention();
        }
        if ($this->errors()) {
            $JSON_response['errors'] = $this->errors();
        }
        if ($this->unexpected_errors()) {
            $JSON_response['unexpected_errors'] = $this->unexpected_errors();
        }
        if ($this->success()) {
            $JSON_response['success'] = $this->success();
        }
        // but if NO notices are set... at least set the "success" as a key so that the JS knows everything worked
        if (! isset($JSON_response['attention']) && ! isset($JSON_response['errors']) && ! isset($JSON_response['success'])) {
            $JSON_response['success'] = null;
        }
        // set redirect_url, IF it exists
        if ($this->redirect_url()) {
            $JSON_response['redirect_url'] = $this->redirect_url();
        }
        // set registration_time_limit, IF it exists
        if ($this->registration_time_limit()) {
            $JSON_response['registration_time_limit'] = $this->registration_time_limit();
        }
        // set payment_amount, IF it exists
        if ($this->payment_amount() !== null) {
            $JSON_response['payment_amount'] = $this->payment_amount();
        }
        // grab generic return data
        $return_data = $this->return_data();
        // add billing form validation rules
        if ($this->validation_rules()) {
            $return_data['validation_rules'] = $this->validation_rules();
        }
        // set reg_step_html, IF it exists
        if ($this->reg_step_html()) {
            $return_data['reg_step_html'] = $this->reg_step_html();
        }
        // set method of payment, IF it exists
        if ($this->method_of_payment()) {
            $return_data['method_of_payment'] = $this->method_of_payment();
        }
        // set "plz_select_method_of_payment" message, IF it exists
        if ($this->plz_select_method_of_payment()) {
            $return_data['plz_select_method_of_payment'] = $this->plz_select_method_of_payment();
        }
        // set redirect_form, IF it exists
        if ($this->redirect_form()) {
            $return_data['redirect_form'] = $this->redirect_form();
        }
        // and finally, add return_data array to main JSON response array, IF it contains anything
        // why did we add some of the above properties to the return data array?
        // because it is easier and cleaner in the Javascript to deal with this way
        if (! empty($return_data)) {
            $JSON_response['return_data'] = $return_data;
        }
        // filter & return final array
        return apply_filters('FHEE__EE_SPCO_JSON_Response___toString__JSON_response', $JSON_response);
    }

    public function sendResponse()
    {
        wp_send_json($this->buildResponse());
    }


    public function set_attention(string $attention)
    {
        $this->_attention = $attention;
    }


    public function attention(): string
    {
        return $this->_attention;
    }


    public function set_errors(string $errors)
    {
        $this->_errors = $errors;
    }


    public function errors(): string
    {
        return $this->_errors;
    }


    public function unexpected_errors(): string
    {
        return $this->_unexpected_errors;
    }


    public function set_unexpected_errors(string $unexpected_errors)
    {
        $this->_unexpected_errors = $unexpected_errors;
    }


    public function set_success(string $success)
    {
        $this->_success = $success;
    }


    public function success(): string
    {
        return $this->_success;
    }


    public function set_method_of_payment(string $method_of_payment)
    {
        $this->_method_of_payment = $method_of_payment;
    }


    public function method_of_payment(): string
    {
        return $this->_method_of_payment;
    }


    public function payment_amount(): float
    {
        return $this->_payment_amount;
    }


    /**
     * @param float|int $payment_amount
     */
    public function set_payment_amount($payment_amount)
    {
        $this->_payment_amount = (float) $payment_amount;
    }


    public function set_reg_step_html(string $next_step_html)
    {
        $this->_reg_step_html = $next_step_html;
    }


    public function reg_step_html(): string
    {
        return $this->_reg_step_html;
    }


    public function set_redirect_form(string $redirect_form)
    {
        $this->_redirect_form = $redirect_form;
    }


    public function redirect_form()
    {
        return ! empty($this->_redirect_form) ? $this->_redirect_form : false;
    }


    public function set_plz_select_method_of_payment(string $plz_select_method_of_payment)
    {
        $this->_plz_select_method_of_payment = $plz_select_method_of_payment;
    }


    public function plz_select_method_of_payment(): string
    {
        return $this->_plz_select_method_of_payment;
    }


    public function set_redirect_url(string $redirect_url)
    {
        $this->_redirect_url = $redirect_url;
    }


    public function redirect_url(): string
    {
        return $this->_redirect_url;
    }


    public function registration_time_limit(): string
    {
        return $this->_registration_time_limit;
    }


    public function set_registration_time_limit(string $registration_time_limit)
    {
        $this->_registration_time_limit = $registration_time_limit;
    }


    public function set_return_data(array $return_data)
    {
        $this->_return_data = array_merge($this->_return_data, $return_data);
    }


    public function return_data(): array
    {
        return $this->_return_data;
    }


    public function add_validation_rules(array $validation_rules = [])
    {
        if (is_array($validation_rules) && ! empty($validation_rules)) {
            $this->_validation_rules = array_merge($this->_validation_rules, $validation_rules);
        }
    }


    public function validation_rules(): array
    {
        return ! empty($this->_validation_rules) ? $this->_validation_rules : [];
    }


    public function echoAndExit()
    {
        exit($this->__toString());
    }
}
