<?php

use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\sanitizers\AllowedTags;
use EventEspresso\widgets\EspressoWidget;

/**
 * Upcoming Events Widget
 *
 * @package     Event Espresso
 * @subpackage  /widgets/upcoming_events/
 * @author      Brent Christensen
 */
class EEW_Upcoming_Events extends EspressoWidget
{
    private bool $date_range = false;

    private bool $show_dates = true;

    private bool $show_desc = true;

    private int $date_limit = 2;

    private int $limit = 10;

    private int $show_expired = 0;

    private string $events_category = '';

    private string $image_size = 'medium';

    private string $order = 'ASC';

    private string $title = '';


    /**
     * Register widget with WordPress.
     */
    public function __construct()
    {
        parent::__construct(
            esc_html__('Event Espresso Upcoming Events', 'event_espresso'),
            ['description' => esc_html__('A widget to display your upcoming events.', 'event_espresso')]
        );
    }


    /**
     * Back-end widget form.
     *
     * @param array $instance Previously saved values from database.
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @see WP_Widget::form()
     */
    public function form($instance)
    {
        EE_Registry::instance()->load_class('Question_Option', [], false, false, true);
        // Set up some default widget settings.
        $defaults = [
            'category_name'   => '',
            'date_limit'      => 2,
            'date_range'      => false,
            'image_size'      => 'medium',
            'limit'           => 10,
            'show_dates'      => true,
            'show_desc'       => true,
            'show_everywhere' => false,
            'show_expired'    => 0,
            'sort'            => 'ASC',
            'title'           => esc_html__('Upcoming Events', 'event_espresso'),
        ];

        $instance = wp_parse_args((array) $instance, $defaults);
        // don't add HTML labels for EE_Form_Fields generated inputs
        add_filter('FHEE__EEH_Form_Fields__label_html', '__return_empty_string');
        $yes_no_values = [
            EE_Question_Option::new_instance(['QSO_value' => false, 'QSO_desc' => esc_html__('No', 'event_espresso')]),
            EE_Question_Option::new_instance(['QSO_value' => true, 'QSO_desc' => esc_html__('Yes', 'event_espresso')]),
        ];
        $sort_values   = [
            EE_Question_Option::new_instance(['QSO_value' => 'ASC', 'QSO_desc' => esc_html__('ASC', 'event_espresso')]),
            EE_Question_Option::new_instance(
                ['QSO_value' => 'DESC', 'QSO_desc' => esc_html__('DESC', 'event_espresso')]
            ),
        ];

        ?>
        <!-- Widget Title: Text Input -->
        <p>
            <label for="<?php echo esc_attr($this->fieldID('title')); ?>">
                <?php esc_html_e('Title:', 'event_espresso'); ?>
            </label>
            <input id="<?php echo esc_attr($this->fieldID('title')); ?>"
                   class="widefat"
                   name="<?php echo esc_attr($this->fieldName('title')); ?>"
                   value="<?php echo esc_attr($instance['title']); ?>"
                   type="text"
            />
        </p>
        <p>
            <label for="<?php echo esc_attr($this->fieldID('category_name')); ?>">
                <?php esc_html_e('Event Category:', 'event_espresso'); ?>
            </label>
            <?php $this->eventCategoriesSelector($instance); ?>
        </p>
        <p>
            <label for="<?php echo esc_attr($this->fieldID('limit')); ?>">
                <?php esc_html_e('Number of Events to Display:', 'event_espresso'); ?>
            </label>
            <input id="<?php echo esc_attr($this->fieldID('limit')); ?>"
                   name="<?php echo esc_attr($this->fieldName('limit')); ?>"
                   value="<?php echo esc_attr($instance['limit']); ?>"
                   size="3"
                   type="text"
            />
        </p>
        <p>
            <label for="<?php echo esc_attr($this->fieldID('show_expired')); ?>">
                <?php esc_html_e('Show Expired Events:', 'event_espresso'); ?>
            </label>
            <?php
            $show_expired_options = [
                EE_Question_Option::new_instance(['QSO_value' => 0, 'QSO_desc' => esc_html__('No', 'event_espresso')]),
                EE_Question_Option::new_instance(['QSO_value' => 1, 'QSO_desc' => esc_html__('Yes', 'event_espresso')]),
                EE_Question_Option::new_instance(
                    ['QSO_value' => 2, 'QSO_desc' => esc_html__('Show Only Expired', 'event_espresso')]
                ),
            ];
            echo wp_kses(
                EEH_Form_Fields::select(
                    esc_html__('Show Expired Events:', 'event_espresso'),
                    $instance['show_expired'],
                    $show_expired_options,
                    $this->fieldName('show_expired'),
                    $this->fieldID('show_expired')
                ),
                AllowedTags::getWithFormTags()
            );
            ?>
        </p>
        <p>
            <label for="<?php echo esc_attr($this->fieldID('sort')); ?>">
                <?php esc_html_e('Sort Events:', 'event_espresso'); ?>
            </label>
            <?php
            echo wp_kses(
                EEH_Form_Fields::select(
                    esc_html__('Sort Events:', 'event_espresso'),
                    $instance['sort'],
                    $sort_values,
                    $this->fieldName('sort'),
                    $this->fieldID('sort')
                ),
                AllowedTags::getWithFormTags()
            );
            ?>
        </p>
        <p>
            <label for="<?php echo esc_attr($this->fieldID('image_size')); ?>">
                <?php esc_html_e('Image Size:', 'event_espresso'); ?>
            </label>
            <?php $this->imageSizeSelector($instance); ?>

        </p>
        <p>
            <label for="<?php echo esc_attr($this->fieldID('show_desc')); ?>">
                <?php esc_html_e('Show Description:', 'event_espresso'); ?>
            </label>
            <?php
            echo wp_kses(
                EEH_Form_Fields::select(
                    esc_html__('Show Description:', 'event_espresso'),
                    $instance['show_desc'],
                    $yes_no_values,
                    $this->fieldName('show_desc'),
                    $this->fieldID('show_desc')
                ),
                AllowedTags::getWithFormTags()
            );
            ?>
        </p>
        <p>
            <label for="<?php echo esc_attr($this->fieldID('show_dates')); ?>">
                <?php esc_html_e('Show Dates:', 'event_espresso'); ?>
            </label>
            <?php
            echo wp_kses(
                EEH_Form_Fields::select(
                    esc_html__('Show Dates:', 'event_espresso'),
                    $instance['show_dates'],
                    $yes_no_values,
                    $this->fieldName('show_dates'),
                    $this->fieldID('show_dates')
                ),
                AllowedTags::getWithFormTags()
            );
            ?>
        </p>
        <p>
            <label for="<?php echo esc_attr($this->fieldID('show_everywhere')); ?>">
                <?php esc_html_e('Show on all Pages:', 'event_espresso'); ?>
            </label>
            <?php
            echo wp_kses(
                EEH_Form_Fields::select(
                    esc_html__('Show on all Pages:', 'event_espresso'),
                    $instance['show_everywhere'],
                    $yes_no_values,
                    $this->fieldName('show_everywhere'),
                    $this->fieldID('show_everywhere')
                ),
                AllowedTags::getWithFormTags()
            );
            ?>
        </p>
        <p>
            <label for="<?php echo esc_attr($this->fieldID('date_limit')); ?>">
                <?php esc_html_e('Number of Dates to Display:', 'event_espresso'); ?>
            </label>
            <input id="<?php echo esc_attr($this->fieldID('date_limit')); ?>"
                   name="<?php echo esc_attr($this->fieldName('date_limit')); ?>"
                   value="<?php echo esc_attr($instance['date_limit']); ?>"
                   size="3"
                   type="number"
            />
        </p>
        <p>
            <label for="<?php echo esc_attr($this->fieldID('date_range')); ?>">
                <?php esc_html_e('Show Date Range:', 'event_espresso'); ?>
            </label>
            <?php
            echo wp_kses(
                EEH_Form_Fields::select(
                    esc_html__('Show Date Range:', 'event_espresso'),
                    $instance['date_range'],
                    $yes_no_values,
                    $this->fieldName('date_range'),
                    $this->fieldID('date_range')
                ),
                AllowedTags::getWithFormTags()
            );
            ?>
            <span class="description">
                <br/>
                <?php esc_html_e(
                    'This setting will replace the list of dates in the widget.',
                    'event_espresso'
                ); ?>
            </span>
        </p>
        <?php
    }


