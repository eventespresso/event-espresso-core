<?php

use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * Payment Method Model
 * For storing all payment methods (things that interact between EE and gateways).
 * As of 4.3, payment methods are NOT singletons so there can be multiple instances of payment methods
 * of the same type, with different details. Eg, multiple paypal standard gateways so different
 * events can have their proceeds going to different paypal accounts
 *
 * @package    Event Espresso
 * @subpackage includes/models/EEM_Checkin.model.php
 * @author     Mike Nelson
 */
class EEM_Payment_Method extends EEM_Base
{

    const scope_cart = 'CART';

    const scope_admin = 'ADMIN';

    const scope_api = 'API';

    /**
     * @type EEM_Payment_Method
     */
    protected static $_instance = null;


    /**
     * private constructor to prevent direct creation
     *
     * @param null $timezone
     * @throws EE_Error
     */
    protected function __construct($timezone = null)
    {
        $this->singular_item = esc_html__('Payment Method', 'event_espresso');
        $this->plural_item = esc_html__('Payment Methods', 'event_espresso');
        $this->_tables = [
            'Payment_Method' => new EE_Primary_Table('esp_payment_method', 'PMD_ID'),
        ];
        $this->_fields = [
            'Payment_Method' => [
                'PMD_ID'              => new EE_Primary_Key_Int_Field(
                    'PMD_ID',
                    esc_html__('ID', 'event_espresso')
                ),
                'PMD_type'            => new EE_Plain_Text_Field(
                    'PMD_type',
                    esc_html__('Payment Method Type', 'event_espresso'),
                    false,
                    'Admin_Only'
                ),
                'PMD_name'            => new EE_Plain_Text_Field(
                    'PMD_name',
                    esc_html__('Name', 'event_espresso'),
                    false
                ),
                'PMD_desc'            => new EE_Post_Content_Field(
                    'PMD_desc',
                    esc_html__('Description', 'event_espresso'),
                    false,
                    ''
                ),
                'PMD_admin_name'      => new EE_Plain_Text_Field(
                    'PMD_admin_name',
                    esc_html__('Admin-Only Name', 'event_espresso'),
                    true
                ),
                'PMD_admin_desc'      => new EE_Post_Content_Field(
                    'PMD_admin_desc',
                    esc_html__('Admin-Only Description', 'event_espresso'),
                    true
                ),
                'PMD_slug'            => new EE_Slug_Field(
                    'PMD_slug',
                    esc_html__('Slug', 'event_espresso'),
                    false
                ),
                'PMD_order'           => new EE_Integer_Field(
                    'PMD_order',
                    esc_html__('Order', 'event_espresso'),
                    false,
                    0
                ),
                'PMD_debug_mode'      => new EE_Boolean_Field(
                    'PMD_debug_mode',
                    esc_html__('Debug Mode On?', 'event_espresso'),
                    false,
                    false
                ),
                'PMD_wp_user'         => new EE_WP_User_Field(
                    'PMD_wp_user',
                    esc_html__('Payment Method Creator ID', 'event_espresso'),
                    false
                ),
                'PMD_open_by_default' => new EE_Boolean_Field(
                    'PMD_open_by_default',
                    esc_html__('Open by Default?', 'event_espresso'),
                    false,
                    false
                ),
                'PMD_button_url'      => new EE_Plain_Text_Field(
                    'PMD_button_url',
                    esc_html__('Button URL', 'event_espresso'),
                    true,
                    ''
                ),
                'PMD_scope'           => new EE_Serialized_Text_Field(
                    'PMD_scope',
                    esc_html__('Usable From?', 'event_espresso'),
                    false,
                    []// possible values currently are 'CART','ADMIN','API'
                ),
            ],
        ];
        $this->_model_relations = [
            'Payment'     => new EE_Has_Many_Relation(),
            'Currency'    => new EE_HABTM_Relation('Currency_Payment_Method'),
            'Transaction' => new EE_Has_Many_Relation(),
            'WP_User'     => new EE_Belongs_To_Relation(),
        ];
        parent::__construct($timezone);
    }


    /**
     * Gets one by the slug provided
     *
     * @param string $slug
     * @return EE_Base_Class|EE_Payment_Method|EE_Soft_Delete_Base_Class|NULL
     * @throws EE_Error
     */
    public function get_one_by_slug($slug)
    {
        return $this->get_one([['PMD_slug' => $slug]]);
    }


    /**
     * Gets all the acceptable scopes for payment methods.
     * Keys are their names as store din the DB, and values are nice names for displaying them
     *
     * @return array
     */
    public function scopes()
    {
        return apply_filters(
            'FHEE__EEM_Payment_Method__scopes',
            [
                EEM_Payment_Method::scope_cart  => esc_html__('Front-end Registration Page', 'event_espresso'),
                EEM_Payment_Method::scope_admin => esc_html__(
                    'Admin Registration Page (no online processing)',
                    'event_espresso'
                ),
            ]
        );
    }


