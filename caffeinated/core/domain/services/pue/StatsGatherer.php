<?php

namespace EventEspresso\caffeinated\core\domain\services\pue;

use EE_Config;
use EE_Currency_Config;
use EE_Registry;
use EEM_Datetime;
use EEM_Event;
use EEM_Payment_Method;
use EEM_Registration;
use EEM_Ticket;
use EEM_Transaction;
use Exception;
use EventEspresso\core\domain\services\registration\RegStatus;

/**
 * @deprecated 5.0.20.p
 */
class StatsGatherer
{
    public const COUNT_ALL_EVENTS                 = 'event';

    public const COUNT_ACTIVE_EVENTS              = 'active_event';

    public const COUNT_DATETIMES                  = 'datetime';

    public const COUNT_TICKETS                    = 'ticket';

    public const COUNT_DATETIMES_SOLD             = 'datetime_sold';

    public const COUNT_TICKETS_FREE               = 'free_ticket';

    public const COUNT_TICKETS_PAID               = 'paid_ticket';

    public const COUNT_TICKETS_SOLD               = 'ticket_sold';

    public const COUNT_REGISTRATIONS_APPROVED     = 'registrations_approved';

    public const COUNT_REGISTRATIONS_NOT_APPROVED = 'registrations_not_approved';

    public const COUNT_REGISTRATIONS_PENDING      = 'registrations_pending';

    public const COUNT_REGISTRATIONS_INCOMPLETE   = 'registrations_incomplete';

    public const COUNT_REGISTRATIONS_ALL          = 'registrations_all';

    public const COUNT_REGISTRATIONS_CANCELLED    = 'registrations_cancelled';

    public const COUNT_REGISTRATIONS_DECLINED     = 'registrations_declined';

    public const SUM_TRANSACTIONS_COMPLETE_TOTAL  = 'transactions_complete_total_sum';

    public const SUM_TRANSACTIONS_ALL_PAID        = 'transactions_all_paid';

    public const INFO_SITE_CURRENCY               = 'site_currency';


    /**
     * @var EEM_Payment_Method
     */
    private $payment_method_model;


    /**
     * @var EEM_Event
     */
    private $event_model;

    /**
     * @var EEM_Datetime
     */
    private $datetime_model;


    /**
     * @var EEM_Ticket
     */
    private $ticket_model;


    /**
     * @var EEM_Registration
     */
    private $registration_model;


    /**
     * @var EEM_Transaction
     */
    private $transaction_model;


    /**
     * @var EE_Config
     */
    private $config;


    /**
     * StatsGatherer constructor.
     *
     * @param EEM_Payment_Method $payment_method_model
     * @param EEM_Event          $event_model
     * @param EEM_Datetime       $datetime_model
     * @param EEM_Ticket         $ticket_model
     * @param EEM_Registration   $registration_model
     * @param EEM_Transaction    $transaction_model
     * @param EE_Config          $config
     */
    public function __construct(
        EEM_Payment_Method $payment_method_model,
        EEM_Event $event_model,
        EEM_Datetime $datetime_model,
        EEM_Ticket $ticket_model,
        EEM_Registration $registration_model,
        EEM_Transaction $transaction_model,
        EE_Config $config
    ) {
        $this->payment_method_model = $payment_method_model;
        $this->event_model          = $event_model;
        $this->datetime_model       = $datetime_model;
        $this->ticket_model         = $ticket_model;
        $this->registration_model   = $registration_model;
        $this->transaction_model    = $transaction_model;
        $this->config               = $config;
    }


    /**
     * Return the stats array for PUE UXIP stats.
     *
     * @return array
     */
    public function stats(): array
    {
        global $wp_version;
        $stats = $this->paymentMethodStats();
        // a-ok so let's setup our stats.
        $stats = array_merge(
            $stats,
            [
                'is_multisite'                    => is_multisite() && is_main_site(),
                'active_theme'                    => $this->getActiveThemeStat(),
                'ee4_all_events_count'            => $this->getCountFor(self::COUNT_ALL_EVENTS),
                'ee4_active_events_count'         => $this->getCountFor(self::COUNT_ACTIVE_EVENTS),
                'all_dtts_count'                  => $this->getCountFor(self::COUNT_DATETIMES),
                'dtt_sold'                        => $this->getCountFor(self::COUNT_DATETIMES_SOLD),
                'all_tkt_count'                   => $this->getCountFor(self::COUNT_TICKETS),
                'free_tkt_count'                  => $this->getCountFor(self::COUNT_TICKETS_FREE),
                'paid_tkt_count'                  => $this->getCountFor(self::COUNT_TICKETS_PAID),
                'tkt_sold'                        => $this->getCountFor(self::COUNT_TICKETS_SOLD),
                'approve_registration_count'      => $this->getCountFor(self::COUNT_REGISTRATIONS_APPROVED),
                'pending_registration_count'      => $this->getCountFor(self::COUNT_REGISTRATIONS_PENDING),
                'not_approved_registration_count' => $this->getCountFor(self::COUNT_REGISTRATIONS_NOT_APPROVED),
                'incomplete_registration_count'   => $this->getCountFor(self::COUNT_REGISTRATIONS_INCOMPLETE),
                'cancelled_registration_count'    => $this->getCountFor(self::COUNT_REGISTRATIONS_CANCELLED),
                'declined_registration_count'     => $this->getCountFor(self::COUNT_REGISTRATIONS_DECLINED),
                'all_registration_count'          => $this->getCountFor(self::COUNT_REGISTRATIONS_ALL),
                'completed_transaction_total_sum' => $this->getCountFor(self::SUM_TRANSACTIONS_COMPLETE_TOTAL),
                'all_transaction_paid_sum'        => $this->getCountFor(self::SUM_TRANSACTIONS_ALL_PAID),
                self::INFO_SITE_CURRENCY          => $this->config->currency instanceof EE_Currency_Config
                    ? $this->config->currency->code
                    : 'unknown',
                'phpversion'                      => implode(
                    '.',
                    [PHP_MAJOR_VERSION, PHP_MINOR_VERSION, PHP_RELEASE_VERSION]
                ),
                'wpversion'                       => $wp_version,
                'active_addons'                   => $this->getActiveAddons(),
            ]
        );
        // remove any values that equal null.  This ensures any stats that weren't retrieved successfully are excluded.
        return array_filter($stats, function ($value) {
            return $value !== null;
        });
    }


