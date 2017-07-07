<?php

namespace EventEspresso\tests\mocks\core;

use EE_Maintenance_Mode;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 *
 * EE_Maintenance_Mode Class
 *
 * Super Duper Class Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
class MaintenanceModeMock extends EE_Maintenance_Mode
{


    /**
     * @var MaintenanceModeMock $instance
     */
    private static $instance;

    /**
     * @var int $m_level
     */
    private $m_level = EE_Maintenance_Mode::level_0_not_in_maintenance;

    /**
     * @var boolean $db_old
     */
    private $db_old = false;



    /**
     * private constructor to prevent direct creation
     */
    private function __construct()
    {
    }


    /**
     * @return MaintenanceModeMock
     */
    public static function instance()
    {
        // check if class object is instantiated
        if (! self::$instance instanceof MaintenanceModeMock) {
            self::$instance = new self();
        }
        return self::$instance;
    }


    /**
     * @return int
     */
    public function real_level()
    {
        return $this->m_level;
    }



    /**
     * @return int
     */
    public function level()
    {
        return $this->m_level;
    }



    /**
     * @return boolean
     */
    public function set_maintenance_mode_if_db_old()
    {
        return $this->db_old;
    }



    /**
     * @param bool $db_old
     */
    public function setDbOld($db_old = true)
    {
        $this->db_old = filter_var($db_old, FILTER_VALIDATE_BOOLEAN);
    }



    /**
     * @param int $level
     * @return void
     */
    public function set_maintenance_level($level)
    {
        $this->m_level = absint($level);
    }



    /**
     * @return void
     */
    public function load_assets_required_for_m_mode()
    {
    }

}
