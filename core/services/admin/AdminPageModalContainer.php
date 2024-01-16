<?php

namespace EventEspresso\core\services\admin;

use EventEspresso\core\services\request\sanitizers\AllowedTags;

class AdminPageModalContainer
{
    private string $modal_ID;

    private string $modal_class;

    private string $trigger_ID;

    private string $header;

    private string $content;

    private string $footer;


    /**
     * @param string $modal_ID
     * @param string $trigger_ID
     * @param string $header
     * @param string $content
     * @param string $footer
     * @param string $modal_class
     */
    public function __construct(
        string $modal_ID,
        string $trigger_ID,
        string $header,
        string $content,
        string $footer = '',
        string $modal_class = ''
    ) {
        $this->modal_ID    = esc_attr($modal_ID);
        $this->trigger_ID  = esc_attr($trigger_ID);
        $this->header      = esc_html($header);
        $this->content     = wp_kses($content, AllowedTags::getWithFullTags());
        $this->footer      = wp_kses($footer, AllowedTags::getWithFullTags());
        $this->modal_class = ! empty($modal_class) ? "$modal_class " : '';
        add_action('admin_print_footer_scripts', [$this, 'renderModal'], 998);
        add_action('admin_print_footer_scripts', [$this, 'printJs'], 999);
    }


    public function renderModal()
    {
        echo "
        <div id='$this->modal_ID' class='{$this->modal_class}ee-modal__overlay ee-modal__overlay--closed'>
            <div class='ee-modal'>
                <div class='ee-modal__header'>
                    <span class='ee-modal-close-btn dashicons dashicons-no'></span>
                    <h2>$this->header</h2>
                </div>
                <div class='ee-modal__content'>
                   $this->content
                </div>
                <div class='ee-modal__footer'>
                   $this->footer
                </div>
            </div>
        </div>
        ";
    }


    public function printJs()
    {
        ?>
        <script type="text/javascript">
            jq2 = jQuery.noConflict();
            jq2(function ($) {
                $('#<?php echo $this->trigger_ID; ?>').on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $('#<?php echo $this->modal_ID; ?>')
                        .removeClass('ee-modal__overlay--closed')
                        .addClass('ee-modal__overlay--open');
                    document.body.style.position = 'fixed';
                    document.body.style.top = `-${window.scrollY}px`;
                });
                $('#<?php echo $this->modal_ID; ?>').on('click', '.ee-modal-close-btn', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $('#<?php echo $this->modal_ID; ?>')
                        .removeClass('ee-modal__overlay--open')
                        .addClass('ee-modal__overlay--closed');
                    const scrollY = document.body.style.top;
                    document.body.style.position = '';
                    document.body.style.top = '';
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                });
            });

        </script>
        <?php
    }
}
