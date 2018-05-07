<?php

/**
 * Interface EEMI_Payment_Log
 */
interface EEMI_Payment_Log
{

    /**
     * Logs a message
     *
     * @param string     $message
     * @param int|string $id
     * @param string     $model_name
     * @return EE_Log
     */
    public function gateway_log($message, $id, $model_name);
}
