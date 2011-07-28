<?php

//from http://www.php.net/manual/en/function.session-set-save-handler.php
class Session
{

    /**
     * a database connection resource
     * @var resource
     */
    private $_sess_db;

    /**
     * Open the session
     * @return bool
     */


    public function open() {
        global $wpdb;
        $this->_sess_db = $wpdb;
            return $this->_sess_db; 
        

    }

    /**
     * Close the session
     * @return bool
     */
    public function close() {

        return true;

    }

    /**
     * Read the session
     * @param int session id
     * @return string string of the sessoin
     */
    public function read($id) {

        $id = $this->_sess_db->escape($id);
        $sql = sprintf("SELECT `value` FROM `" . EVENTS_SESSION_TABLE . "` " .
                       "WHERE session_id = '%s'", $id);
        if ($result = $this->_sess_db->get_row($sql)) {
            if ($this->_sess_db->num_rows>0) {
                $value = $result->value;
                return maybe_unserialize($value);
            }
        }
        return '';

    }

    /**
     * Write the session
     * @param int session id
     * @param string data of the session
     */
    public function write($id, $data) {

        $sql = sprintf("REPLACE INTO `" . EVENTS_SESSION_TABLE . "` VALUES('%s', '%s', '%s')",
                       $this->_sess_db->escape($id),
                       $this->_sess_db->escape($data),
                       $this->_sess_db->escape(time()));
        return $this->_sess_db->query($sql);

    }

    /**
     * Destoroy the session
     * @param int session id
     * @return bool
     */
    public function destroy($id) {

        $sql = sprintf("DELETE FROM `" . EVENTS_SESSION_TABLE . "` WHERE `session_id` = '%s'", $id);
        return $this->_sess_db->query($sql);

}

    /**
     * Garbage Collector
     * @param int life time (sec.)
     * @return bool
     * @see session.gc_divisor      100
     * @see session.gc_maxlifetime 1440
     * @see session.gc_probability    1
     * @usage execution rate 1/100
     *        (session.gc_probability/session.gc_divisor)
     */
    public function gc($max) {

        $sql = sprintf("DELETE FROM `" . EVENTS_SESSION_TABLE . "` WHERE `updated_on` < '%s'",
                       $this->_sess_db->escape(time() - $max));
        return $this->_sess_db->query($sql, $this->_sess_db);

    }

}