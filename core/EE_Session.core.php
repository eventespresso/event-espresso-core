<?php

use EventEspresso\core\domain\services\database\DbStatus;
use EventEspresso\core\domain\services\session\SessionIdentifierInterface;
use EventEspresso\core\domain\values\session\SessionLifespan;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\InvalidSessionDataException;
use EventEspresso\core\services\cache\CacheStorageInterface;
use EventEspresso\core\services\encryption\Base64Encoder;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\session\SessionStartHandler;

/**
 * EE_Session class
 * Please note that the session doesn't save by default, except when it has a cart set on it.
 * In order for it to save on other pages, you must execute
 * `add_action('FHEE__EE_Session___save_session_to_db__abort_session_save', '__return_false');`
 * somewhere during the request
 *
 * @package    Event Espresso
 * @subpackage includes/classes
 * @author     Brent Christensen
 */
class EE_Session implements SessionIdentifierInterface
{
    const session_id_prefix    = 'ee_ssn_';

    const hash_check_prefix    = 'ee_shc_';

    const OPTION_NAME_SETTINGS = 'ee_session_settings';

    const STATUS_CLOSED        = 0;

    const STATUS_OPEN          = 1;

    const SAVE_STATE_CLEAN     = 'clean';

    const SAVE_STATE_DIRTY     = 'dirty';


    private static ?EE_Session $_instance = null;

    protected ?Base64Encoder $encryption = null;

    protected ?CacheStorageInterface $cache_storage = null;

    protected ?RequestInterface $request = null;

    protected ?SessionStartHandler $session_start_handler = null;

    /**
     * how long an EE session lasts
     * default session lifespan of 1 hour (for not so instant IPNs)
     *
     * @var SessionLifespan|null $session_lifespan
     */
    private ?SessionLifespan $session_lifespan = null;

    /**
     * the session id
     *
     * @var string
     */
    private string $_sid = '';

    /**
     * session id salt
     *
     * @var string
     */
    private string $_sid_salt = '';

    private array $_session_data = [];

    /**
     * session expiration time as Unix timestamp in GMT
     *
     * @var int
     */
    private int $_expiration = 0;

    /**
     * whether session has expired at some point
     *
     * @var boolean
     */
    private bool $_expired = false;

    /**
     * current time as Unix timestamp in GMT
     *
     * @var int|null
     */
    private ?int $_time = null;

    /**
     * whether to encrypt session data
     *
     * @var bool
     */
    private bool $_use_encryption = false;

    /**
     * well... according to the server...
     *
     * @var string
     */
    private string $_user_agent = '';


    /**
     * array for defining default session vars
     *
     * @var array
     */
    private array $_default_session_vars = [
        'id'            => null,
        'user_id'       => null,
        'ip_address'    => null,
        'user_agent'    => null,
        'init_access'   => null,
        'last_access'   => null,
        'expiration'    => null,
        'pages_visited' => [],
    ];

    /**
     * timestamp for when last garbage collection cycle was performed
     *
     * @var int $_last_gc
     */
    private int $_last_gc = 0;

    /**
     * whether session is active or not
     *
     * @var int $status
     */
    private int $status = EE_Session::STATUS_CLOSED;

    /**
     * whether session data has changed therefore requiring a session save
     *
     * @var string $save_state
     */
    private string $save_state = EE_Session::SAVE_STATE_CLEAN;


