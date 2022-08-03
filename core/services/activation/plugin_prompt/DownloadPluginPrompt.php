<?php

namespace EventEspresso\core\services\activation\plugin_prompt;

use EventEspresso\core\services\notifications\AdminNotification;

class DownloadPluginPrompt extends AdminNotification
{
    /**
     * @var string
     */
    protected $dependency = '';

    /**
     * @var string
     */
    protected $heading = '';

    /**
     * @var string
     */
    protected $image = '';

    /**
     * @var int
     */
    protected $image_size = 0;

    /**
     * @var string
     */
    protected $message = '';

    /**
     * @var string
     */
    protected $plugin_name = '';

    /**
     * @var string
     */
    protected $plugin_url = '';


    /**
     * @param string      $plugin_name [required] the name, or key of the Persistent Admin Notice to be stored
     * @param string      $plugin_url  [required] the message to be stored persistently until dismissed
     * @param string      $dependency
     * @param string|null $message
     * @param string|null $image
     * @param int|null    $image_size
     */
    public function __construct(
        string $plugin_name,
        string $plugin_url,
        string $dependency,
        ?string $heading = '',
        ?string $message = '',
        ?string $image = '',
        ?int $image_size = 480
    ) {
        $this->plugin_name = $plugin_name;
        $this->plugin_url  = $plugin_url;
        $this->dependency  = $dependency;
        $this->heading     = $heading;
        $this->message     = $message;
        $this->image       = $image;
        $this->image_size  = absint($image_size) ?? 480;
        $identifier        = "$plugin_name-download-plugin-prompt";
        parent::__construct($identifier, $this->content(), AdminNotification::TYPE_CUSTOM, false);
        $this->addCssClass("ee-download-plugin-prompt");
        $this->setIsDismissible(true);
        $this->setCapability('activate_plugins');
        $this->setCapContext('view download plugin prompts');
    }


    private function content(): string
    {
        $heading = $this->heading ?? esc_html__("Don't miss out on exciting new features!", 'event_espresso');
        $message = $this->message ?? sprintf(
        /* translators: 'Some Feature' needs the 'Plugin Name' plugin in order provide your site with the maximum functionality it can offer. */
            esc_html__(
                '%1$s needs the %2$s plugin in order provide your site with the maximum functionality it can offer.',
                'event_espresso'
            ),
            // 'Some Feature'
            $this->dependency,
            // 'Plugin Name & Link'
            "<a href='$this->plugin_url' target='_blank'>$this->plugin_name</a>"
        );
        $button  = sprintf(
        /* translators: 'Download and Activate Plugin Name */
            esc_html__('Download and Activate %1$s', 'event_espresso'),
            $this->plugin_name
        );
        return "
        <div class='ee-download-plugin-prompt__content'>
            <div class='ee-download-plugin-prompt__message'>
                <span class='dashicons dashicons-admin-plugins'></span>
                <h2>$heading</h2>
                <p>$message</p>
                <p>
                    <a class='ee-download-plugin-prompt__button button button--primary'
                       href='http://www.dev.test/wp-admin/plugin-install.php?s={$this->plugin_name}&tab=search&type=term'                    
                    >
                        $button
                    </a>
                </p>                
            </div>
            {$this->image()}
        </div>";
    }


    private function image(): string
    {
        $image = $this->findImage();
        $alt   = esc_html__("download plugin prompt", 'event_espresso');
        return $image ?
            "<div class='ee-download-plugin-prompt__image'>
                <img src='{$image}' alt='$alt' width='{$this->image_size}px'/>
            </div>"
            : '';
    }


    private function findImage(): string
    {
        // if image is already a URL then just return it
        if (strpos($this->image, 'http') === 0) {
            return $this->image;
        }
        // otherwise look in /global_assets/images/download_plugin_prompt/
        $file_path = EE_TEMPLATES . "global_assets/images/download_plugin_prompt/{$this->image}";
        return file_exists($file_path) ? EE_GLOBAL_ASSETS_URL . "images/download_plugin_prompt/{$this->image}" : '';
    }
}

