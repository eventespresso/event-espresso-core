<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api;

/**
 * Class ResponseInspector
 *
 * Methods validating API responses.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class ResponseInspector
{
    /**
     * Default response state.
     *
     * @var bool
     */
    protected bool $valid = true;

    /**
     * An encountered error.
     *
     * @var array
     */
    protected array $error = [];


    /**
     * Returns the error if any.
     *
     * @return array
     */
    public function error(): array
    {
        return $this->error;
    }


    /**
     * Return the validation state.
     *
     * @return bool
     */
    public function isValid(): bool
    {
        return $this->valid;
    }


    /**
     * Set/save the error and mark the response as invalid
     *
     * @param array $error
     */
    private function setError(array $error)
    {
        $this->error = $error;
        $this->setInValid();
    }


    /**
     * This removes cleans the error list.
     *
     * @return void
     */
    public function clearErrors()
    {
        $this->error = [];
    }


    /**
     * This sets the validation state to invalid.
     *
     * @return void
     */
    private function setInValid()
    {
        $this->valid = false;
    }


    /**
     * @param $response
     * @return bool
     */
    public function validateResponse($response): bool
    {
        if (is_wp_error($response)) {
            $this->setError(
                [
                    'error'   => $response->get_error_code(),
                    'message' => sprintf(
                        esc_html__('Response error. Message: %1$s.', 'event_espresso'),
                        $response->get_error_message()
                    ),
                ]
            );
            return false;
        }
        // Do we have a response body ?
        if (! isset($response['body'])) {
            $this->setError(
                [
                    'error'   => 'no_body',
                    'message' => esc_html__('No response body provided.', 'event_espresso'),
                ]
            );
            return false;
        }
        return true;
    }


    /**
     * @param $response
     * @return bool
     */
    public function validateParameters($response): bool
    {
        // Validate that response body.
        if (! $response) {
            $this->setError([
                'error'   => 'invalid_body',
                'message' => esc_html__(
                    'Unable to read the response body. It\'s possible that it\'s empty.',
                    'event_espresso'
                ),
            ]);
            return false;
        }
        // Check the data for errors.
        if (isset($response['error'])) {
            $error_code    = $response['error'];
            $error_message = $response['error_description'];
            $this->setError(
                [
                    'error'   => $error_code,
                    'message' => $error_message,
                ]
            );
            return false;
        }
        return true;
    }
}
