<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

$tEEm_members = [
    __('Founders', 'event_espresso') => [
        'garth-koyle' => [
            'email' => 'garth@eventespresso.com',
            'name'  => 'Garth Koyle',
            'desc'  => __('Co-Founder', 'event_espresso'),
        ],
    ],
    __('Core Developers', 'event_espresso') => [
        'brent-christensen' => [
            'email' => 'brent@eventespresso.com',
            'name'  => 'Brent Christensen',
            'desc'  => __('Lead Developer', 'event_espresso'),
        ],
        'nazar-kolivoshka' => [
            'email' => 'nazar@eventespresso.com',
            'name'  => 'Nazar Kolivoshka',
            'desc'  => __('Core Developer', 'event_espresso'),
        ],
        'hossein-rafiei' => [
            'email' => 'hossein@eventespresso.com',
            'name'  => 'Hossein Rafiei',
            'desc'  => __('Core Developer', 'event_espresso'),
        ],
        'majid-abbasi' => [
            'email' => 'majid@eventespresso.com',
            'name'  => 'Majid Abbasi',
            'desc'  => __('Core Developer', 'event_espresso'),
        ],
    ],
    __('Support Staff', 'event_espresso') => [
        'tony-warwick' => [
            'email' => 'tony@eventespresso.com',
            'name'  => 'Tony Warwick',
            'desc'  => __('Support', 'event_espresso'),
        ],
        'lorenzo-caum' => [
            'email' => 'lorenzo@eventespresso.com',
            'name'  => 'Lorenzo Caum',
            'desc'  => __('Sales & Support', 'event_espresso'),
        ],
        'janice-gutierrez' => [
            'email' => 'janice@eventespresso.com',
            'name'  => 'Janice Gutierrez',
            'desc'  => __('Support', 'event_espresso'),
        ],
        'chinny-love-verana' => [
            'email' => 'chinny@eventespresso.com',
            'name'  => 'Chinny Love Verana',
            'desc'  => __('Sales & Support', 'event_espresso'),
        ],
        'sam' => [
            'email' => 'sam@eventespresso.com',
            'name'  => 'Sam',
            'desc'  => __('Sales & Support', 'event_espresso'),
        ],
    ],
];

function espressoPerson(string $id, string $email, string $name, string $desc): string
{
    return '
    <li class="ee-card ee-credits-person" id="ee-person-' . $id . '">
        <a href="' . esp_gravatar_profile($email) . '" target="_blank">
            ' . esp_gravatar_image($email, $name) . '
        </a>
        <p>
            <a class="web" href="' . esp_gravatar_profile($email) . '" target="_blank">' . $name . '</a>
            <span class="title">' . $desc . '</span>
        </p>
    </li>';
}

function esp_gravatar_profile(string $email): string
{
    return esc_url_raw('https://www.gravatar.com/' . md5($email));
}

function esp_gravatar_image(string $email, string $name): string
{
    $email = md5($email);
    $name  = esc_attr($name);
    $url   = esc_url_raw("https://0.gravatar.com/avatar/{$email}?s=60");
    return "<img src='{$url}' class='gravatar' alt='{$name}'/>";
}


?>

<style>
    .wp-credits-list li::marker {
        content: '🔹 ';
    }
</style>

<div class='ee-admin-container'>
    <div class='padding'>

        <h4>
            <?php esc_html_e(
                'Event Espresso is created by an international team of passionate individuals with a drive to empower your events!',
                'event_espresso'
            ); ?>
        </h4>

        <div class='ee-credits-tEEm'>
            <?php foreach ($tEEm_members as $tEEm => $members) { ?>
            <h3 class="wp-people-group"><?php echo esc_html($tEEm); ?></h3>
            <ul class="ee-card-grid ee-card-grid-4-cols" id="' . sanitize_key($tEEm) . '">
                <?php foreach ($members as $id => $person) {
                    echo wp_kses(
                        espressoPerson($id, $person['email'], $person['name'], $person['desc']),
                        AllowedTags::getAllowedTags()
                    );
                }
                ?>
            </ul>
            <?php } ?>
        </div>

        <h3 class="wp-people-group"><?php esc_html_e('Contributor Recognition', 'event_espresso'); ?></h3>
        <p class="description">
            <?php
            printf(
                esc_html__(
                    'For every major release we want to recognize the people who contributed to the release via a GitHub pull request. Want to see your name listed here? %sWhen you submit a pull request that gets included in a major release%s, we\'ll add your name here linked to your GitHub profile.',
                    'event_espresso'
                ),
                '<a href="https://github.com/eventespresso/event-espresso-core" aria-label="Contribute to Event Espresso by making a pull request via GitHub" target="_blank">',
                '</a>'
            );
            ?>
        </p>

        <ul class='wp-credits-list'>
            <li><a href="https://github.com/Veraxus" target='_blank'>Matt Van Andel</a></li>
            <li><a href="https://github.com/jonathan-dejong" target='_blank'>Jonathan de Jong</a></li>
            <li><a href="https://github.com/richardtape" target='_blank'>Richard Tape</a></li>
            <li><a href="https://github.com/robert-osborne" target='_blank'>Robert Osborne</a></li>
            <li><a href="https://github.com/rgunawans" target='_blank'>Robby Gunawan Sutanto</a></li>
        </ul>

        <h3 class="wp-people-group"><?php esc_html_e('External Libraries', 'event_espresso'); ?></h3>
        <p class="description">
            <?php
            printf(
                esc_html__(
                    'Along with the libraries %sincluded with WordPress%s, Event Espresso utilizes the following third party libraries:',
                    'event_espresso'
                ),
                '<a href="' . admin_url('credits.php') . '">',
                '</a>'
            );
            ?>
        </p>
<p class="wp-credits-list">
    <a href="https://openexchangerates.github.io/accounting.js/" target='_blank'>accounting.js</a>,
    <a href="https://dompdf.github.io/" target='_blank'>dompdf</a>,
    <a href="https://zurb.com/playground/jquery-joyride-feature-tour-plugin" target='_blank'>joyride2</a>,
    <a href="https://kint-php.github.io/kint/" target='_blank'>Kint</a>,
    <a href="https://momentjs.com/" target='_blank'>Moment.js</a>,
    <a href="https://github.com/qTip2/qTip2" target='_blank'>qTip2</a>,
    <a href="https://trentrichardson.com/examples/timepicker/" target='_blank'>jQuery UI Timepicker</a>,
    <a href="https://github.com/jhogendorn/jQuery-serializeFullArray" target='_blank'>SerializeFullArray</a>,
    <a href="https://github.com/jzaefferer/jquery-validation" target='_blank'>jQuery Validation</a>
</p>

    </div>
</div>