    /**
     * @param string $which enum (@see constants prefixed with COUNT)
     * @return int|float|null
     */
    private function getCountFor(string $which)
    {
        try {
            switch ($which) {
                case self::COUNT_ALL_EVENTS:
                    $count = $this->event_model->count();
                    break;
                case self::COUNT_TICKETS:
                    $count = $this->ticket_model->count();
                    break;
                case self::COUNT_DATETIMES:
                    $count = $this->datetime_model->count();
                    break;
                case self::COUNT_ACTIVE_EVENTS:
                    $count = $this->event_model->get_active_events([], true);
                    break;
                case self::COUNT_DATETIMES_SOLD:
                    $count = $this->datetime_model->sum([], 'DTT_sold');
                    break;
                case self::COUNT_TICKETS_FREE:
                    $count = $this->ticket_model->count([['TKT_price' => 0]]);
                    break;
                case self::COUNT_TICKETS_PAID:
                    $count = $this->ticket_model->count([['TKT_price' => ['>', 0]]]);
                    break;
                case self::COUNT_TICKETS_SOLD:
                    $count = $this->ticket_model->sum([], 'TKT_sold');
                    break;
                case self::COUNT_REGISTRATIONS_ALL:
                    $count = $this->registration_model->count();
                    break;
                case self::COUNT_REGISTRATIONS_CANCELLED:
                    $count = $this->registration_model->count([['STS_ID' => RegStatus::CANCELLED]]);
                    break;
                case self::COUNT_REGISTRATIONS_INCOMPLETE:
                    $count = $this->registration_model->count([['STS_ID' => RegStatus::INCOMPLETE]]);
                    break;
                case self::COUNT_REGISTRATIONS_NOT_APPROVED:
                    $count = $this->registration_model->count([['STS_ID' => RegStatus::AWAITING_REVIEW]]);
                    break;
                case self::COUNT_REGISTRATIONS_DECLINED:
                    $count = $this->registration_model->count([['STS_ID' => RegStatus::DECLINED]]);
                    break;
                case self::COUNT_REGISTRATIONS_PENDING:
                    $count = $this->registration_model->count(
                        [['STS_ID' => RegStatus::PENDING_PAYMENT]]
                    );
                    break;
                case self::COUNT_REGISTRATIONS_APPROVED:
                    $count = $this->registration_model->count([['STS_ID' => RegStatus::APPROVED]]);
                    break;
                case self::SUM_TRANSACTIONS_COMPLETE_TOTAL:
                    $count = $this->transaction_model->sum(
                        [['STS_ID' => EEM_Transaction::complete_status_code]],
                        'TXN_total'
                    );
                    break;
                case self::SUM_TRANSACTIONS_ALL_PAID:
                    $count = $this->transaction_model->sum([], 'TXN_paid');
                    break;
                default:
                    $count = null;
                    break;
            }
        } catch (Exception $e) {
            $count = null;
        }
        return $count;
    }


    /**
     * Return the active theme.
     *
     * @return false|string
     */
    private function getActiveThemeStat()
    {
        $theme = wp_get_theme();
        return $theme->get('Name');
    }


    /**
     * @return array
     */
    private function paymentMethodStats(): array
    {
        $payment_method_stats = [];
        try {
            $active_payment_methods = $this->payment_method_model->get_all_active(
                '',
                ['group_by' => 'PMD_type']
            );
            if ($active_payment_methods) {
                foreach ($active_payment_methods as $payment_method) {
                    $payment_method_stats[ $payment_method->name() . '_active_payment_method' ] = 1;
                }
            }
        } catch (Exception $e) {
            // do nothing just prevents fatals.
        }
        return $payment_method_stats;
    }


    /**
     * Return a list of active EE add-ons and their versions.
     *
     * @return string
     */
    private function getActiveAddons(): string
    {
        $activeAddons = [];
        $addOns       = EE_Registry::instance()->addons;
        if (! empty($addOns)) {
            foreach ($addOns as $addon) {
                $activeAddons[] = $addon->name() . '@' . $addon->version();
            }
        }
        return implode(',', $activeAddons);
    }
}
