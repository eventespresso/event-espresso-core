<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\tools\extra_meta;

use EE_Error;
use EE_Payment_Method;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;
use Exception;
use ReflectionException;

/**
 * Class PayPalExtraMeta
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class PayPalExtraMeta
{
    /**
     * Payment method instance.
     *
     * @var EE_Payment_Method
     */
    public $pm;

    /**
     * Metadata key.
     *
     * @var EE_Payment_Method
     */
    public $metadata_key;


    /**
     * Class constructor.
     *
     * @param EE_Payment_Method $pm_instance
     */
    public function __construct(EE_Payment_Method $pm_instance)
    {
        $this->pm           = $pm_instance;
        $this->metadata_key = $pm_instance->debug_mode()
            ? Domain::META_KEY_PAYPAL_DATA_SANDBOX
            : Domain::META_KEY_PAYPAL_DATA;
    }


    /**
     * Save/update the provided data to the PM extra meta.
     *
     * @param array $data
     * @return bool
     * @throws EE_Error
     */
    public function saveBatch($data)
    {
        // Update the PM data.
        try {
            $paypal_data  = $this->pm->get_extra_meta($this->metadata_key, true, []);
            $data_to_save = array_replace_recursive($paypal_data, $data);
            $this->saveMetaData($data_to_save);
        } catch (Exception $e) {
            $err_msg = sprintf(
                esc_html__('Could not save merchant data. %1$s', 'event_espresso'),
                $e->getMessage()
            );
            PayPalLogger::errorLog($err_msg, $data, $this->pm);
            return false;
        }
        return true;
    }


    /**
     * Get PM extra meta by meta name/option.
     *
     * @param string $option_name
     * @return mixed
     * @throws EE_Error
     */
    public function getOption($option_name)
    {
        $meta_data = $this->getMetaData();
        return isset($meta_data[ $option_name ]) ? $meta_data[ $option_name ] : false;
    }


    /**
     * Get PM metadata.
     * Return the metadata array if all good. False otherwise.
     *
     * @return array|bool
     * @throws EE_Error
     */
    public function getMetaData()
    {
        try {
            return $this->pm->get_extra_meta($this->metadata_key, true, []);
        } catch (EE_Error $e) {
            $err_msg = sprintf(
                esc_html__('Error getting the PM meta data: %1$s', 'event_espresso'),
                $e->getMessage()
            );
            PayPalLogger::errorLog($err_msg, [], $this->pm);
            return false;
        } catch (ReflectionException $e) {
            $err_msg = sprintf(
                esc_html__('Error getting the PM meta data: %1$s', 'event_espresso'),
                $e->getMessage()
            );
            PayPalLogger::errorLog($err_msg, [], $this->pm);
            return false;
        }
    }


    /**
     * Save/update the provided option to the PM extra meta.
     *
     * @param string $name
     * @param        $value
     * @return bool
     * @throws EE_Error
     */
    public function saveOption($name, $value)
    {
        $meta_data = $this->getMetaData();
        if (! $meta_data) {
            $meta_data = [];
        }

        $meta_data[ $name ] = $value;
        return $this->saveMetaData($meta_data);
    }


    /**
     * Save/update the PM extra meta.
     *
     * @param array $data
     * @return bool
     */
    public function saveMetaData($data)
    {
        try {
            $this->pm->update_extra_meta($this->metadata_key, $data);
        } catch (Exception $e) {
            return false;
        }
        return true;
    }


    /**
     * Delete PM option.
     *
     * @param string $name
     * @return bool
     * @throws EE_Error
     */
    public function deleteOption($name)
    {
        $meta_data = $this->getMetaData();
        if (! $meta_data) {
            return false;
        }
        unset($meta_data[ $name ]);
        return $this->saveMetaData($meta_data);
    }


    /**
     * Delete the PM extra meta.
     *
     * @return bool
     */
    public function deleteMetaData()
    {
        try {
            // Live and sandbox data.
            $this->pm->delete_extra_meta(Domain::META_KEY_PAYPAL_DATA);
            $this->pm->delete_extra_meta(Domain::META_KEY_PAYPAL_DATA_SANDBOX);
        } catch (Exception $e) {
            return false;
        }
        return true;
    }
}
