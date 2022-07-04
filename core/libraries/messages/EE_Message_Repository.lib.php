<?php

/**
 * Serves as a repository for EE_Message objects
 *
 * @package    Event Espresso
 * @subpackage repository
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Message_Repository extends EE_Base_Class_Repository
{
    /**
     * EE_Message_Repository constructor
     */
    public function __construct()
    {
        $this->interface = 'EE_Message';
        parent::__construct();
    }


    /**
     * Add the EE_Message to the repository.
     * This also ensures that the MSG_token is saves as a part of the info for retrieval.
     *
     * @param EE_Message $message
     * @param mixed      $info Any included data is saved in the attached object info array indexed by 'data'
     * @return bool
     */
    public function add($message, $info = ''): bool
    {
        // ensure $info is an array if not already
        $info = (array) $info;
        $attached = parent::add($message);
        $data = $this->_init_data($info, $attached, $message);
        if ($attached) {
            $this->set_info($message, $data);
        }
        return $attached;
    }


    /**
     * Initializes the data from the incoming info.
     *
     * @param array      $info     incoming data.
     * @param bool       $attached Indicates whether the object was attached successfully.
     * @param EE_Message $message
     * @return array
     */
    protected function _init_data(array $info, bool $attached, EE_Message $message): array
    {
        $data = [
            'test_send'               => false,
            'preview'                 => false,
            'data_handler_class_name' => '',
            'data'                    => [
                'MSG_generation_data' => [],
            ],
        ];
        if (isset($info['preview'])) {
            $data['preview'] = $info['preview'];
            unset($info['preview']);
        }
        if (isset($info['test_send'])) {
            $data['test_send'] = $info['test_send'];
            unset($info['test_send']);
        }
        if (isset($info['data_handler_class_name'])) {
            $data['data_handler_class_name'] = $info['data_handler_class_name'];
            unset($info['data_handler_class_name']);
        }
        if ($attached && $message->STS_ID() === EEM_Message::status_incomplete) {
            $generation_data = $info['MSG_generation_data'] ?? [];
            // if data isn't in $info...let's see if its available via the message object
            $generation_data = ! $generation_data ? $message->get_generation_data() : $generation_data;
            // still empty then let's just use info
            $generation_data                     = ! $generation_data ? $info : $generation_data;
            $data['data']['MSG_generation_data'] = $generation_data;
        }
        return $data;
    }


    /**
     * Save all EE_Message objects to the db.
     *
     * @param bool $do_hooks_only When true, only the hooks related to saving are fired.
     * @return array [
     *                  'updated'    => 0, // count of how many messages updated
     *                  'notupdated' => 0, // count of how many messages not updated.
     *                  'errors'     => array( $token ), // message object tokens that had errors in saving
 *                  ]
     */
    public function saveAll(bool $do_hooks_only = false): array
    {
        $save_tracking = ['updated' => 0, 'notupdated' => 0, 'errors' => []];

        if (! $do_hooks_only) {
            $this->rewind();
            // exit early if there is nothing to save.
            if ($this->count() < 1) {
                return $save_tracking;
            }

            while ($this->valid()) {
                $saved = $this->current()->save();
                if ($saved === false) {
                    $save_tracking['errors'][] = $this->current()->MSG_token();
                } elseif ($saved) {
                    $save_tracking['updated']++;
                } else {
                    $save_tracking['notupdated']++;
                }
                // maybe persist generation data if this is an incomplete EE_Message.
                $this->_maybe_persist_attached_data();

                $this->next();
            }
        }
        do_action('AHEE__EE_Message_Repository__saveAll__after', $save_tracking, $this, $do_hooks_only);
        return $save_tracking;
    }


    /**
     * Retrieves a EE_Message from the repository that matches the given token.
     *
     * @param string $token Token.
     * @return EE_Message | null
     */
    public function getMessageByToken(string $token): ?EE_Message
    {
        $this->rewind();
        while ($this->valid()) {
            if ($this->current()->MSG_token() === $token) {
                $message = $this->current();
                $this->rewind();
                return $message;
            }
            $this->next();
        }
        return null;
    }


    /**
     * This retrieves any data required for generation that may be saved with the current EE_Message in storage.
     *
     * @return array();
     */
    public function get_generation_data(): array
    {
        // first verify we're at a valid iterator point.
        if (! $this->valid()) {
            return [];
        }
        $info = $this->getInfo();
        return $info['data']['MSG_generation_data'] ?? [];
    }


    /**
     * Retrieves the data_handler_class_name or reference associated with the current EE_Message object in the iterator.
     *
     * @return string
     */
    public function get_data_handler(): string
    {
        if (! $this->valid()) {
            return '';
        }
        $info = $this->getInfo();
        return $info['data_handler_class_name'] ?? '';
    }


    /**
     * Returns whether this EE_Message is for a preview or not.
     *
     * @return bool
     */
    public function is_preview(): bool
    {
        if (! $this->valid()) {
            return false;
        }
        $info = $this->getInfo();
        return filter_var($info['preview'] ?? false, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * Returns whether the current message pointed to is for a test send.
     *
     * @return bool
     */
    public function is_test_send(): bool
    {
        if (! $this->valid()) {
            return false;
        }
        $info = $this->getInfo();
        return filter_var($info['test_send'] ?? false, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     *  This checks if the current EE_Message in the iterator is incomplete. If it is, then
     *  data is attached for later retrieval (batch generation).
     */
    protected function _maybe_persist_attached_data()
    {
        if (! $this->valid()) {
            return;
        }

        $info                    = $this->getInfo();
        $data_handler_class_name = $info['data_handler_class_name'] ?? '';
        $data                    = $info['data']['MSG_generation_data'] ?? [];
        if ($data && $this->current()->STS_ID() === EEM_Message::status_incomplete) {
            $this->current()->set_generation_data($data);
            $this->current()->set_field_or_extra_meta('data_handler_class_name', $data_handler_class_name);
        }
    }


    /**
     * This method returns a count of messages in the repository that have a given priority.
     *
     * @param int               $priority the priority that is being filtered for the count.
     * @param array|string|null $status   the optional status(es) that will also be filtered by when priority matches.
     * @return int  count of messages in the queue matching the conditions.
     */
    public function count_by_priority_and_status(int $priority, $status = []): int
    {
        $count  = 0;
        $status = is_array($status) ? $status : [$status];
        $this->rewind();
        while ($this->valid()) {
            if (
                $this->current()->priority() === $priority
                && (empty($status) || in_array($this->current()->STS_ID(), $status))
            ) {
                $count++;
            }
            $this->next();
        }
        return $count;
    }
}
