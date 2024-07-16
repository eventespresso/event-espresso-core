<?php

/**
 * Stores Event_Single_Config settings
 */
class EE_Event_Single_Config extends EE_Config_Base
{
    public $display_status_banner_single = 0;

    public $display_venue = 1;

    public $use_sortable_display_order = false;

    public $display_order_tickets = 100;

    public $display_order_datetimes = 110;

    public $display_order_event = 120;

    public $display_order_venue = 130;


    public function __construct()
    {
    }
}
