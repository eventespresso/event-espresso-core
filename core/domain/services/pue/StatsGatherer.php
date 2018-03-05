<?php
namespace EventEspresso\core\domain\services\pue;

use EEM_Datetime;
use EEM_Event;
use EEM_Payment_Method;
use EEM_Ticket;
use Exception;
use const PHP_MINOR_VERSION;
use const PHP_RELEASE_VERSION;

class StatsGatherer
{

    const COUNT_ALL_EVENTS = 'event';
    const COUNT_ACTIVE_EVENTS = 'active_event';
    const COUNT_DATETIMES = 'datetime';
    const COUNT_TICKETS = 'ticket';
    const COUNT_DATETIMES_SOLD = 'datetime_sold';
    const COUNT_TICKETS_FREE = 'free_ticket';
    const COUNT_TICKETS_PAID = 'paid_ticket';
    const COUNT_TICKETS_SOLD = 'ticket_sold';


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
     * StatsGatherer constructor.
     *
     * @param EEM_Payment_Method $payment_method_model
     * @param EEM_Event          $event_model
     * @param EEM_Datetime       $datetime_model
     * @param EEM_Ticket         $ticket_model
     */
    public function __construct(
        EEM_Payment_Method $payment_method_model,
        EEM_Event $event_model,
        EEM_Datetime $datetime_model,
        EEM_Ticket $ticket_model
    ) {
        $this->payment_method_model = $payment_method_model;
        $this->event_model = $event_model;
        $this->datetime_model = $datetime_model;
        $this->ticket_model = $ticket_model;
    }


    /**
     * Return the stats array for PUE UXIP stats.
     * @return array
     */
    public function stats()
    {
        $stats = $this->paymentMethodStats();
        //a-ok so let's setup our stats.
        $stats = array_merge($stats, array(
            'is_multisite' => is_multisite() && is_main_site(),
            'active_theme' => $this->getActiveThemeStat(),
            'ee4_all_events_count' => $this->getCountFor(self::COUNT_ALL_EVENTS),
            'ee4_active_events_count' => $this->getCountFor(self::COUNT_ACTIVE_EVENTS),
            'all_dtts_count' => $this->getCountFor(self::COUNT_DATETIMES),
            'dtt_sold' => $this->getCountFor(self::COUNT_DATETIMES_SOLD),
            'all_tkt_count' => $this->getCountFor(self::COUNT_TICKETS),
            'free_tkt_count' => $this->getCountFor(self::COUNT_TICKETS_FREE),
            'paid_tkt_count' => $this->getCountFor(self::COUNT_TICKETS_PAID),
            'tkt_sold' => $this->getCountFor(self::COUNT_TICKETS_SOLD),
            'phpversion' => implode('.', array(PHP_MAJOR_VERSION, PHP_MINOR_VERSION, PHP_RELEASE_VERSION))
        ));
        //remove any values that equal null.  This ensures any stats that weren't retrieved successfully are excluded.
        return array_filter($stats, function ($value) {
            return $value !== null;
        });
    }

    /**
     * @param string $which enum (@see constants prefixed with COUNT)
     * @return int|null
     */
    private function getCountFor($which)
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
                    $count = $this->event_model->get_active_events(array(), true);
                    break;
                case self::COUNT_DATETIMES_SOLD:
                    $count = $this->datetime_model->sum(array(), 'DTT_sold');
                    break;
                case self::COUNT_TICKETS_FREE:
                    $count = $this->ticket_model->count(array(array(
                        'TKT_price' => 0
                    )));
                    break;
                case self::COUNT_TICKETS_PAID:
                    $count = $this->ticket_model->count(array(array(
                        'TKT_price' => array('>', 0)
                    )));
                    break;
                case self::COUNT_TICKETS_SOLD:
                    $count = $this->ticket_model->sum(array(), 'TKT_sold');
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
    private function paymentMethodStats()
    {
        $payment_method_stats = array();
        try {
            $active_payment_methods = $this->payment_method_model->get_all_active(
                null,
                array('group_by' => 'PMD_type')
            );
            if ($active_payment_methods) {
                foreach ($active_payment_methods as $payment_method) {
                    $payment_method_stats['active_payment_method'] = $payment_method->name();
                }
            }
        } catch (Exception $e) {
            //do nothing just prevents fatals.
        }
        return $payment_method_stats;
    }
}