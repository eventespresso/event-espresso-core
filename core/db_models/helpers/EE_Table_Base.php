<?php



/**
 * Base class for defining the tables that comprise models. This is used to store information
 * about the table\s alias, private key, etc.
 */
abstract class EE_Table_Base
{

    /**
     * This holds the table_name without the table prefix.
     *
     * @var string
     */
    var $_table_name;


    /**
     * This holds what is used as the alias for the table in queries.
     *
     * @var string
     */
    var $_table_alias;


    /**
     * Table's private key column
     *
     * @var string
     */
    protected $_pk_column;


    /**
     * Whether this table is a global table (in multisite) or specific to site.
     *
     * @var bool
     */
    protected $_global;



    /**
     * @global wpdb   $wpdb
     * @param string  $table_name with or without wpdb prefix
     * @param string  $pk_column
     * @param boolean $global     whether the table is "global" as in there is only 1 table on an entire multisite
     *                            install, or whether each site on a multisite install has a copy of this table
     */
    function __construct($table_name, $pk_column, $global = false)
    {
        $this->_global = $global;
        $prefix = $this->get_table_prefix();
        //if they added the prefix, let's remove it because we delay adding the prefix until right when its needed.
        if (strpos($table_name, $prefix) === 0) {
            $table_name = ltrim($table_name, $prefix);
        }
        $this->_table_name = $table_name;
        $this->_pk_column = $pk_column;
    }



    /**
     * This returns the table prefix for the current model state.
     *
     * @global wpdb $wpdb
     * @return string
     */
    public function get_table_prefix()
    {
        global $wpdb;
        if ($this->_global) {
            $prefix = $wpdb->base_prefix;
        } else {
            $prefix = $wpdb->get_blog_prefix(EEM_Base::get_model_query_blog_id());
        }
        return $prefix;
    }



    /**
     * Used to set the table_alias property
     *
     * @param string $table_alias
     */
    function _construct_finalize_with_alias($table_alias)
    {
        $this->_table_alias = $table_alias;
    }



    /**
     * Returns the fully qualified table name for the database (includes the table prefix current for the blog).
     *
     * @return string
     */
    function get_table_name()
    {
        return $this->get_table_prefix() . $this->_table_name;
    }



    /**
     * Provides what is currently set as the alias for the table to be used in queries.
     *
     * @return string
     * @throws EE_Error
     */
    function get_table_alias()
    {
        if ( ! $this->_table_alias) {
            throw new EE_Error("You must call _construct_finalize_with_alias before using the EE_Table_Base. Did you forget to call parent::__construct at the end of your EEMerimental_Base child's __construct?");
        }
        return $this->_table_alias;
    }



    /**
     * @return string name of column of PK
     */
    function get_pk_column()
    {
        return $this->_pk_column;
    }



    /**
     * returns a string with the table alias, a period, and the private key's column.
     *
     * @return string
     */
    function get_fully_qualified_pk_column()
    {
        $sql = $this->get_table_alias() . "." . $this->get_pk_column();
        return $sql;
    }



    /**
     * returns the special sql for a inner select with a limit.
     *
     * @return string    SQL select
     */
    public function get_select_join_limit($limit)
    {
        $limit = is_array($limit) ? 'LIMIT ' . implode(',', array_map('intval', $limit)) : 'LIMIT ' . (int)$limit;
        $SQL = SP . '(SELECT * FROM ' . $this->_table_name . SP . $limit . ') AS ' . $this->_table_alias;
        return $SQL;
    }



    /**
     * Returns whether or not htis is a global table (ie, on multisite there's
     * only one of these tables, on the main blog)
     *
     * @return boolean
     */
    public function is_global()
    {
        return $this->_global;
    }
}
