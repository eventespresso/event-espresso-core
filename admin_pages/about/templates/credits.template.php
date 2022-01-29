<?php
$tEEm_members = [
    esc_html__('Founders', 'event_espresso') => [
        'garth-koyle' => [
            'email' => 'garth@eventespresso.com',
            'name'  => 'Garth Koyle',
            'desc'  => esc_html__('Co-Founder', 'event_espresso'),
        ],
    ],
    esc_html__('Core Developers', 'event_espresso') => [
        'brent-christensen' => [
            'email' => 'brent@eventespresso.com',
            'name'  => 'Brent Christensen',
            'desc'  => esc_html__('Lead Developer', 'event_espresso'),
        ],
        'nazar-kolivoshka' => [
            'email' => 'nazar@eventespresso.com',
            'name'  => 'Nazar Kolivoshka',
            'desc'  => esc_html__('Core Developer', 'event_espresso'),
        ],
        'marlon-hario' => [
            'email' => 'marlon@eventespresso.com',
            'name'  => 'Marlon Hario',
            'desc'  => esc_html__('Core Developer', 'event_espresso'),
        ],
        'hossein-rafiei' => [
            'email' => 'hossein@eventespresso.com',
            'name'  => 'Hossein Rafiei',
            'desc'  => esc_html__('Core Developer', 'event_espresso'),
        ],
    ],
    esc_html__('Support Staff', 'event_espresso') => [
        'tony-warwick' => [
            'email' => 'tony@eventespresso.com',
            'name'  => 'Tony Warwick',
            'desc'  => esc_html__('Support', 'event_espresso'),
        ],
        'lorenzo-caum' => [
            'email' => 'lorenzo@eventespresso.com',
            'name'  => 'Lorenzo Caum',
            'desc'  => esc_html__('Sales & Support', 'event_espresso'),
        ],
        'janice-gutierrez' => [
            'email' => 'janice@eventespresso.com',
            'name'  => 'Janice Gutierrez',
            'desc'  => esc_html__('Support', 'event_espresso'),
        ],
        'chinny-love-verana' => [
            'email' => 'chinny@eventespresso.com',
            'name'  => 'Chinny Love Verana',
            'desc'  => esc_html__('Sales & Support', 'event_espresso'),
        ],
    ],
];
?>

<p class="about-description">
    <?php esc_html_e(
        'Event Espresso is created by an international team of passionate individuals with a drive to empower your events!',
        'event_espresso'
    ); ?>
</p>
<?php
foreach ($tEEm_members as $tEEm => $members) {
    echo '
<h3 class="wp-people-group">' . $tEEm .'</h3>
<ul class="ee-card-grid ee-card-grid-4-cols ee-credits-tEEm" id="' . sanitize_key($tEEm) .'">';
    foreach ($members as $id => $person) {
        echo espressoPerson($id, $person['email'], $person['name'], $person['desc']);
    }
    echo '
</ul>';
}
?>
<h3 class="wp-people-group"><?php esc_html_e('Contributor Recognition', 'event_espresso'); ?></h3>
<p class="description">
    <?php
    printf(
        esc_html__(
            'For every major release we want to recognize the people who contributed to the release via a GitHub pull request. Want to see your name listed here? %sWhen you submit a pull request that gets included in a major release%s, we\'ll add your name here linked to your GitHub profile.',
            'event_espresso'
        ),
        '<a href="https://github.com/eventespresso/event-espresso-core" title="Contribute to Event Espresso by making a pull request via GitHub" target="_blank">',
        '</a>'
    );
    ?>
</p>
<p class="wp-credits-list">
<ul>
    <li><a href="https://github.com/Veraxus" target='_blank'>Matt Van Andel</a></li>
    <li><a href="https://github.com/jonathan-dejong" target='_blank'>Jonathan de Jong</a></li>
    <li><a href="https://github.com/richardtape" target='_blank'>Richard Tape</a></li>
    <li><a href="https://github.com/robert-osborne" target='_blank'>Robert Osborne</a></li>
    <li><a href="https://github.com/rgunawans" target='_blank'>Robby Gunawan Sutanto</a></li>
</ul>

</p>
<h3 class="wp-people-group"><?php esc_html_e('External Libraries', 'event_espresso'); ?></h3>
<p class="description">
    <?php
    printf(
        esc_html__(
            'Along with the libraries %sincluded with WordPress%s, Event Espresso utilizes the following third party libraries:',
            'event_espresso'
        ),
        '<a href="credits.php">',
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

<?php
function espressoPerson($id, $email, $name, $desc): string
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
function esp_gravatar_profile($email)
{
    return esc_url_raw('https://www.gravatar.com/' . md5($email));
}

function esp_gravatar_image($email, $name)
{
    $email = md5($email);
    $name = esc_attr($name);
    $url = esc_url_raw("https://0.gravatar.com/avatar/{$email}?s=60");
    return "<img src='{$url}' class='gravatar' alt='{$name}'/>";
}
