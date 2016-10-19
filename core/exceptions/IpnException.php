<?php
namespace EventEspresso\core\exceptions;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class IPNException
 * Exception for describing any problems relating to how an IPN was received.
 * These should generally be thrown by children of EE_Gateway children when an Instant Payment Notification
 * can't be handled because it somehow contains invalid data, or we are in an invalid state to handle it.
 * (Eg, duplicates IPNs, or when we're unable to verify the IPN is from the trusted source,
 *
 * @package       Event Espresso
 * @author        Michael Nelson
 * @since         $VID:$
 */
class IpnException extends \LogicException
{

    const DUPLICATE          = 1;

    const UNABLE_TO_VALIDATE = 2;

    const UNSUPPORTED        = 3;

    /**
     * @var \EE_Payment
     */
    protected $payment;

    /**
     * @var mixed IPN data, usually an array or object
     */
    protected $ipn_data;



    public function __construct(
        $message,
        $code = 0,
        \Exception $previous = null,
        \EE_Payment $payment = null,
        $ipn_data = array()
    ) {
        parent::__construct($message, $code, $previous);
        $this->payment = $payment;
        $this->ipn_data = $ipn_data;
    }



    /**
     * Gets the payment associated with this IPN, if known
     *
     * @return \EE_Payment
     */
    public function getPayment()
    {
        return $this->payment;
    }



    /**
     * Returns the payment's properties as an array (even if there is no payment, in which case it's an empty array)
     *
     * @return array
     * @throws \EE_Error
     */
    public function getPaymentProperties()
    {
        return $this->getPayment() instanceof \EE_Payment ? $this->getPayment()->model_field_array() : array();
    }



    /**
     * Returns an array, object, or string, however, the IPN data was received
     *
     * @return mixed
     */
    public function getIpnData()
    {
        return $this->ipn_data;
    }

}