    /**
     * Sanitize widget form values as they are saved.
     *
     * @param array $new_instance Values just sent to be saved.
     * @param array $old_instance Previously saved values from database.
     *
     * @return array Updated safe values to be saved.
     * @see WP_Widget::update()
     *
     */
    public function update($new_instance, $old_instance)
    {
        /** @var RequestInterface $request */
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);

        if (! $request->isWordPressApi() || ! is_user_logged_in()) {
            return $old_instance;
        }

        $instance                    = $old_instance;
        $instance['title']           = ! empty($new_instance['title'])
            ? strip_tags((string) $new_instance['title'])
            : '';
        $instance['category_name']   = sanitize_text_field($new_instance['category_name'] ?? '');
        $instance['show_expired']    = absint($new_instance['show_expired'] ?? 0);
        $instance['limit']           = absint($new_instance['limit'] ?? 10);
        $instance['sort']            = isset($new_instance['sort']) && $new_instance['sort'] === 'DESC'
            ? 'DESC'
            : 'ASC';
        $instance['image_size']      = sanitize_text_field($new_instance['image_size'] ?? 'medium');
        $instance['show_desc']       = filter_var(($new_instance['show_desc'] ?? false), FILTER_VALIDATE_BOOLEAN);
        $instance['show_dates']      = filter_var(($new_instance['show_dates'] ?? false), FILTER_VALIDATE_BOOLEAN);
        $instance['show_everywhere'] = filter_var(($new_instance['show_everywhere'] ?? false), FILTER_VALIDATE_BOOLEAN);
        $instance['date_limit']      = absint($new_instance['date_limit'] ?? 10);
        $instance['date_range']      = filter_var(($new_instance['date_range'] ?? false), FILTER_VALIDATE_BOOLEAN);
        return $instance;
    }


    /**
     * Front-end display of widget.
     *
     * @param array $args     Widget arguments.
     * @param array $instance Saved values from database.
     * @throws EE_Error
     * @throws ReflectionException
     * @see WP_Widget::widget()
     *
     */
    public function widget($args, $instance)
    {
        global $post;
        // make sure there is some kinda post object
        if ($post instanceof WP_Post) {
            $before_widget = '';
            $before_title  = '';
            $after_title   = '';
            $after_widget  = '';
            // but NOT an events archives page, cuz that would be like two event lists on the same page
            $show_everywhere = ! isset($instance['show_everywhere']) || absint($instance['show_everywhere']);
            if ($show_everywhere || ! ($post->post_type == EspressoPostType::EVENTS && is_archive())) {
                // let's use some of the event helper functions'
                // make separate vars out of attributes
                extract($args);

                // grab widget settings
                $this->parseWidgetSettings($instance);
                $title = $this->widgetTitle();

                // Before widget (defined by themes).
                echo wp_kses($before_widget, AllowedTags::getAllowedTags());
                // Display the widget title if one was input (before and after defined by themes).
                if (! empty($title)) {
                    echo wp_kses($before_title . $title . $after_title, AllowedTags::getAllowedTags());
                }
                echo wp_kses($this->widgetContent($post), AllowedTags::getWithFormTags());
                // After widget (defined by themes).
                echo wp_kses($after_widget, AllowedTags::getAllowedTags());
            }
        }
    }


    /**
     * make_the_title_a_link
     * callback for widget_title filter
     *
     * @param string $title
     * @return string
     */
    public function make_the_title_a_link(string $title): string
    {
        return '<a href="' . EEH_Event_View::event_archive_url() . '">' . $title . '</a>';
    }


    /**
     * @param string $field_name
     * @return string
     * @since   4.10.14.p
     */
    public function fieldID(string $field_name): string
    {
        return parent::get_field_id($field_name);
    }


    /**
     * @param string $field_name
     * @return string
     * @since   4.10.14.p
     */
    public function fieldName(string $field_name): string
    {
        return parent::get_field_name($field_name);
    }


    /**
     * @param array $instance
     * @throws EE_Error
     * @throws ReflectionException
     * @since   4.10.14.p
     */
    private function eventCategoriesSelector(array $instance)
    {
        $event_categories = [];
        $categories       = EEM_Term::instance()->get_all_ee_categories(true);
        if ($categories) {
            foreach ($categories as $category) {
                if ($category instanceof EE_Term) {
                    $event_categories[] =
                        EE_Question_Option::new_instance(
                            [
                                'QSO_value' => $category->get('slug'),
                                'QSO_desc'  => $category->get('name'),
                            ]
                        );
                }
            }
        }
        array_unshift(
            $event_categories,
            EE_Question_Option::new_instance(
                [
                    'QSO_value' => '',
                    'QSO_desc'  => esc_html__(' - display all - ', 'event_espresso'),
                ]
            )
        );
        echo wp_kses(
            EEH_Form_Fields::select(
                esc_html__('Event Category:', 'event_espresso'),
                $instance['category_name'],
                $event_categories,
                $this->fieldName('category_name'),
                $this->fieldID('category_name')
            ),
            AllowedTags::getWithFormTags()
        );
    }


    /**
     * @param array $instance
     * @since   4.10.14.p
     */
    private function imageSizeSelector(array $instance)
    {
        $image_sizes = [];
        $sizes       = get_intermediate_image_sizes();
        if ($sizes) {
            // loop thru images and create option objects out of them
            foreach ($sizes as $image_size) {
                $image_size = trim($image_size);
                // no big images plz
                if (! in_array($image_size, ['large', 'post-thumbnail'])) {
                    $image_sizes[] =
                        EE_Question_Option::new_instance(['QSO_value' => $image_size, 'QSO_desc' => $image_size]);
                }
            }
            $image_sizes[] =
                EE_Question_Option::new_instance(
                    ['QSO_value' => 'none', 'QSO_desc' => esc_html__('don\'t show images', 'event_espresso')]
                );
        }
        echo wp_kses(
            EEH_Form_Fields::select(
                esc_html__('Image Size:', 'event_espresso'),
                $instance['image_size'],
                $image_sizes,
                $this->fieldName('image_size'),
                $this->fieldID('image_size')
            ),
            AllowedTags::getWithFormTags()
        );
    }


    /**
     * @param array $instance
     * @since   4.10.14.p
     */
    private function parseWidgetSettings(array $instance)
    {
        $this->title           = ! empty($instance['title']) ? $instance['title'] : '';
        $this->events_category = ! empty($instance['category_name'])
            ? $instance['category_name']
            : '';
        $this->show_everywhere = isset($instance['show_everywhere'])
            ? filter_var($instance['show_everywhere'], FILTER_VALIDATE_BOOLEAN)
            : false;
        $this->show_expired    = isset($instance['show_expired']) ? absint($instance['show_expired']) : 0;
        $this->image_size      = ! empty($instance['image_size'])
            ? $instance['image_size']
            : 'medium';
        $this->show_desc       = ! isset($instance['show_desc'])
            || filter_var($instance['show_desc'], FILTER_VALIDATE_BOOLEAN);
        $this->show_dates      = ! isset($instance['show_dates'])
            || filter_var($instance['show_dates'], FILTER_VALIDATE_BOOLEAN);
        $this->date_limit      = ! empty($instance['date_limit'])
            ? $instance['date_limit']
            : 2;
        $this->date_range      = ! isset($instance['date_range'])
            || filter_var($instance['date_range'], FILTER_VALIDATE_BOOLEAN);
        $this->limit           = isset($instance['limit']) ? absint($instance['limit']) : 10;
        $this->order           = isset($instance['sort']) && $instance['sort'] === 'DESC'
            ? 'DESC'
            : 'ASC';
    }


    /**
     * @return mixed|void
     * @since   4.10.14.p
     */
    private function widgetTitle()
    {
        // add function to make the title a link
        add_filter('widget_title', [$this, 'make_the_title_a_link'], 15);
        // filter the title
        $title = apply_filters('widget_title', $this->title);
        // remove the function from the filter, so it does not affect other widgets
        remove_filter('widget_title', [$this, 'make_the_title_a_link'], 15);
        return $title;
    }


    /**
     * @param WP_Post $post
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since   4.10.14.p
     */
    private function widgetContent(WP_Post $post): string
    {
        // run the query
        $events = $this->getUpcomingEvents();
        if (empty($events)) {
            return '';
        }
        $list_items = '';
        foreach ($events as $event) {
            if ($event instanceof EE_Event && (! is_single() || $post->ID != $event->ID())) {
                $event_url  = $this->eventUrl($event);
                $list_items .= '
                <li id="ee-upcoming-events-widget-li-' . absint($event->ID()) . '"
                    class="ee-upcoming-events-widget-li"
                >
                    <h5 class="ee-upcoming-events-widget-title-h5">
                        <a class="ee-widget-event-name-a' . $this->linkClass($event) . '" href="' . $event_url . '">
                            ' . esc_html($event->name()) . '
                        </a>
                    </h5>
                    ' . $this->eventWidgetContent($event, $event_url) . '
                </li>';
            }
        }
        return '
            <ul class="ee-upcoming-events-widget-ul">
                ' . $list_items . '
            </ul>';
    }


    /**
     * @param EE_Event $event
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since   4.10.14.p
     */
    private function eventUrl(EE_Event $event): string
    {
        return esc_url_raw(
            (string) apply_filters(
                'FHEE_EEW_Upcoming_Events__widget__event_url',
                $event->get_permalink(),
                $event
            )
        );
    }


    /**
     * @return EE_Base_Class[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function getUpcomingEvents(): array
    {
        return EEM_Event::instance()->get_all(
            [
                $this->queryWhereParams(),
                'limit'    => '0,' . $this->limit,
                'order_by' => 'Datetime.DTT_EVT_start',
                'order'    => $this->order,
                'group_by' => 'EVT_ID',
            ]
        );
    }


    /**
     * @return mixed|void
     * @throws EE_Error
     * @throws ReflectionException
     * @since   4.10.14.p
     */
    private function queryWhereParams()
    {
        // start to build our where clause
        $where = [
            'status' => ['IN', ['publish', 'sold_out']],
        ];
        // add category
        if ($this->events_category) {
            $where['Term_Taxonomy.taxonomy']  = 'espresso_event_categories';
            $where['Term_Taxonomy.Term.slug'] = $this->events_category;
        }
        // if NOT expired then we want events that start today or in the future
        // if NOT show expired then we want events that start today or in the future
        if ($this->show_expired === 0) {
            $where['Datetime.DTT_EVT_end'] = [
                '>=',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_end'),
            ];
        }
        // if show ONLY expired we want events that ended prior to today
        if ($this->show_expired === 2) {
            $where['Datetime.DTT_EVT_end'] = [
                '<=',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start'),
            ];
        }
        // allow $where to be filtered
        return apply_filters(
            'FHEE__EEW_Upcoming_Events__widget__where',
            $where,
            $this->events_category,
            $this->show_expired
        );
    }


    /**
     * @param EE_Event $event
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since   4.10.14.p
     */
    private function linkClass(EE_Event $event): string
    {
        // how big is the event name ?
        $name_length = strlen($event->name());
        switch ($name_length) {
            case $name_length > 70:
                return ' three-line';
            case $name_length > 35:
                return ' two-line';
        }
        return ' one-line';
    }


    /**
     * @param EE_Event $event
     * @param string   $event_url
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since   4.10.14.p
     */
    private function eventWidgetContent(EE_Event $event, string $event_url = ''): string
    {
        if (post_password_required($event->ID())) {
            return (string) apply_filters(
                'FHEE_EEW_Upcoming_Events__widget__password_form',
                get_the_password_form($event->ID()),
                $event
            );
        }

        $content = '';
        if (has_post_thumbnail($event->ID()) && $this->image_size != 'none') {
            $content .= '
                <div class="ee-upcoming-events-widget-img-dv">
                    <a class="ee-upcoming-events-widget-img" href="' . $event_url . '">
                        ' . get_the_post_thumbnail($event->ID(), $this->image_size) . '
                    </a>
                </div>';
        }

        if ($this->show_dates) {
            $content .= $this->eventDates($event);
        }

        if ($this->show_desc) {
            $allowedtags = AllowedTags::getAllowedTags();
            $desc        = $event->short_description(25);
            $content     .= $desc ? '<p style="margin-top: .5em">' . wp_kses($desc, $allowedtags) . '</p>' : '';
        }

        return $content;
    }


    /**
     * @param EE_Event $event
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since   4.10.14.p
     */
    private function eventDates(EE_Event $event): string
    {
        $date_format        = apply_filters(
            'FHEE__espresso_event_date_range__date_format',
            get_option('date_format')
        );
        $time_format        = apply_filters(
            'FHEE__espresso_event_date_range__time_format',
            get_option('time_format')
        );
        $single_date_format = apply_filters(
            'FHEE__espresso_event_date_range__single_date_format',
            get_option('date_format')
        );
        $single_time_format = apply_filters(
            'FHEE__espresso_event_date_range__single_time_format',
            get_option('time_format')
        );
        if ($this->date_range) {
            return espresso_event_date_range(
                $date_format,
                $time_format,
                $single_date_format,
                $single_time_format,
                $event->ID(),
                false
            );
        }
        return espresso_list_of_event_dates(
            $event->ID(),
            $date_format,
            $time_format,
            false,
            null,
            true,
            true,
            $this->date_limit
        );
    }
}
