<?php
namespace EventEspresso\core\services\database;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class TableManager
 * For performing mysql database table schema manipulation
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @since                 $VID:$
 */
class TableManager extends \EE_Base
{

    /**
     * @var TableAnalysis $table_analysis
     */
    private $table_analysis;



    /**
     * TableManager constructor.
     *
     * @param TableAnalysis $TableAnalysis
     */
    public function __construct(TableAnalysis $TableAnalysis)
    {
        $this->table_analysis = $TableAnalysis;
    }



    /**
     * Gets the injected table analyzer, or throws an exception
     *
     * @return TableAnalysis
     * @throws \EE_Error
     */
    protected function getTableAnalysis()
    {
        if ($this->table_analysis instanceof TableAnalysis) {
            return $this->table_analysis;
        } else {
            throw new \EE_Error(
                sprintf(
                    __('Table analysis class on class %1$s is not set properly.', 'event_espresso'),
                    get_class($this)
                )
            );
        }
    }



    /**
     * @param string $table_name which can optionally start with $wpdb->prefix or not
     * @param string $column_name
     * @param string $column_info
     * @return bool|false|int
     */
    public function addColumn($table_name, $column_name, $column_info = 'INT UNSIGNED NOT NULL')
    {
        if (apply_filters('FHEE__EEH_Activation__add_column_if_it_doesnt_exist__short_circuit', false)) {
            return false;
        }
        global $wpdb;
        $full_table_name = $this->getTableAnalysis()->ensureTableNameHasPrefix($table_name);
        $columns = $this->getTableColumns($table_name);
        if ( ! in_array($column_name, $columns)) {
            $alter_query = "ALTER TABLE {$full_table_name} ADD {$column_name} {$column_info}";
            return $wpdb->query($alter_query);
        }
        return true;
    }



    /**
     * Gets the name of all columns on the  table. $table_name can
     * optionally start with $wpdb->prefix or not
     *
     * @global \wpdb $wpdb
     * @param string $table_name
     * @return array
     */
    public function getTableColumns($table_name)
    {
        global $wpdb;
        $table_name = $this->getTableAnalysis()->ensureTableNameHasPrefix($table_name);
        $field_array = array();
        if ( ! empty($table_name)) {
            $columns = $wpdb->get_results("SHOW COLUMNS FROM {$table_name} ");
            if ($columns !== false) {
                foreach ($columns as $column) {
                    $field_array[] = $column->Field;
                }
            }
        }
        return $field_array;
    }



    /**
     * Drops the specified table from the database. $table_name can
     * optionally start with $wpdb->prefix or not
     *
     * @global \wpdb $wpdb
     * @param string $table_name
     * @return int
     */
    public function dropTable($table_name)
    {
        global $wpdb;
        if ($this->getTableAnalysis()->tableExists($table_name)) {
            $table_name = $this->getTableAnalysis()->ensureTableNameHasPrefix($table_name);
            return $wpdb->query("DROP TABLE IF EXISTS {$table_name}");
        }
        return 0;
    }



    /**
     * Drops all the tables mentioned in a single MYSQL query. Double-checks
     * each table name provided has a wpdb prefix attached, and that it exists.
     * Returns the list actually deleted
     *
     * @global WPDB $wpdb
     * @param array $table_names
     * @return array of table names which we deleted
     */
    public function dropTables($table_names)
    {
        $tables_to_delete = array();
        foreach ($table_names as $table_name) {
            $table_name = $this->getTableAnalysis()->ensureTableNameHasPrefix($table_name);
            if ($this->getTableAnalysis()->tableExists($table_name)) {
                $tables_to_delete[] = $table_name;
            }
        }
        if( ! empty( $tables_to_delete ) ) {
            global $wpdb;
            $wpdb->query('DROP TABLE ' . implode(', ', $tables_to_delete));
        }
        return $tables_to_delete;
    }