    /**
     * @singleton method used to instantiate class object
     * @param CacheStorageInterface|null $cache_storage
     * @param SessionLifespan|null       $lifespan
     * @param RequestInterface|null      $request
     * @param SessionStartHandler|null   $session_start_handler
     * @param Base64Encoder|null         $encryption
     * @return EE_Session|null
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function instance(
        CacheStorageInterface $cache_storage = null,
        SessionLifespan $lifespan = null,
        RequestInterface $request = null,
        SessionStartHandler $session_start_handler = null,
        Base64Encoder $encryption = null
    ): ?EE_Session {
        // check if class object is instantiated
        // session loading is turned ON by default, but prior to the init hook, can be turned back OFF via:
        // add_filter( 'FHEE_load_EE_Session', '__return_false' );
        if (
            ! self::$_instance instanceof EE_Session
            && $cache_storage instanceof CacheStorageInterface
            && $lifespan instanceof SessionLifespan
            && $request instanceof RequestInterface
            && $session_start_handler instanceof SessionStartHandler
            && apply_filters('FHEE_load_EE_Session', true)
        ) {
            self::$_instance = new self(
                $cache_storage,
                $lifespan,
                $request,
                $session_start_handler,
                $encryption
            );
        }
        return self::$_instance;
    }


    /**
     * protected constructor to prevent direct creation
     *
     * @param CacheStorageInterface $cache_storage
     * @param SessionLifespan       $lifespan
     * @param RequestInterface      $request
     * @param SessionStartHandler   $session_start_handler
     * @param Base64Encoder|null    $encryption
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function __construct(
        CacheStorageInterface $cache_storage,
        SessionLifespan $lifespan,
        RequestInterface $request,
        SessionStartHandler $session_start_handler,
        Base64Encoder $encryption = null
    ) {
        // session loading is turned ON by default,
        // but prior to the 'AHEE__EE_System__core_loaded_and_ready' hook
        // (which currently fires on the init hook at priority 9),
        // can be turned back OFF via: add_filter( 'FHEE_load_EE_Session', '__return_false' );
        if (! apply_filters('FHEE_load_EE_Session', true)) {
            return;
        }
        $this->session_start_handler = $session_start_handler;
        $this->session_lifespan      = $lifespan;
        $this->request               = $request;
        if (! defined('ESPRESSO_SESSION')) {
            define('ESPRESSO_SESSION', true);
        }
        // retrieve session options from db
        $session_settings = (array) get_option(EE_Session::OPTION_NAME_SETTINGS, []);
        if (! empty($session_settings)) {
            // cycle though existing session options
            foreach ($session_settings as $var_name => $session_setting) {
                // set values for class properties
                $var_name          = '_' . $var_name;
                $this->{$var_name} = $session_setting;
            }
        }
        $this->cache_storage = $cache_storage;
        // are we using encryption?
        $this->_use_encryption = $encryption instanceof Base64Encoder
                                 && EE_Registry::instance()->CFG->admin->encode_session_data();
        // encrypt data via: $this->encryption->encodeString();
        $this->encryption = $encryption;
        // filter hook allows outside functions/classes/plugins to change default empty cart
        $extra_default_session_vars  = apply_filters('FHEE__EE_Session__construct__extra_default_session_vars', []);
        $this->_default_session_vars = array_merge($this->_default_session_vars, $extra_default_session_vars);
        // apply default session vars
        $this->_set_defaults();
        add_action('AHEE__EE_System__initialize', [$this, 'open_session']);
        // check request for 'clear_session' param
        add_action('AHEE__EE_Request_Handler__construct__complete', [$this, 'wp_loaded']);
        // once everything is all said and done,
        add_action('shutdown', [$this, 'update'], 100);
        add_action('shutdown', [$this, 'garbageCollection'], 1000);
        $this->configure_garbage_collection_filters();
    }


    /**
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function isLoadedAndActive(): bool
    {
        return did_action('AHEE__EE_System__core_loaded_and_ready')
               && EE_Session::instance() instanceof EE_Session
               && EE_Session::instance()->isActive();
    }


    /**
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->status === EE_Session::STATUS_OPEN;
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidSessionDataException
     * @throws RuntimeException
     * @throws ReflectionException
     */
    public function open_session()
    {
        // Check for an existing session and retrieve it from the database, unless the system is in maintenance level 2.
        if (DbStatus::isOnline() && ! $this->_espresso_session()) {
            // or just start a new one
            $this->_create_espresso_session();
        }
    }


    /**
     * @return bool
     */
    public function expired(): bool
    {
        return $this->_expired;
    }


    /**
     * @return void
     */
    public function reset_expired()
    {
        $this->_expired = false;
    }


    /**
     * @return int
     */
    public function expiration(): int
    {
        return $this->_expiration;
    }


    /**
     * @return int
     */
    public function extension(): int
    {
        return apply_filters('FHEE__EE_Session__extend_expiration__seconds_added', 10 * MINUTE_IN_SECONDS);
    }


    /**
     * @param int $time number of seconds to add to session expiration
     */
    public function extend_expiration(int $time = 0)
    {
        $time              = $time
            ?: $this->extension();
        $this->_expiration += absint($time);
    }


    /**
     * @return int
     */
    public function lifespan(): int
    {
        return $this->session_lifespan->inSeconds();
    }