    /**
     * Determines if this is an valid scope
     *
     * @param string $scope like one of EEM_Payment_Method::instance()->scopes()
     * @return boolean
     */
    public function is_valid_scope($scope)
    {
        $scopes = $this->scopes();
        if (isset($scopes[ $scope ])) {
            return true;
        }
        return false;
    }


    /**
     * Gets all active payment methods
     *
     * @param string $scope one of
     * @param array  $query_params
     * @return EE_Base_Class[]|EE_Payment_Method[]
     * @throws EE_Error
     */
    public function get_all_active($scope = null, $query_params = [])
    {
        if (! isset($query_params['order_by']) && ! isset($query_params['order'])) {
            $query_params['order_by'] = ['PMD_order' => 'ASC', 'PMD_ID' => 'ASC'];
        }
        return $this->get_all($this->_get_query_params_for_all_active($scope, $query_params));
    }


    /**
     * Counts all active gateways in the specified scope
     *
     * @param string $scope one of EEM_Payment_Method::scope_*
     * @param array  $query_params
     * @return int
     * @throws EE_Error
     */
    public function count_active($scope = null, $query_params = [])
    {
        return $this->count($this->_get_query_params_for_all_active($scope, $query_params));
    }


    /**
     * Creates the $query_params that can be passed into any EEM_Payment_Method as their $query_params
     * argument to get all active for a given scope
     *
     * @param string $scope one of the constants EEM_Payment_Method::scope_*
     * @param array  $query_params
     * @return array
     * @throws EE_Error
     * @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     */
    protected function _get_query_params_for_all_active($scope = null, $query_params = [])
    {
        if ($scope) {
            if ($this->is_valid_scope($scope)) {
                return array_replace_recursive([['PMD_scope' => ['LIKE', "%$scope%"]]], $query_params);
            }
            throw new EE_Error(
                sprintf(
                    esc_html__("'%s' is not a valid scope for a payment method", 'event_espresso'),
                    $scope
                )
            );
        }
        $acceptable_scopes = [];
        $count = 0;
        foreach ($this->scopes() as $scope_name => $desc) {
            $count++;
            $acceptable_scopes[ 'PMD_scope*' . $count ] = ['LIKE', '%' . $scope_name . '%'];
        }
        return array_replace_recursive([['OR*active_scope' => $acceptable_scopes]], $query_params);
    }


    /**
     * Creates the $query_params that can be passed into any EEM_Payment_Method as their $query_params
     * argument to get all active for a given scope
     *
     * @param string $scope one of the constants EEM_Payment_Method::scope_*
     * @param array  $query_params
     * @return array
     * @throws EE_Error
     * @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     */
    public function get_query_params_for_all_active($scope = null, $query_params = [])
    {
        return $this->_get_query_params_for_all_active($scope, $query_params);
    }


    /**
     * Gets one active payment method. see @get_all_active for documentation
     *
     * @param string $scope
     * @param array  $query_params
     * @return EE_Base_Class|EE_Payment_Method|EE_Soft_Delete_Base_Class|NULL
     * @throws EE_Error
     */
    public function get_one_active($scope = null, $query_params = [])
    {
        return $this->get_one($this->_get_query_params_for_all_active($scope, $query_params));
    }


    /**
     * Gets one payment method of that type, regardless of whether its active or not
     *
     * @param string $type
     * @return EE_Base_Class|EE_Payment_Method|EE_Soft_Delete_Base_Class|NULL
     * @throws EE_Error
     */
    public function get_one_of_type($type)
    {
        return $this->get_one([['PMD_type' => $type]]);
    }


    /**
     * Overrides parent ot also check by the slug
     *
     * @param string|int|EE_Payment_Method $base_class_obj_or_id
     * @param boolean                      $ensure_is_in_db
     * @return EE_Base_Class|EE_Payment_Method|EE_Soft_Delete_Base_Class|int|string
     * @throws EE_Error
     * @see EEM_Base::ensure_is_obj()
     */
    public function ensure_is_obj($base_class_obj_or_id, $ensure_is_in_db = false)
    {
        // first: check if it's a slug
        if (is_string($base_class_obj_or_id)) {
            $obj = $this->get_one_by_slug($base_class_obj_or_id);
            if ($obj) {
                return $obj;
            }
        }
        // ok so it wasn't a slug we were passed. try the usual then (ie, it's an object or an ID)
        try {
            return parent::ensure_is_obj($base_class_obj_or_id, $ensure_is_in_db);
        } catch (EE_Error $e) {
            // handle it outside the catch
        }
        throw new EE_Error(
            sprintf(
                esc_html__("'%s' is neither a Payment Method ID, slug, nor object.", 'event_espresso'),
                $base_class_obj_or_id
            )
        );
    }


