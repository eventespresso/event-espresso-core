<?php
namespace EventEspresso\tests\includes;

class AddonLoader extends CoreLoader
{
    protected $addon_tests_path;
    protected $addon_main_path;
    protected $addon_main_file;

    public function __construct($addon_tests_path, $addon_main_path, $addon_main_file)
    {
        $this->addon_tests_path = $addon_tests_path;
        $this->addon_main_path = $addon_main_path;
        $this->addon_main_file = $addon_main_file;
    }


    public function setupAndLoadEE()
    {
        parent::setupAndloadEE();
        //bootstrap addon
        require $this->addon_main_path . $this->addon_main_file;
    }
}