    /**
     * Drops the specified index from the specified table. $table_name can
     * optionally start with $wpdb->prefix or not

     *
*@global \wpdb       $wpdb
     * @param string $table_name
     * @param string $index_name
     * @return int the number of indexes dropped. False if there was a datbase error
     */
    public function dropIndex($table_name, $index_name)
    {
        if (apply_filters('FHEE__EEH_Activation__drop_index__short_circuit', false)) {
            return 0;
        }
        global $wpdb;
        $table_name = $this->getTableAnalysis()->ensureTableNameHasPrefix($table_name);
        $index_exists_query = "SHOW INDEX FROM {$table_name} WHERE key_name = '{$index_name}'";
        if (
            $this->getTableAnalysis()->tableExists($table_name)
            && $wpdb->get_var($index_exists_query)
               === $table_name //using get_var with the $index_exists_query returns the table's name
        ) {
            return $wpdb->query("ALTER TABLE {$table_name} DROP INDEX {$index_name}");
        }
        return 0;
    }



    /**
     * Just creates the requested table. $table_name can
     * optionally start with $wpdb->prefix or not

     *
*@param string       $table_name
     * @param string $create_sql defining the table's columns and indexes
     * @param string $engine     (no need to specify "ENGINE=", that's implied)
     * @return void
     * @throws \EE_Error
     */
    public function createTable($table_name, $create_sql, $engine = 'MyISAM')
    {
        // does $sql contain valid column information? ( LPT: https://regex101.com/ is great for working out regex patterns )
        if (preg_match('((((.*?))(,\s))+)', $create_sql, $valid_column_data)) {
            $table_name = $this->getTableAnalysis()->ensureTableNameHasPrefix($table_name);
            /** @var \wpdb $wpdb */
            global $wpdb;
            $SQL = "CREATE TABLE {$table_name} ( {$create_sql} ) ENGINE={$engine} " . $wpdb->get_charset_collate();

            //get $wpdb to echo errors, but buffer them. This way at least WE know an error
            //happened. And then we can choose to tell the end user
            $old_show_errors_policy = $wpdb->show_errors(true);
            $old_error_suppression_policy = $wpdb->suppress_errors(false);
            ob_start();
            dbDelta($SQL);
            $output = ob_get_contents();
            ob_end_clean();
            $wpdb->show_errors($old_show_errors_policy);
            $wpdb->suppress_errors($old_error_suppression_policy);
            if ( ! empty($output)) {
                throw new \EE_Error($output);
            }
        } else {
            throw new \EE_Error(
                sprintf(
                    __('The following table creation SQL does not contain valid information about the table columns: %1$s %2$s',
                        'event_espresso'),
                    '<br />',
                    $create_sql
                )
            );
        }
    }



    /**
     * Drops the specified index if it's size differs from $desired_index_size.
     * WordPress' dbdelta method doesn't automatically change index sizes, so this
     * method can be used to only drop the index if needed, and afterwards dbdelta can be used as normal.
     * If the table doesn't exist, or it exists but the index does not, or returns false
     *
     * @param string $table_name
     * @param string $index_name
     * @param string $column_name if none is provided, we assume the column name matches the index (often true in EE)
     * @param string|int $desired_index_size defaults to TableAnalysis::index_col_size, the max for utf8mb4.
     * @return bool whether an index was dropped or not
     * @throws /EE_Error if table analysis object isn't defined
     */
    public function dropIndexIfSizeNot($table_name, $index_name, $column_name = null, $desired_index_size = TableAnalysis::INDEX_COLUMN_SIZE)
    {
        if($column_name === null){
            $column_name = $index_name;
        }
        if(!$this->getTableAnalysis()->tableExists($table_name)){
            return false;
        }
        $index_entries = $this->getTableAnalysis()->showIndexes($table_name,$index_name);
        if(empty($index_entries)){
            return false;
        }
        foreach($index_entries as $index_entry){
            if( $column_name === $index_entry->Column_name
                && (string)$desired_index_size !== $index_entry->Sub_part){
                return $this->dropIndex($table_name,$index_name);
            }
        }
        return false;
    }

}