    /**
     * Gets the ID of this object, or if its a string finds the object's id
     * associated with that slug
     *
     * @param mixed $base_obj_or_id_or_slug
     * @return int
     * @throws EE_Error
     */
    public function ensure_is_ID($base_obj_or_id_or_slug)
    {
        if (is_string($base_obj_or_id_or_slug)) {
            // assume it's a slug
            $base_obj_or_id_or_slug = $this->get_one_by_slug($base_obj_or_id_or_slug);
        }
        return parent::ensure_is_ID($base_obj_or_id_or_slug);
    }


    /**
     * Verifies the button urls on all the passed payment methods have a valid button url.
     * If not, resets them to their default.
     *
     * @param EE_Payment_Method[] $payment_methods if NULL, defaults to all payment methods active in the cart
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function verify_button_urls($payment_methods = null)
    {
        $payment_methods = is_array($payment_methods)
            ? $payment_methods
            : $this->get_all_active(EEM_Payment_Method::scope_cart);
        foreach ($payment_methods as $payment_method) {
            try {
                // If there is really no button URL at all, or if the button URLs still point to decaf folder even
                // though this is a caffeinated install, reset it to the default.
                $current_button_url = $payment_method->button_url();
                if (empty($current_button_url)
                    || (
                        strpos($current_button_url, 'decaf') !== false
                        && strpos($payment_method->type_obj()->default_button_url(), 'decaf') === false
                    )
                ) {
                    $payment_method->save(
                        [
                            'PMD_button_url' => $payment_method->type_obj()->default_button_url(),
                        ]
                    );
                }
            } catch (EE_Error $e) {
                $payment_method->deactivate();
            }
        }
    }


    /**
     * Overrides parent to not only turn wpdb results into EE_Payment_Method objects,
     * but also verifies the payment method type of each is a usable object. If not,
     * deactivate it, sets a notification, and deactivates it
     *
     * @param array $rows
     * @return EE_Payment_Method[]
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    protected function _create_objects($rows = [])
    {
        EE_Registry::instance()->load_lib('Payment_Method_Manager');
        $payment_methods = parent::_create_objects($rows);
        /* @var $payment_methods EE_Payment_Method[] */
        $usable_payment_methods = [];
        foreach ($payment_methods as $key => $payment_method) {
            if (EE_Payment_Method_Manager::instance()->payment_method_type_exists($payment_method->type())) {
                $usable_payment_methods[ $key ] = $payment_method;
                // some payment methods enqueue their scripts in EE_PMT_*::__construct
                // which is kinda a no-no (just because it's being constructed doesn't mean we need to enqueue
                // its scripts). but for backwards-compat we should continue to do that
                $payment_method->type_obj();
            } elseif ($payment_method->active()) {
                // only deactivate and notify the admin if the payment is active somewhere
                $payment_method->deactivate();
                $payment_method->save();
                do_action(
                    'AHEE__EEM_Payment_Method___create_objects_auto_deactivated_payment_method',
                    $payment_method
                );
                new PersistentAdminNotice(
                    'auto-deactivated-' . $payment_method->type(),
                    sprintf(
                        esc_html__(
                            'The payment method %1$s was automatically deactivated because it appears its associated Event Espresso Addon was recently deactivated.%2$sIt can be reactivated on the %3$sPlugins admin page%4$s, then you can reactivate the payment method.',
                            'event_espresso'
                        ),
                        $payment_method->admin_name(),
                        '<br />',
                        '<a href="' . admin_url('plugins.php') . '">',
                        '</a>'
                    ),
                    true
                );
            }
        }
        return $usable_payment_methods;
    }


    /**
     * Gets all the payment methods which can be used for transaction
     * (according to the relations between payment methods and events, and
     * the currencies used for the transaction and their relation to payment methods)
     *
     * @param EE_Transaction $transaction
     * @param string         $scope @see EEM_Payment_Method::get_all_for_events
     * @return EE_Payment_Method[]
     * @throws EE_Error
     */
    public function get_all_for_transaction($transaction, $scope)
    {
        // give addons a chance to override what payment methods are chosen based on the transaction
        return apply_filters(
            'FHEE__EEM_Payment_Method__get_all_for_transaction__payment_methods',
            $this->get_all_active($scope, ['group_by' => 'PMD_type']),
            $transaction,
            $scope
        );
    }


    /**
     * Returns the payment method used for the last payment made for a registration.
     * Note: if an offline payment method was selected on the related transaction then this will have no payment
     * methods returned. It will ONLY return a payment method for a PAYMENT recorded against the registration.
     *
     * @param EE_Registration|int $registration_or_reg_id Either the EE_Registration object or the id for the
     *                                                    registration.
     * @return EE_Payment|null
     * @throws EE_Error
     */
    public function get_last_used_for_registration($registration_or_reg_id)
    {
        $registration_id = EEM_Registration::instance()->ensure_is_ID($registration_or_reg_id);

        $query_params = [
            0          => [
                'Payment.Registration.REG_ID' => $registration_id,
            ],
            'order_by' => ['Payment.PAY_ID' => 'DESC'],
        ];
        return $this->get_one($query_params);
    }
}
