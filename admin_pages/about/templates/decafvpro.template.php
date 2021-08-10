<p><?php
    echo esc_html(sprintf(
        __(
            'We offer a free version of Event Espresso 4 called Decaf which is a good fit for basic events. Need more features like custom registration forms and advanced email notifications? %sUpgrade to Event Espresso 4 (Regular)%s.',
            'event_espresso'
        ),
        '<a href="https://eventespresso.com/pricing/?ee_ver=ee4&utm_source=wordpress_org&amp;utm_medium=link&amp;utm_campaign=decaf_about_page&amp;utm_content=Decaf+vs+Regular">',
        '</a>'
    )); ?><br>

    <?php
    $features = array(
        'pricing-options'        => array(
            'label'   => esc_html__('Handle multiple dates and pricing options', 'event_espresso'),
            'class'   => 'alternate',
        ),
        'custom-registration'    => array(
            'label'   => esc_html__('Create custom registration forms', 'event_espresso'),
            'class'   => 'none',
        ),
        'advanced-notifications' => array(
            'label'   => esc_html__('Customize advanced email notifications', 'event_espresso'),
            'class'   => 'alternate',
        ),
        'manage-taxes'           => array(
            'label'   => esc_html__('Manage taxes', 'event_espresso'),
            'class'   => 'none',
        ),
        'typography'             => array(
            'label'   => esc_html__('Additional payment methods available', 'event_espresso'),
            'class'   => 'alternate',
        ),
        'add-on-compatibility'   => array(
            'label'   => esc_html__('Compatibility with add-ons', 'event_espresso'),
            'class'   => 'none',
        ),
        'best-support'           => array(
            'label'   => esc_html__('Best in class support', 'event_espresso'),
            'class'   => 'alternate',
        ),
    );
    ?>
<div class="featured-section features">
    <table class="decaf-regular-table">
        <thead>
        <tr>
            <th></th>
            <th><?php esc_html_e('Decaf', 'event_espresso') ?></th>
            <th><?php esc_html_e('Regular', 'event_espresso') ?></th>
        </tr>
        </thead>
        <tbody>
        <?php
        foreach ($features as $feature) : ?>
            <tr class="<?php echo esc_attr($feature['class']); ?>">
                <td class="feature">
                    <h3>
                        <?php echo $feature['label']; // already escaped ?>
                    </h3>
                </td>
                <td class="decaf-feature">
                    <span class="dashicons dashicons-no-alt"></span>
                </td>
                <td class="regular-feature">
                    <span class='dashicons dashicons-yes'></span>
                </td>
            </tr>
        <?php endforeach; ?>
        <tr>
            <td></td>
            <td colspan="2" class="text-right">
                <a class='button button-primary button-hero'
                   href="https://eventespresso.com/pricing/?utm_source=wordpress_org&amp;utm_medium=link&amp;utm_campaign=decaf_about_page&amp;utm_content=Decaf+vs+Regular"
                   target="_blank"
                >
                    <span class="dashicons dashicons-cart"></span>
                    <?php esc_html_e('Upgrade Now!', 'event_espresso') ?>
                </a>
            </td>
        </tr>
        </tbody>
    </table>
</div>