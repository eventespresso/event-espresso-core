<?php

namespace EventEspresso\core\services\admin;

use EventEspresso\core\domain\services\assets\EspressoLegacyAdminAssetManager;
use EventEspresso\core\services\request\DataType;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * @since 5.0.0.p
 */
class AdminListTableFilters
{
    /**
     * @var RequestInterface
     */
    protected RequestInterface $request;

    protected string $search_term;

    protected ?string $orderby;

    protected ?string $order;

    protected ?string $detached;

    protected ?string $post_mime_type;


    public function __construct(RequestInterface $request)
    {
        $this->request = $request;
        // add_action('admin_enqueue_scripts', [$this, 'loadScriptsStyles']);
    }


    public function loadScriptsStyles()
    {
        wp_enqueue_script(EspressoLegacyAdminAssetManager::JS_HANDLE_EE_ADMIN);
    }


    /**
     * Sets the parameters from request
     *
     * @return void
     */
    private function setRequestParams(): void
    {
        $this->search_term    = $this->request->getRequestParam('s', '');
        $this->orderby        = $this->request->getRequestParam('orderby');
        $this->order          = $this->request->getRequestParam('order');
        $this->post_mime_type = $this->request->getRequestParam('post_mime_type');
        $this->detached       = $this->request->getRequestParam('detached');
    }


    /**
     * Displays the search box with reset button
     *
     * @param string $text     The 'submit' button label.
     * @param string $input_id ID attribute value for the search input field.
     * @param string $url      Reset URL
     * @return void
     */
    public function searchBox(string $text, string $input_id, string $url): void
    {
        $this->setRequestParams();
        if (! empty($this->orderby)) {
            echo '<input type="hidden" name="orderby" value="' . esc_attr($this->orderby) . '" />';
        }
        if (! empty($this->order)) {
            echo '<input type="hidden" name="order" value="' . esc_attr($this->order) . '" />';
        }
        if (! empty($this->post_mime_type)) {
            echo '<input type="hidden" name="post_mime_type" value="' . esc_attr($this->post_mime_type) . '" />';
        }
        if (! empty($this->detached)) {
            echo '<input type="hidden" name="detached" value="' . esc_attr($this->detached) . '" />';
        }
        ?>
        <p class="search-box">
            <label class="screen-reader-text" for="<?php echo esc_attr($input_id); ?>"><?php echo $text; ?>:</label>
            <input type="search"
                   id="<?php echo esc_attr($input_id); ?>"
                   name="s"
                   value="<?php _admin_search_query(); ?>"
            />
            <button id="search-submit" class="button button--secondary" data-type="submit">
                <span class="dashicons dashicons-search"></span>
                <span class="ee-search-btn-text"><?php esc_html_e($text); ?></span>

            </button>
            <?php // submit_button($text, '', '', false, ['id' => 'search-submit']); ?>
            <?php
            if (! empty($this->search_term)) {
                echo wp_kses($this->generateResetButton($url), AllowedTags::getAllowedTags());
            }
            ?>
        </p>
        <?php
    }


    /**
     * filters
     * This receives the filters array from children _get_table_filters() and assembles the string including the filter
     * button.
     *
     * @param string[] $filters
     * @param string   $url Reset URL
     * @return void  echos html showing filters
     */
    public function filters(array $filters, string $url): void
    {
        $use_filters = $this->request->getRequestParam('use_filters', false, DataType::BOOL);
        $use_filters = $use_filters ? 'yes' : 'no';

        $filters_html = '';
        foreach ($filters as $filter) {
            $filters_html .= wp_kses($filter, AllowedTags::getWithFormTags());
        }
        $filter_submit_btn_text = esc_html__('Filter', 'event_espresso');

        echo "
        <div id='ee-list-table-filters-dv' class='ee-list-table-filters actions alignleft'>
           $filters_html
            <span class='ee-list-table-filters__submit-buttons'>
                <input type='submit'
                       class='ee-list-table-filter-submit button button--secondary'
                       id='post-query-submit'
                       value='$filter_submit_btn_text'
                />
                <input type='hidden' id='ee-list-table-use-filters' name='use_filters' value='$use_filters' />
                " . wp_kses($this->generateResetButton($url), AllowedTags::getAllowedTags()) . "
            </span>
        </div>
        <button id='ee-list-table-filters-toggle'
            class='button button--secondary button--small'
            data-target='ee-list-table-filters'
            data-hide-text='" . esc_html__('hide filters', 'event_espresso') . "'
            data-show-text='" . esc_html__('show filters', 'event_espresso') . "'
        >
            <span class='dashicons dashicons-filter'></span>
            <span class='ee-list-table-filters-toggle-text'>" . esc_html__('show filters', 'event_espresso') . "</span>
        </button>
        ";
    }


    /**
     * @param string $url Reset URL
     * @return string
     */
    private function generateResetButton(string $url): string
    {
        return '<a class="ee-aria-tooltip button button--icon-only"
            href="' . esc_url_raw($url) . '"
            aria-label="' . esc_attr__('Reset Filters', 'event_espresso') . '"
        >
            <span class="dashicons dashicons-update"></span>
        </a>';
    }
}