    /**
     * Marks whether the session data has been updated or not.
     * Valid options are:
     *      EE_Session::SAVE_STATE_CLEAN - session data remains unchanged and updating is not necessary
     *      EE_Session::SAVE_STATE_DIRTY - session data has changed since last save and needs to be updated
     * default value is EE_Session::SAVE_STATE_DIRTY
     *
     * @param string $save_state
     */
    public function setSaveState(string $save_state = EE_Session::SAVE_STATE_DIRTY)
    {
        $valid_save_states = [
            EE_Session::SAVE_STATE_CLEAN,
            EE_Session::SAVE_STATE_DIRTY,
        ];
        if (! in_array($save_state, $valid_save_states, true)) {
            $save_state = EE_Session::SAVE_STATE_DIRTY;
        }
        $this->save_state = $save_state;
    }


    /**
     * This just sets some defaults for the _session data property
     *
     * @return void
     */
    private function _set_defaults()
    {
        // set some defaults
        foreach ($this->_default_session_vars as $key => $default_var) {
            if (is_array($default_var)) {
                $this->_session_data[ $key ] = [];
            } else {
                $this->_session_data[ $key ] = '';
            }
        }
    }


    /**
     * @retrieve  session data
     * @return    string
     */
    public function id(): string
    {
        return $this->_sid;
    }


    /**
     * @param EE_Cart $cart
     * @return bool
     */
    public function set_cart(EE_Cart $cart): bool
    {
        $this->_session_data['cart'] = $cart;
        $this->setSaveState();
        return true;
    }


    /**
     * reset_cart
     */
    public function reset_cart()
    {
        do_action('AHEE__EE_Session__reset_cart__before_reset', $this);
        $this->_session_data['cart'] = null;
        $this->setSaveState();
    }


    /**
     * @return EE_Cart
     */
    public function cart(): ?EE_Cart
    {
        return isset($this->_session_data['cart']) && $this->_session_data['cart'] instanceof EE_Cart
            ? $this->_session_data['cart']
            : null;
    }


    /**
     * @param EE_Checkout $checkout
     * @return bool
     */
    public function set_checkout(EE_Checkout $checkout): bool
    {
        $this->_session_data['checkout'] = $checkout;
        $this->setSaveState();
        return true;
    }


    /**
     * reset_checkout
     */
    public function reset_checkout()
    {
        do_action('AHEE__EE_Session__reset_checkout__before_reset', $this);
        $this->_session_data['checkout'] = null;
        $this->setSaveState();
    }


    /**
     * @return EE_Checkout
     */
    public function checkout(): ?EE_Checkout
    {
        return isset($this->_session_data['checkout']) && $this->_session_data['checkout'] instanceof EE_Checkout
            ? $this->_session_data['checkout']
            : null;
    }


    /**
     * @param EE_Transaction $transaction
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_transaction(EE_Transaction $transaction): bool
    {
        // first remove the session from the transaction before we save the transaction in the session
        $transaction->set_txn_session_data(null);
        $this->_session_data['transaction'] = $transaction;
        $this->setSaveState();
        return true;
    }


    /**
     * reset_transaction
     */
    public function reset_transaction()
    {
        do_action('AHEE__EE_Session__reset_transaction__before_reset', $this);
        $this->_session_data['transaction'] = null;
        $this->setSaveState();
    }


    /**
     * @return EE_Transaction
     */
    public function transaction(): ?EE_Transaction
    {
        return isset($this->_session_data['transaction'])
               && $this->_session_data['transaction'] instanceof EE_Transaction
            ? $this->_session_data['transaction']
            : null;
    }


    /**
     * retrieve session data
     *
     * @param string|null $key
     * @param bool        $reset_cache
     * @return array|EE_Cart|EE_Checkout|EE_Transaction
     */
    public function get_session_data(?string $key = null, bool $reset_cache = false)
    {
        if ($reset_cache) {
            $this->reset_cart();
            $this->reset_checkout();
            $this->reset_transaction();
        }
        if (! empty($key)) {
            return $this->_session_data[ $key ] ?? null;
        }
        return $this->_session_data;
    }


