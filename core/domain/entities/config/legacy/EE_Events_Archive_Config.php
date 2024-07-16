<?php

/**
 * stores Events_Archive settings
 */
class EE_Events_Archive_Config extends EE_Config_Base
{
    /** @var bool|int */
    public $display_address_in_regform = true;

    /** @var bool|int */
    public $display_status_banner = false;

    /** @var bool|int */
    public $display_description = true;

    /** @var bool|int */
    public $display_ticket_selector = false;

    /** @var bool|int */
    public $display_datetimes = true;

    /** @var bool|int */
    public $display_venue = false;

    /** @var bool|int */
    public $display_expired_events = false;

    /** @var bool|int */
    public $display_events_with_expired_tickets = false;

    // display order options

    /** @var bool|int */
    public $use_sortable_display_order = false;

    public ?int $display_order_tickets = 100;

    public ?int $display_order_datetimes = 110;

    public ?int $display_order_event = 120;

    public ?int $display_order_venue = 130;


    public function __construct()
    {
    }
}
