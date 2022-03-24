<?php

namespace EventEspresso\core\domain\services\admin\ajax;

use EE_Error;
use EE_Transaction;
use EED_Thank_You_Page;
use EEM_Transaction;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class ThankYouPageIpnMonitor
 * Handles WordPress Heartbeat AJAX requests for the Thank You Page
 *
 * @package EventEspresso\core\domain\services\admin\ajax
 * @author  Brent Christensen
 * @since   4.9.76.p
 */
class ThankYouPageIpnMonitor
{
    /**
     * @var string $heartbeat
     */
    private $heartbeat;

    /**
     * @var EED_Thank_You_Page $thank_you_page
     */
    private $thank_you_page;

    /**
     * @var EE_Transaction $transaction
     */
    private $transaction;


    /**
     * EventEditorHeartbeat constructor.
     */
    public function __construct()
    {
        $this->heartbeat = WordpressHeartbeat::RESPONSE_KEY_THANK_YOU_PAGE;
        add_filter('heartbeat_received', array($this, 'heartbeatResponse'), 10, 3);
        add_filter('heartbeat_nopriv_received', array($this, 'heartbeatResponse'), 10, 3);
    }


    /**
     * thank_you_page_IPN_monitor
     * this basically just pulls the TXN based on the reg_url_link sent from the server,
     * then checks that the TXN status is not failed, and that no other errors have been generated.
     * it also calculates the IPN wait time since the Thank You page was first loaded
     *
     * @param array $response
     * @param array $data
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function heartbeatResponse($response = array(), $data = array())
    {
        // does this heartbeat contain our data ?
        if (! isset($data[ $this->heartbeat ])) {
            return $response;
        }
        // check for reg_url_link in the incoming heartbeat data
        if (! isset($data[ $this->heartbeat ]['e_reg_url_link'])) {
            $response[ $this->heartbeat ] = array(
                'errors' => ! empty($notices['errors'])
                    ? $notices['errors']
                    : esc_html__(
                        'No transaction information could be retrieved because the registration URL link is missing or invalid.',
                        'event_espresso'
                    ),
            );
            return $response;
        }
        // kk heartbeat has our data
        $response = $this->initializeThankYouPageAndTransaction($response, $data);
        // if something went wrong...
        if (isset($response[ $this->heartbeat ]['errors'])) {
            return $response;
        }
        // grab transient of Transaction's status
        $txn_status = isset($data[ $this->heartbeat ]['txn_status'])
            ? $data[ $this->heartbeat ]['txn_status']
            : null;
        $response = $this->getTransactionDetails($txn_status, $response, $data);
        // no payment data yet?
        if (isset($response[ $this->heartbeat ]['still_waiting'])) {
            return $response;
        }
        // TXN is happening so let's get the payments now
        // if we've already gotten payments then the heartbeat data will contain the timestamp of the last time we checked
        $since = isset($data[ $this->heartbeat ]['get_payments_since'])
            ? $data[ $this->heartbeat ]['get_payments_since']
            : 0;
        return $this->paymentDetails($response, $since);
    }


    /**
     * @param array $response
     * @param array $data
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function initializeThankYouPageAndTransaction($response, $data)
    {
        require_once EE_MODULES . 'thank_you_page/EED_Thank_You_Page.module.php';
        // set_definitions, instantiate the thank you page class, and get the ball rolling
        EED_Thank_You_Page::set_definitions();
        $this->thank_you_page = EED_Thank_You_Page::instance();
        $this->thank_you_page->set_reg_url_link($data[ $this->heartbeat ]['e_reg_url_link']);
        $this->thank_you_page->init();
        // get TXN
        $transaction = $this->thank_you_page->get_txn();
        // no TXN? then get out
        if (! $transaction instanceof EE_Transaction) {
            $notices = EE_Error::get_notices();
            $response[ $this->heartbeat ] = array(
                'errors' => ! empty($notices['errors'])
                    ? $notices['errors']
                    : sprintf(
                        esc_html__(
                            'The information for your transaction could not be retrieved from the server or the transaction data received was invalid because of a technical reason. (%s)',
                            'event_espresso'
                        ),
                        __LINE__
                    ),
            );
            return $response;
        }
        $this->transaction = $transaction;
        return $response;
    }


    /**
     * @param string $txn_status
     * @param array  $response
     * @param array  $data
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function getTransactionDetails($txn_status, $response, $data)
    {
        // has the TXN status changed since we last checked (or empty because this is the first time running through this code)?
        if ($txn_status !== $this->transaction->status_ID()) {
            // switch between two possible basic outcomes
            switch ($this->transaction->status_ID()) {
                // TXN has been updated in some way
                case EEM_Transaction::overpaid_status_code:
                case EEM_Transaction::complete_status_code:
                case EEM_Transaction::incomplete_status_code:
                    // send updated TXN results back to client,
                    return $this->setTransactionDetails($response);
                // or we have a bad TXN, or really slow IPN, so calculate the wait time and send that back...
                case EEM_Transaction::failed_status_code:
                default:
                    // keep on waiting...
                    return $this->updateServerWaitTime($data[ $this->heartbeat ]);
            }
            // or is the TXN still failed (never been updated) ???
        } elseif ($this->transaction->failed()) {
            // keep on waiting...
            return $this->updateServerWaitTime($data[ $this->heartbeat ]);
        }
        return $response;
    }


    /**
     * @param array $response
     * @param boolean $status_only
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function setTransactionDetails($response, $status_only = false)
    {
        if (! $status_only && ! isset($response[ $this->heartbeat ]['transaction_details'])) {
            $response[ $this->heartbeat ]['transaction_details'] = $this->thank_you_page->get_transaction_details();
        }
        if (! isset($response[ $this->heartbeat ]['txn_status'])) {
            $response[ $this->heartbeat ]['txn_status'] = $this->transaction->status_ID();
        }
        return $response;
    }


    /**
     * @param array $response
     * @param int $since
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function paymentDetails($response, $since)
    {
        // then check for payments
        $payments = $this->thank_you_page->get_txn_payments($since);
        // has a payment been processed ?
        if (! empty($payments) || $this->thank_you_page->isOfflinePaymentMethod()) {
            if ($since) {
                $response[ $this->heartbeat ]['new_payments'] = $this->thank_you_page->get_new_payments($payments);
                $response = $this->setTransactionDetails($response);
            } else {
                $response[ $this->heartbeat ]['payment_details'] = $this->thank_you_page->get_payment_details(
                    $payments
                );
            }
            // reset time to check for payments
            $response[ $this->heartbeat ]['get_payments_since'] = time();
        } else {
            $response[ $this->heartbeat ]['get_payments_since'] = $since;
        }
        return $response;
    }


    /**
     * @param array $thank_you_page_data    thank you page portion of the incoming JSON array
     *                                      from the WP heartbeat data
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function updateServerWaitTime($thank_you_page_data)
    {
        $response[ $this->heartbeat ]['still_waiting'] = isset($thank_you_page_data['initial_access'])
            ? time() - $thank_you_page_data['initial_access']
            : 0;
        $response = $this->setTransactionDetails($response, true);
        return $response;
    }
}