    /**
     * Returns TRUE on success, FALSE on fail
     *
     * @param array $data
     * @return bool
     */
    public function set_session_data(array $data): bool
    {
        // nothing ??? bad data ??? go home!
        if (empty($data)) {
            EE_Error::add_error(
                esc_html__(
                    'No session data or invalid session data was provided.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        foreach ($data as $key => $value) {
            if (isset($this->_default_session_vars[ $key ])) {
                EE_Error::add_error(
                    sprintf(
                        esc_html__(
                            'Sorry! %s is a default session datum and can not be reset.',
                            'event_espresso'
                        ),
                        $key
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                return false;
            }
            $this->_session_data[ $key ] = $value;
            $this->setSaveState();
        }
        return true;
    }


    /**
     * @initiate session
     * @return bool TRUE on success, FALSE on fail
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidSessionDataException
     * @throws RuntimeException
     * @throws ReflectionException
     */
    private function _espresso_session(): bool
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $this->session_start_handler->startSession();
        $this->status = EE_Session::STATUS_OPEN;
        // get our modified session ID
        $this->_sid = $this->_generate_session_id();
        // set the "user agent"
        $this->_user_agent = $this->request->userAgent();
        // now let's retrieve what's in the db
        $session_data = $this->_retrieve_session_data();
        if (empty($session_data)) {
            // set initial site access time and the session expiration
            $this->_set_init_access_and_expiration();
            // set referer
            $this->_session_data['pages_visited'][ $this->_session_data['init_access'] ] = esc_attr(
                $this->request->getServerParam('HTTP_REFERER')
            );
            // no previous session = go back and create one (on top of the data above)
            return false;
        }
        // get the current time in UTC
        $this->_time = $this->_time !== null
            ? $this->_time
            : time();
        // and reset the session expiration
        $this->_expiration = $session_data['expiration'] ?? $this->_time + $this->session_lifespan->inSeconds();
        // now the user agent
        if ($session_data['user_agent'] !== $this->_user_agent) {
            return false;
        }
        // wait a minute... how old are you?
        if ($this->_time > $this->_expiration) {
            // yer too old fer me!
            $this->_expired = true;
            // wipe out everything that isn't a default session datum
            $this->clear_session(__CLASS__, __FUNCTION__);
        }
        // make event espresso session data available to plugin
        $this->_session_data = array_merge($this->_session_data, $session_data);
        return true;
    }

    private function sessionKey(string $prefix = ''): string
    {
        return $prefix . EE_Session::session_id_prefix . $this->_sid;
    }

    private function hashCheckKey(): string
    {
        return EE_Session::hash_check_prefix . $this->_sid;
    }


    /**
     * _get_session_data
     * Retrieves the session data, and attempts to correct any encoding issues that can occur due to improperly setup
     * databases
     *
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidSessionDataException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RuntimeException
     * @throws ReflectionException
     */
    protected function _retrieve_session_data(): array
    {
        try {
            // we're using WP's Transient API to store session data using the PHP session ID as the option name
            $session_data = $this->cache_storage->get($this->sessionKey(), false);
            if (empty($session_data)) {
                return [];
            }
            if (apply_filters('FHEE__EE_Session___perform_session_id_hash_check', WP_DEBUG)) {
                $hash_check = $this->cache_storage->get($this->hashCheckKey(), false);
                if ($hash_check && $hash_check !== md5($session_data)) {
                    EE_Error::add_error(
                        sprintf(
                            esc_html__(
                                'The stored data for session %1$s failed to pass a hash check and therefore appears to be invalid.',
                                'event_espresso'
                            ),
                            $this->sessionKey()
                        ),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
            }
        } catch (Exception $e) {
            // let's just eat that error for now and attempt to correct any corrupted data
            global $wpdb;
            $row          = $wpdb->get_row(
                $wpdb->prepare(
                    "SELECT option_value FROM $wpdb->options WHERE option_name = %s LIMIT 1",
                    $this->sessionKey('_transient_')
                )
            );
            $session_data = is_object($row) ? $row->option_value : null;
            if ($session_data) {
                $session_data = preg_replace_callback(
                    '!s:(d+):"(.*?)";!',
                    function ($match) {
                        return $match[1] === strlen($match[2])
                            ? $match[0]
                            : 's:' . strlen($match[2]) . ':"' . $match[2] . '";';
                    },
                    $session_data
                );
            }
            $session_data = maybe_unserialize($session_data);
        }
        // in case the data is encoded... try to decode it
        $session_data = $this->_use_encryption
            ? $this->encryption->decodeString($session_data)
            : $session_data;
        if (! is_array($session_data)) {
            try {
                $session_data = maybe_unserialize($session_data);
            } catch (Exception $e) {
                $msg = esc_html__(
                    'An error occurred while attempting to unserialize the session data.',
                    'event_espresso'
                );
                $msg .= WP_DEBUG
                    ? '<br><pre>'
                      . print_r($session_data, true)
                      . '</pre><br>'
                      . $this->find_serialize_error($session_data)
                    : '';
                $this->cache_storage->delete($this->sessionKey());
                throw new InvalidSessionDataException($msg, 0, $e);
            }
        }
        // just a check to make sure the session array is indeed an array
        if (! is_array($session_data)) {
            // no?!?! then something is wrong
            $msg = esc_html__(
                'The session data is missing, invalid, or corrupted.',
                'event_espresso'
            );
            $msg .= WP_DEBUG
                ? '<br><pre>' . print_r($session_data, true) . '</pre><br>' . $this->find_serialize_error($session_data)
                : '';
            $this->cache_storage->delete($this->sessionKey());
            throw new InvalidSessionDataException($msg);
        }
        if (isset($session_data['transaction']) && absint($session_data['transaction']) !== 0) {
            $session_data['transaction'] = EEM_Transaction::instance()->get_one_by_ID(
                $session_data['transaction']
            );
        }
        return $session_data;
    }


    /**
     * _generate_session_id
     * Retrieves the PHP session id either directly from the PHP session,
     * or from the request array if it was passed in from an AJAX request.
     * The session id is then salted and hashed (mmm sounds tasty)
     * so that it can be safely used as a request param
     *
     * @return string
     */
    protected function _generate_session_id(): string
    {
        // check if the SID was passed explicitly, otherwise get from session, then add salt and hash it to reduce length
        $session_id = $this->request->requestParamIsSet('EESID')
            ? $this->request->getRequestParam('EESID')
            : md5(session_id() . get_current_blog_id() . $this->_get_sid_salt());
        return apply_filters('FHEE__EE_Session___generate_session_id__session_id', $session_id);
    }


    /**
     * _get_sid_salt
     *
     * @return string
     */
    protected function _get_sid_salt(): string
    {
        // was session id salt already saved to db ?
        if (empty($this->_sid_salt)) {
            // no?  then maybe use WP defined constant
            if (defined('AUTH_SALT')) {
                $this->_sid_salt = AUTH_SALT;
            }
            // if salt doesn't exist or is too short
            if (strlen($this->_sid_salt) < 32) {
                // create a new one
                $this->_sid_salt = wp_generate_password(64);
            }
            // and save it as a permanent session setting
            $this->updateSessionSettings(['sid_salt' => $this->_sid_salt]);
        }
        return $this->_sid_salt;
    }


    /**
     * _set_init_access_and_expiration
     *
     * @return void
     */
    protected function _set_init_access_and_expiration()
    {
        $this->_time       = time();
        $this->_expiration = $this->_time + $this->session_lifespan->inSeconds();
        // set initial site access time
        $this->_session_data['init_access'] = $this->_time;
        // and the session expiration
        $this->_session_data['expiration'] = $this->_expiration;
    }


    /**
     * @update session data  prior to saving to the db
     * @param bool $new_session
     * @return bool TRUE on success, FALSE on fail
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function update(bool $new_session = false): bool
    {
        $this->_session_data = isset($this->_session_data['id']) ? $this->_session_data : [];
        if (empty($this->_session_data)) {
            $this->_set_defaults();
        }
        $session_data = [];
        foreach ($this->_session_data as $key => $value) {
            switch ($key) {
                case 'id':
                    // session ID
                    $session_data['id'] = $this->_sid;
                    break;
                case 'ip_address':
                    // visitor ip address
                    $session_data['ip_address'] = $this->request->ipAddress();
                    break;
                case 'user_agent':
                    // visitor user_agent
                    $session_data['user_agent'] = $this->_user_agent;
                    break;
                case 'init_access':
                    $session_data['init_access'] = absint($value);
                    break;
                case 'last_access':
                    // current access time
                    $session_data['last_access'] = $this->_time;
                    break;
                case 'expiration':
                    // when the session expires
                    $session_data['expiration'] = ! empty($this->_expiration)
                        ? $this->_expiration
                        : $session_data['init_access'] + $this->session_lifespan->inSeconds();
                    break;
                case 'user_id':
                    // current user if logged in
                    $session_data['user_id'] = $this->_wp_user_id();
                    break;
                case 'pages_visited':
                    $page_visit = $this->_get_page_visit();
                    if ($page_visit) {
                        // set pages visited where the first will be the http referrer
                        $this->_session_data['pages_visited'][ $this->_time ] = $page_visit;
                        // we'll only save the last 10 page visits.
                        $session_data['pages_visited'] = array_slice($this->_session_data['pages_visited'], -10);
                    }
                    break;
                default:
                    // carry any other data over
                    $session_data[ $key ] = $this->_session_data[ $key ];
            }
        }
        $this->_session_data = $session_data;
        // creating a new session does not require saving to the db just yet
        if (! $new_session) {
            // ready? let's save
            if ($this->_save_session_to_db()) {
                return true;
            }
            return false;
        }
        // meh, why not?
        return true;
    }


    /**
     * @create session data array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function _create_espresso_session()
    {
        do_action('AHEE_log', __CLASS__, __FUNCTION__, '');
        // use the update function for now with $new_session arg set to TRUE
        $this->update(true);
    }


    /**
     * Detects if there is anything worth saving in the session (eg the cart is a good one, notices are pretty good
     * too). This is used when determining if we want to save the session or not.
     *
     * @return bool
     * @since 4.9.67.p
     */
    private function sessionHasStuffWorthSaving(): bool
    {
        if ($this->save_state === EE_Session::SAVE_STATE_DIRTY) {
            return true;
        }
        $default_session_vars = array_keys($this->_default_session_vars);
        foreach ($this->_session_data as $key => $sessionDatum) {
            if (in_array($key, $default_session_vars, true)) {
                continue;
            }
            if (! empty($sessionDatum)) {
                return true;
            }
            if (
                $key === 'ee_notices'
                && (
                    ! empty($this->_session_data['ee_notices']['attention'])
                    || ! empty($this->_session_data['ee_notices']['errors'])
                    || ! empty($this->_session_data['ee_notices']['success'])
                )
            ) {
                return true;
            }
        }
        return false;
    }


    /**
     * _save_session_to_db
     *
     * @param bool $clear_session
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function _save_session_to_db(bool $clear_session = false): bool
    {
        // don't save sessions for crawlers
        // and unless we're deleting the session data, don't save anything if there isn't a cart
        if (
            $this->request->isBot()
            || (
                ! $clear_session
                && ! $this->sessionHasStuffWorthSaving()
                && apply_filters('FHEE__EE_Session___save_session_to_db__abort_session_save', true)
            )
        ) {
            return false;
        }
        $transaction = $this->transaction();
        if ($transaction instanceof EE_Transaction) {
            if (! $transaction->ID()) {
                $transaction->save();
            }
            $this->_session_data['transaction'] = $transaction->ID();
        }
        // then serialize all of our session data
        $session_data = serialize($this->_session_data);
        // do we need to also encode it to avoid corrupted data when saved to the db?
        $session_data = $this->_use_encryption
            ? $this->encryption->encodeString($session_data)
            : $session_data;
        // maybe save hash check
        if (apply_filters('FHEE__EE_Session___perform_session_id_hash_check', WP_DEBUG)) {
            $this->cache_storage->add(
                $this->hashCheckKey(),
                md5($session_data),
                $this->session_lifespan->inSeconds()
            );
        }
        // we're using the Transient API for storing session data,
        $saved = $this->cache_storage->add(
            $this->sessionKey(),
            $session_data,
            $this->session_lifespan->inSeconds()
        );
        $this->setSaveState(EE_Session::SAVE_STATE_CLEAN);
        return $saved;
    }


    /**
     * @get    the full page request the visitor is accessing
     * @return string
     */
    public function _get_page_visit(): string
    {
        $page_visit = home_url('/') . 'wp-admin/admin-ajax.php';
        // check for request url
        if ($this->request->serverParamIsSet('REQUEST_URI')) {
            $page_id     = '?';
            $e_reg       = '';
            $request_uri = $this->request->getServerParam('REQUEST_URI');
            $ru_bits     = explode('?', $request_uri);
            $request_uri = $ru_bits[0];
            $http_host   = $this->request->getServerParam('HTTP_HOST');
            // check for page_id in SERVER REQUEST
            if ($this->request->requestParamIsSet('page_id')) {
                // rebuild $e_reg without any of the extra parameters
                $page_id .= 'page_id=' . $this->request->getRequestParam('page_id', 0, 'int') . '&amp;';
            }
            // check for $e_reg in SERVER REQUEST
            if ($this->request->requestParamIsSet('ee')) {
                // rebuild $e_reg without any of the extra parameters
                $e_reg = 'ee=' . $this->request->getRequestParam('ee');
            }
            $page_visit = esc_url(rtrim($http_host . $request_uri . $page_id . $e_reg, '?'));
        }
        return $page_visit !== home_url('/wp-admin/admin-ajax.php')
            ? $page_visit
            : '';
    }


    /**
     * @the    current wp user id
     * @return int
     */
    public function _wp_user_id(): int
    {
        // if I need to explain the following lines of code, then you shouldn't be looking at this!
        return get_current_user_id();
    }


    /**
     * Clear EE_Session data
     *
     * @param string $class
     * @param string $function
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function clear_session(string $class = '', string $function = '')
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, 'session cleared by : ' . $class . '::' . $function . '()');
        $this->reset_cart();
        $this->reset_checkout();
        $this->reset_transaction();
        // wipe out everything that isn't a default session datum
        $this->reset_data(array_keys($this->_session_data));
        // reset initial site access time and the session expiration
        $this->_set_init_access_and_expiration();
        $this->setSaveState();
        $this->_save_session_to_db(true);
    }


    /**
     * resets all non-default session vars. Returns TRUE on success, FALSE on fail
     *
     * @param array|mixed $keys_to_reset
     * @param bool        $show_all_notices
     * @return bool
     */
    public function reset_data($keys_to_reset = [], bool $show_all_notices = false): bool
    {
        $keys_to_reset = (array) apply_filters(
            'FHEE__EE_Session__reset_data__session_data_keys_to_reset',
            (array) $keys_to_reset
        );
        // nothing ??? go home!
        if (empty($keys_to_reset)) {
            EE_Error::add_error(
                esc_html__(
                    'No session data could be reset, because no session var name was provided.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        $return_value = true;
        // since $keys_to_reset is an array, cycle through the values
        foreach ($keys_to_reset as $key_to_reset) {
            // first check to make sure it is a valid session var
            if (! isset($this->_session_data[ $key_to_reset ]) && $show_all_notices) {
                // oops! that session var does not exist!
                EE_Error::add_error(
                    sprintf(
                        esc_html__(
                            'The session item provided, %s, is invalid or does not exist.',
                            'event_espresso'
                        ),
                        $key_to_reset
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                $return_value = false;
                continue;
            }
            // then check to make sure it is not a default var
            if (array_key_exists($key_to_reset, $this->_default_session_vars)) {
                // yeeeeeeeeerrrrrrrrrrr OUT !!!!
                if ($show_all_notices) {
                    EE_Error::add_error(
                        sprintf(
                            esc_html__(
                                'Sorry! %s is a default session datum and can not be reset.',
                                'event_espresso'
                            ),
                            $key_to_reset
                        ),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
                $return_value = false;
                continue;
            }
            // remove session var
            unset($this->_session_data[ $key_to_reset ]);
            $this->setSaveState();
            if ($show_all_notices) {
                EE_Error::add_success(
                    sprintf(
                        esc_html__('The session variable %s was removed.', 'event_espresso'),
                        $key_to_reset
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        } // end of foreach
        return $return_value;
    }


    /**
     *   wp_loaded
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function wp_loaded()
    {
        if ($this->request->requestParamIsSet('clear_session')) {
            $this->clear_session(__CLASS__, __FUNCTION__);
        }
    }


    /**
     * Used to reset the entire object (for tests).
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since 4.3.0
     */
    public function reset_instance()
    {
        $this->clear_session();
        self::$_instance = null;
    }


    public function configure_garbage_collection_filters()
    {
        // run old filter we had for controlling session cleanup
        $expired_session_transient_delete_query_limit = absint(
            apply_filters(
                'FHEE__EE_Session__garbage_collection___expired_session_transient_delete_query_limit',
                50
            )
        );
        // is there a value? or one that is different from the default 50 records?
        if ($expired_session_transient_delete_query_limit === 0) {
            // hook into TransientCacheStorage in case Session cleanup was turned off
            add_filter('FHEE__TransientCacheStorage__transient_cleanup_schedule', '__return_zero');
        } elseif ($expired_session_transient_delete_query_limit !== 50) {
            // or use that for the new transient cleanup query limit
            add_filter(
                'FHEE__TransientCacheStorage__clearExpiredTransients__limit',
                function () use ($expired_session_transient_delete_query_limit) {
                    return $expired_session_transient_delete_query_limit;
                }
            );
        }
    }


    /**
     * @see http://stackoverflow.com/questions/10152904/unserialize-function-unserialize-error-at-offset/21389439#10152996
     * @param string $data1
     * @return string
     */
    private function find_serialize_error(string $data1): string
    {
        $error = '<pre>';
        $data2 = preg_replace_callback(
            '!s:(\d+):"(.*?)";!',
            function ($match) {
                return ($match[1] === strlen($match[2]))
                    ? $match[0]
                    : 's:'
                      . strlen($match[2])
                      . ':"'
                      . $match[2]
                      . '";';
            },
            $data1
        );
        $max   = (strlen($data1) > strlen($data2))
            ? strlen($data1)
            : strlen($data2);
        $error .= $data1 . PHP_EOL;
        $error .= $data2 . PHP_EOL;
        for ($i = 0; $i < $max; $i++) {
            if (@$data1[ $i ] !== @$data2[ $i ]) {
                $error  .= 'Difference ' . @$data1[ $i ] . ' != ' . @$data2[ $i ] . PHP_EOL;
                $error  .= "\t-> ORD number " . ord(@$data1[ $i ]) . ' != ' . ord(@$data2[ $i ]) . PHP_EOL;
                $error  .= "\t-> Line Number = $i" . PHP_EOL;
                $start  = ($i - 20);
                $start  = ($start < 0)
                    ? 0
                    : $start;
                $length = 40;
                $point  = $max - $i;
                if ($point < 20) {
                    $rlength = 1;
                    $rpoint  = -$point;
                } else {
                    $rpoint  = $length - 20;
                    $rlength = 1;
                }
                $error .= "\t-> Section Data1  = ";
                $error .= substr_replace(
                    substr($data1, $start, $length),
                    "<b style=\"color:green\">$i</b>",
                    $rpoint,
                    $rlength
                );
                $error .= PHP_EOL;
                $error .= "\t-> Section Data2  = ";
                $error .= substr_replace(
                    substr($data2, $start, $length),
                    "<b style=\"color:red\">$i</b>",
                    $rpoint,
                    $rlength
                );
                $error .= PHP_EOL;
            }
        }
        $error .= '</pre>';
        return $error;
    }


    /**
     * Saves an  array of settings used for configuring aspects of session behaviour
     *
     * @param array $updated_settings
     */
    private function updateSessionSettings(array $updated_settings = [])
    {
        // add existing settings, but only if not included in incoming $updated_settings array
        $updated_settings += get_option(EE_Session::OPTION_NAME_SETTINGS, []);
        update_option(EE_Session::OPTION_NAME_SETTINGS, $updated_settings);
    }


    /**
     * garbage_collection
     */
    public function garbageCollection()
    {
        // only perform during regular requests if last garbage collection was over an hour ago
        if (! (defined('DOING_AJAX') && DOING_AJAX) && (time() - HOUR_IN_SECONDS) >= $this->_last_gc) {
            $this->_last_gc = time();
            $this->updateSessionSettings(['last_gc' => $this->_last_gc]);
            /** @type WPDB $wpdb */
            global $wpdb;
            // filter the query limit. Set to 0 to turn off garbage collection
            $expired_session_transient_delete_query_limit = absint(
                apply_filters(
                    'FHEE__EE_Session__garbage_collection___expired_session_transient_delete_query_limit',
                    50
                )
            );
            // non-zero LIMIT means take out the trash
            if ($expired_session_transient_delete_query_limit) {
                $session_key    = str_replace('_', '\_', EE_Session::session_id_prefix);
                $hash_check_key = str_replace('_', '\_', EE_Session::hash_check_prefix);
                // since transient expiration timestamps are set in the future, we can compare against NOW,
                // but we only want to pick up any trash that's been around for more than a day
                $expiration = time() - DAY_IN_SECONDS;
                $SQL        = "
                    SELECT option_name
                    FROM $wpdb->options
                    WHERE
                      ( option_name LIKE '\_transient\_timeout\_$session_key%'
                      OR option_name LIKE '\_transient\_timeout\_$hash_check_key%' )
                    AND option_value < $expiration
                    LIMIT $expired_session_transient_delete_query_limit
                ";
                // produces something like:
                // SELECT option_name FROM wp_options
                // WHERE ( option_name LIKE '\_transient\_timeout\_ee\_ssn\_%'
                // OR option_name LIKE '\_transient\_timeout\_ee\_shc\_%' )
                // AND option_value < 1508368198 LIMIT 50
                $expired_sessions = $wpdb->get_col($SQL);
                // valid results?
                if (! empty($expired_sessions)) {
                    $this->cache_storage->deleteMany($expired_sessions, true);
                }
            }
        }
    }
}
