<?php

use EventEspresso\core\domain\values\session\SessionLifespan;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\cache\CacheStorageInterface;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\session\SessionStartHandler;

if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Session_Mock
 *
 * For unit testing EE_Session
 *
 * @package            Event Espresso
 * @subpackage    core
 * @author                Brent Christensen
 * @since                4.7
 *
 */
class EE_Session_Mock extends EE_Session {

	/**
	 * @type EE_Session_Mock $_instance
	 */
	private static $_instance;

    /**
     * session data
     *
     * @var array
     */
    private $session_data = array();


    /**
     * @singleton method used to instantiate class object
     * @param CacheStorageInterface $cache_storage
     * @param SessionLifespan|null  $lifespan
     * @param RequestInterface|null $request
     * @param SessionStartHandler   $session_start_handler
     * @param EE_Encryption         $encryption
     * @return EE_Session_Mock
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
	public static function instance(
        CacheStorageInterface $cache_storage = null,
        SessionLifespan $lifespan = null,
        RequestInterface $request = null,
        SessionStartHandler $session_start_handler = null,
        EE_Encryption $encryption = null
    ) {
		// check if class object is instantiated
		// session loading is turned ON by default, but prior to the init hook, can be turned back OFF via:
		// add_filter( 'FHEE_load_EE_Session', '__return_false' );
		if ( ! EE_Session_Mock::$_instance instanceof EE_Session_Mock ) {
            EE_Session_Mock::$_instance = new self(
			    $cache_storage,
                $lifespan,
                $request,
                $session_start_handler,
                $encryption
            );
		}
		return EE_Session_Mock::$_instance;
	}


    /**
     * protected constructor to prevent direct creation
     *
     * @Constructor
     * @param CacheStorageInterface $cache_storage
     * @param SessionLifespan       $lifespan
     * @param RequestInterface      $request
     * @param SessionStartHandler   $session_start_handler
     * @param EE_Encryption         $encryption
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
	protected function __construct(
	    CacheStorageInterface $cache_storage,
        SessionLifespan $lifespan,
        RequestInterface $request,
        SessionStartHandler $session_start_handler,
        EE_Encryption $encryption = null
    ) {
		add_filter( 'FHEE_load_EE_Session', '__return_false' );
        parent::__construct(
            $cache_storage,
            $lifespan,
            $request,
            $session_start_handler,
            $encryption
        );
        $this->cache_storage = $cache_storage;
        $this->request = $request;
        $this->encryption = $encryption;
    }


	public function lifespan() {
		return  60 * MINUTE_IN_SECONDS;
	}



	/**
	 * @return EE_Encryption
	 */
	public function encryption() {
		return $this->encryption;
	}


    /**
     * @param null $key
     * @param bool $reset_cache
     * @return    array
     */
    public function get_session_data($key = null, $reset_cache = false)
    {
        if ($reset_cache) {
            $this->clear_session();
        }
        if (! empty($key)) {
            return isset($this->session_data[ $key ]) ? $this->session_data[ $key ] : null;
        }
        return $this->session_data;
    }


    /**
     * set session data
     *
     * @access    public
     * @param    array $data
     * @return    TRUE on success, FALSE on fail
     */
    public function set_session_data($data)
    {
        foreach ($data as $key => $value) {
            $this->session_data[ $key ] = $value;
        }
        return true;
    }


    public function clear_session($class = '', $function = '')
    {
        $this->session_data = array();
    }


    /**
     * @param \EE_Cart $cart
     * @return bool
     */
    public function set_cart(EE_Cart $cart)
    {
        $this->session_data['cart'] = $cart;
        return true;
    }


    /**
     * reset_cart
     */
    public function reset_cart()
    {
        $this->session_data['cart'] = null;
    }


    /**
     * @return \EE_Cart
     */
    public function cart()
    {
        return isset($this->session_data['cart']) && $this->session_data['cart'] instanceof EE_Cart
            ? $this->session_data['cart']
            : null;
    }


    /**
     * @param \EE_Checkout $checkout
     * @return bool
     */
    public function set_checkout(EE_Checkout $checkout)
    {
        $this->session_data['checkout'] = $checkout;
        return true;
    }


    /**
     * reset_checkout
     */
    public function reset_checkout()
    {
        $this->session_data['checkout'] = null;
    }


    /**
     * @return \EE_Checkout
     */
    public function checkout()
    {
        return isset($this->session_data['checkout']) && $this->session_data['checkout'] instanceof EE_Checkout
            ? $this->session_data['checkout']
            : null;
    }


    /**
     * @param \EE_Transaction $transaction
     * @return bool
     * @throws EE_Error
     */
    public function set_transaction(EE_Transaction $transaction)
    {
        // first remove the session from the transaction before we save the transaction in the session
        $transaction->set_txn_session_data(null);
        $this->session_data['transaction'] = $transaction;
        return true;
    }


    /**
     * reset_transaction
     */
    public function reset_transaction()
    {
        $this->session_data['transaction'] = null;
    }


    /**
     * @return \EE_Transaction
     */
    public function transaction()
    {
        return isset($this->session_data['transaction'])
               && $this->session_data['transaction'] instanceof EE_Transaction
            ? $this->session_data['transaction']
            : null;
    }
}
// End of file EE_Session_Mock.core.php
// Location: /tests/mocks/core/EE_Session_Mock.core.php
