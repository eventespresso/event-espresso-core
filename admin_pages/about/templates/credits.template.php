<p class="about-description">
    <?php esc_html_e(
        'Event Espresso is created by an international team of passionate individuals with a drive to empower your events!',
        'event_espresso'
    ); ?>
</p>
<h3 class="wp-people-group"><?php esc_html_e('Founders', 'event_espresso'); ?></h3>
<ul class="wp-people-group" id="ee-people-group-owners">
    <li class="wp-person" id="ee-person-sshoultes">
        <a href="<?php esp_gravatar_profile('seth@eventespresso.com'); ?>" target="_blank">
            <?php esp_gravatar_image('seth@eventespresso.com', 'Seth Shoultes'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('seth@eventespresso.com'); ?>" target='_blank'>
            Seth Shoultes
        </a>
        <span class="title"><?php esc_html_e('Co-Founder', 'event_espresso'); ?></span>
    </li>
    <li class="wp-person" id="ee-person-gkoyle">
        <a href="<?php esp_gravatar_profile('garth@eventespresso.com'); ?>" target='_blank'>
            <?php esp_gravatar_image('garth@eventespresso.com', 'Garth Koyle'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('garth@eventespresso.com'); ?>" target='_blank'>
            Garth Koyle
        </a>
        <span class="title"><?php esc_html_e('Co-Founder', 'event_espresso'); ?></span>
    </li>
</ul>
<h3 class="wp-people-group"><?php esc_html_e('Core Developers', 'event_espresso'); ?></h3>
<ul class="wp-people-group" id="ee-people-group-core-developers">
    <li class="wp-person" id="ee-person-bchristensen">
        <a href="<?php esp_gravatar_profile('brent@eventespresso.com'); ?>" target='_blank'>
            <?php esp_gravatar_image('brent@eventespresso.com', 'Brent Christensen'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('brent@eventespresso.com'); ?>" target='_blank'>
            Brent Christensen
        </a>
        <span class="title"><?php esc_html_e('Lead Developer', 'event_espresso'); ?></span>
    </li>
    <li class="wp-person" id="ee-person-nkolivoshka">
        <a href="<?php esp_gravatar_profile('nazar@eventespresso.com'); ?>" target='_blank'>
            <?php esp_gravatar_image('nazar@eventespresso.com', 'Nazar Kolivoshka'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('nazar@eventespresso.com'); ?>" target='_blank'>
            Nazar Kolivoshka
        </a>
        <span class="title"><?php esc_html_e('Core Developer', 'event_espresso'); ?></span>
    </li>
    <li class='wp-person' id='ee-person-mwani'>
        <a href="<?php
        esp_gravatar_profile('manzoor@eventespresso.com'); ?>" target='_blank'>
            <?php esp_gravatar_image('manzoor@eventespresso.com', 'Manzoor Ahmad Wani'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('manzoor@eventespresso.com'); ?>" target='_blank'>
            Manzoor Ahmad Wani
        </a>
        <span class="title"><?php esc_html_e('Core Developer', 'event_espresso'); ?></span>
    </li>
</ul>
<h3 class="wp-people-group"><?php esc_html_e('Support Staff', 'event_espresso'); ?></h3>
<ul class="wp-people-group" id="ee-people-group-support-staff">
    <li class="wp-person" id="ee-person-jfeck">
        <a href="<?php esp_gravatar_profile('josh@eventespresso.com'); ?>" target='_blank'>
            <?php esp_gravatar_image('josh@eventespresso.com', 'Josh Feck'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('josh@eventespresso.com'); ?>" target='_blank'>
            Josh Feck
        </a>
    </li>
    <li class="wp-person" id="ee-person-twarwick">
        <a href="<?php esp_gravatar_profile('tony@eventespresso.com'); ?>" target='_blank'>
            <?php esp_gravatar_image('tony@eventespresso.com', 'Tony Warwick'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('tony@eventespresso.com'); ?>" target='_blank'>
            Tony Warwick
        </a>
    </li>
    <li class="wp-person" id="ee-person-lcaum">
        <a href="<?php esp_gravatar_profile('lorenzo@eventespresso.com'); ?>" target='_blank'>
            <?php esp_gravatar_image('lorenzo@eventespresso.com', 'Lorenzo Caum'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('lorenzo@eventespresso.com'); ?>" target='_blank'>
            Lorenzo Caum
        </a>
    </li>

</ul>
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
function esp_gravatar_profile($email)
{
    echo esc_url_raw('https://www.gravatar.com/' . md5($email));
}

function esp_gravatar_image($email, $name)
{
    $email = md5($email);
    $name = esc_attr($name);
    $url = esc_url_raw("https://0.gravatar.com/avatar/{$email}?s=60");
    echo "<img src='{$url}' class='gravatar' alt='{$name}'/>";
}
