<?php

namespace EventEspresso\core\services\addon\api\v1;

class DataMigrationApi
{
    /**
     * @var string path to DMS folder
     */
    private $data_migration_scripts;


    /**
     * @return string
     */
    public function dataMigrationScripts()
    {
        return $this->data_migration_scripts;
    }


    /**
     * @param string $data_migration_scripts
     * @return void
     */
    public function addDataMigrationScripts($data_migration_scripts)
    {
        $this->data_migration_scripts = $data_migration_scripts;
    }
}
