<?php

namespace EventEspresso\core\domain\services\messages;

use EEH_Array;
use EventEspresso\core\services\request\DataType;
use EventEspresso\core\services\request\RequestInterface;
use RuntimeException;

/**
 *  DTO for managing message template request data
 *
 * @since 5.0.8.p
 */
class MessageTemplateRequestData
{
    protected ?RequestInterface $request         = null;

    protected string $context         = '';

    protected string $description     = '';

    protected string $messenger       = '';

    protected string $message_type    = '';

    protected string $name            = '';

    protected array $template_fields = [];

    protected int $group_ID        = 0;

    protected int $user_ID         = 0;

    protected bool $is_active       = false;

    protected bool $is_deleted      = false;

    protected bool $is_global       = false;

    protected bool $is_override     = false;


    /**
     * @param RequestInterface|null $request
     */
    public function __construct(?RequestInterface $request)
    {
        $this->request = $request;
    }


    public function setMessageTemplateRequestData()
    {
        $this->setContext();
        $this->setDescription();
        $this->setGroupID();
        $this->setIsActive();
        $this->setIsDeleted();
        $this->setIsGlobal();
        $this->setIsOverride();
        $this->setMessenger();
        $this->setMessageType();
        $this->setName();
        $this->setUserID();
        $this->setTemplateFields();
    }


    public function context(): string
    {
        return $this->context;
    }


    public function description(): string
    {
        return $this->description;
    }


    public function messenger(): string
    {
        return $this->messenger;
    }


    public function messageType(): string
    {
        return $this->message_type;
    }


    public function name(): string
    {
        return $this->name;
    }


    public function templateFields(): array
    {
        return $this->template_fields;
    }


    public function groupID(): int
    {
        return $this->group_ID;
    }


    public function userID(): int
    {
        return $this->user_ID;
    }


    public function isActive(): bool
    {
        return $this->is_active;
    }


    public function isDeleted(): bool
    {
        return $this->is_deleted;
    }


    public function isGlobal(): bool
    {
        return $this->is_global;
    }


    public function isOverride(): bool
    {
        return $this->is_override;
    }


    public function setContext(?string $context = ''): void
    {
        $this->context = $this->request->getRequestParam('context', $context);
        $this->context = $this->request->getRequestParam('MTP_context', $this->context);
        $this->context = strtolower($this->context);
    }


    public function setDescription(?string $description = ''): void
    {
        $this->description = $this->request->getRequestParam(
            'ee_msg_non_global_fields[MTP_description]',
            $description
        );
    }


    public function setGroupID(?int $group_ID = 0): void
    {
        $this->group_ID = $this->request->getRequestParam('group_ID', $group_ID, DataType::INTEGER);
        $this->group_ID = $this->request->getRequestParam('GRP_ID', $this->group_ID, DataType::INTEGER);
        // we need the GRP_ID for the template being used as the base for the new template
        if (empty($this->group_ID)) {
            throw new RuntimeException(
                esc_html__(
                    'In order to create a custom message template the GRP_ID of the template being used as a base is needed',
                    'event_espresso'
                )
            );
        }
    }


    public function setIsActive(bool $is_active = false): void
    {
        $this->is_active = $this->request->getRequestParam('MTP_is_active', $is_active, DataType::BOOLEAN);
    }


    public function setIsDeleted(bool $is_deleted = false): void
    {
        $this->is_deleted = $this->request->getRequestParam('MTP_deleted', $is_deleted, DataType::BOOLEAN);
    }


    public function setIsGlobal(bool $is_global = false): void
    {
        $this->is_global = $this->request->getRequestParam('MTP_is_global', $is_global, DataType::BOOLEAN);
    }


    public function setIsOverride(bool $is_override = false): void
    {
        $this->is_override = $this->request->getRequestParam('MTP_is_override', $is_override, DataType::BOOLEAN);
    }


    public function setMessenger(?string $messenger = ''): void
    {
        // have to check for multiple params because a previouv dev used different names for the same param >:(
        $this->messenger = $this->request->getRequestParam('msgr', $messenger);
        $this->messenger = $this->request->getRequestParam('messenger', $this->messenger);
        $this->messenger = $this->request->getRequestParam('MTP_messenger', $this->messenger);
        $this->messenger = strtolower($this->messenger);
        if (empty($this->messenger)) {
            throw new RuntimeException(
                esc_html__(
                    'Sorry, but we can\'t create new templates because we\'re missing the messenger',
                    'event_espresso'
                )
            );
        }
    }


    public function setMessageType(?string $message_type = ''): void
    {
        // have to check for multiple params because a previouv dev used different names for the same param >:(
        $this->message_type = $this->request->getRequestParam('mt', $message_type);
        $this->message_type = $this->request->getRequestParam('message_type', $this->message_type);
        $this->message_type = $this->request->getRequestParam('messageType', $this->message_type);
        $this->message_type = $this->request->getRequestParam('MTP_message_type', $this->message_type);
        $this->message_type = strtolower($this->message_type);

        if (empty($this->message_type)) {
            throw new RuntimeException(
                esc_html__(
                    'Sorry, but we can\'t create new templates because we\'re missing the message type',
                    'event_espresso'
                )
            );
        }
    }


    public function setName(?string $name = ''): void
    {
        $this->name = $this->request->getRequestParam('ee_msg_non_global_fields[MTP_name]', $name);
    }


    public function setUserID(?int $user_ID = 0): void
    {
        $this->user_ID = $this->request->getRequestParam('user_id', $user_ID, DataType::INTEGER);
        $this->user_ID = $this->request->getRequestParam('MTP_user_id', $this->user_ID, DataType::INTEGER);
    }


    private function setTemplateFields(): void
    {
        $this->template_fields = $this->request->getRequestParam(
            'template_fields',
            null,
            DataType::EDITOR,
            true
        );
        $this->template_fields = $this->request->getRequestParam(
            'MTP_template_fields',
            $this->template_fields,
            DataType::EDITOR,
            true
        );
        if (empty($this->template_fields)) {
            throw new RuntimeException(
                esc_html__(
                    'There was a problem saving the template fields from the form because I didn\'t receive any actual template field data.',
                    'event_espresso'
                )
            );
        }
        // messages content is expected to be escaped
        $this->template_fields = EEH_Array::addSlashesRecursively($this->template_fields);
    }
}
