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
    public EE_Payment_Method $pm;

    public string $metadata_key;


    /**
     * Class constructor.
     *
     * @param EE_Payment_Method $pm_instance
     * @throws EE_Error
     * @throws ReflectionException
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
     */
    public function saveBatch(array $data): bool
    {
        // Update the PM data.
        try {
            $paypal_data = $this->getMetaData();
            $this->saveMetaData(array_replace_recursive($paypal_data, $data));
        } catch (Exception $e) {
            PayPalLogger::errorLog(
                sprintf(
                    esc_html__('Could not save merchant data. %1$s', 'event_espresso'),
                    $e->getMessage()
                ),
                ['data' => $data, 'trace' => $e->getTrace()],
                $this->pm
            );
            return false;
        }
        return true;
    }


    /**
     * Get PM extra meta by meta name/option.
     *
     * @param string $option_name
     * @return mixed
     */
    public function getOption(string $option_name)
    {
        $meta_data = $this->getMetaData();
        return $meta_data[ $option_name ] ?? false;
    }


    /**
     * Get PM metadata.
     * Return the metadata array if all good. False otherwise.
     *
     * @return array
     */
    public function getMetaData(): array
    {
        try {
            return (array) $this->pm->get_extra_meta($this->metadata_key, true, []);
        } catch (EE_Error | ReflectionException $e) {
            PayPalLogger::errorLog(
                sprintf(
                    esc_html__('Error getting the PM meta data: %1$s', 'event_espresso'),
                    $e->getMessage()
                ),
                ['trace' => $e->getTrace()],
                $this->pm
            );
            return [];
        }
    }


    /**
     * Save/update the provided option to the PM extra meta.
     *
     * @param string $name
     * @param        $value
     * @return bool
     */
    public function saveOption(string $name, $value): bool
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
    public function saveMetaData(array $data): bool
    {
        try {
            $this->pm->update_extra_meta($this->metadata_key, $data);
        } catch (Exception $e) {
            PayPalLogger::errorLog(
                sprintf(
                    esc_html__('Error saving the PM meta data: %1$s', 'event_espresso'),
                    $e->getMessage()
                ),
                ['data' => $data, 'trace' => $e->getTrace()],
                $this->pm
            );
            return false;
        }
        return true;
    }


    /**
     * Delete PM option.
     *
     * @param string $name
     * @return bool
     */
    public function deleteOption(string $name): bool
    {
        $meta_data = $this->getMetaData();
        if (! $meta_data) {
            return false;
        }
        // If the option does not exist, don't bother saving, but return true anyways.
        if (! isset($meta_data[ $name ])) {
            return true;
        }
        unset($meta_data[ $name ]);
        return $this->saveMetaData($meta_data);
    }


    /**
     * Delete all the PM extra meta.
     *
     * @return bool
     */
    public function deleteAllMetaData(): bool
    {
        return $this->deleteMetaData(Domain::META_KEY_PAYPAL_DATA)
            && $this->deleteMetaData(Domain::META_KEY_PAYPAL_DATA_SANDBOX);
    }


    /**
     * Delete the PM extra meta.
     *
     * @param null $metadata_key
     * @return bool
     */
    public function deleteMetaData($metadata_key = null): bool
    {
        try {
            // Related to PM and sandbox mode metadata (default), or by the provided metadata key?
            $metadata_key = $metadata_key ?? $this->metadata_key;
            $this->pm->delete_extra_meta($metadata_key);
        } catch (Exception $e) {
            PayPalLogger::errorLog(
                sprintf(
                    esc_html__('Error deleting the PM meta data: %1$s', 'event_espresso'),
                    $e->getMessage()
                ),
                ['trace' => $e->getTrace()],
                $this->pm
            );
            return false;
        }
        return true;
    }
}
