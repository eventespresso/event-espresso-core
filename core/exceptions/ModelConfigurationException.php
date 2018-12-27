<?php

namespace EventEspresso\core\exceptions;

use DomainException;
use EEM_Base;
use Exception;

/**
 * Class ModelConfigurationException
 *
 * Exception thrown because an EE model was misconfigured (eg didn't have a property set, or it was improperly set).
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.74.p
 *
 */
class ModelConfigurationException extends DomainException
{
    /**
     * ModelConfigurationException constructor.
     *
     * @param EEM_Base $model
     * @param string $message Describe what's misconfigured about this model (don't bother mentioning which model,
     * that will be automatically added to the message based on the $model provided in the previous parameter).
     * @param int $code
     * @param Exception $previous
     */
    public function __construct(EEM_Base $model, $message, $code = 0, Exception $previous = null)
    {
        $message_part_1 = sprintf(
            /*
             * translators: 1: the model name
             */
            esc_html__('The model "%1$s" appears to be misconfigured.', 'event_espresso'),
            $model->get_this_model_name()
        );
        $message = $message_part_1 . ' ' . $message;
        parent::__construct($message, $code, $previous);
    }
}
// End of file ModelConfigurationException.php
// Location: EventEspresso\core\exceptions/ModelConfigurationException.php
