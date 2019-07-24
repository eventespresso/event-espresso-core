<p class="about-description">
    <?php esc_html_e(
        'Event Espresso is created by an international team of passionate individuals with a drive to empower your events!',
        'event_espresso'
    ); ?></p>
<h3 class="wp-people-group"><?php esc_html_e('Founders', 'event_espresso'); ?></h3>
<ul class="wp-people-group" id="ee-people-group-owners">
    <li class="wp-person" id="ee-person-sshoultes">
        <a href="<?php esp_gravatar_profile('seth@eventespresso.com'); ?>">
            <?php echo esp_gravatar_image('seth@eventespresso.com', 'Seth Shoultes'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('seth@eventespresso.com'); ?>">
            Seth Shoultes
        </a>
        <span class="title"><?php esc_html_e('Co-Founder', 'event_espresso'); ?></span>
    </li>
    <li class="wp-person" id="ee-person-gkoyle">
        <a href="<?php esp_gravatar_profile('garth@eventespresso.com'); ?>">
            <?php echo esp_gravatar_image('garth@eventespresso.com', 'Garth Koyle'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('garth@eventespresso.com'); ?>">
            Garth Koyle
        </a>
        <span class="title"><?php esc_html_e('Co-Founder', 'event_espresso'); ?></span>
    </li>
</ul>
<h3 class="wp-people-group"><?php esc_html_e('Core Developers', 'event_espresso'); ?></h3>
<ul class="wp-people-group" id="ee-people-group-core-developers">
    <li class="wp-person" id="ee-person-bchristensen">
        <a href="<?php esp_gravatar_profile('brent@eventespresso.com'); ?>">
            <?php echo esp_gravatar_image('brent@eventespresso.com', 'Brent Christensen'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('brent@eventespresso.com'); ?>">
            Brent Christensen
        </a>
        <span class="title"><?php esc_html_e('Lead Developer', 'event_espresso'); ?></span>
    </li>
    <li class="wp-person" id="ee-person-mnelson">
        <a href="<?php esp_gravatar_profile('michael@eventespresso.com'); ?>">
            <?php echo esp_gravatar_image('michael@eventespresso.com', 'Michael Nelson'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('michael@eventespresso.com'); ?>">
            Michael Nelson
        </a>
        <span class="title"><?php esc_html_e('Core Developer', 'event_espresso'); ?></span>
    </li>
    <li class="wp-person" id="ee-person-nkolivoshka">
        <a href="<?php esp_gravatar_profile('nazar@eventespresso.com'); ?>">
            <?php echo esp_gravatar_image('nazar@eventespresso.com', 'Nazar Kolivoshka'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('nazar@eventespresso.com'); ?>">
            Nazar Kolivoshka
        </a>
        <span class="title"><?php esc_html_e('Core Developer', 'event_espresso'); ?></span>
    </li>
</ul>
<h3 class="wp-people-group"><?php esc_html_e('Support Staff', 'event_espresso'); ?></h3>
<ul class="wp-people-group" id="ee-people-group-support-staff">
    <li class="wp-person" id="ee-person-jfeck">
        <a href="<?php esp_gravatar_profile('josh@eventespresso.com'); ?>">
            <?php echo esp_gravatar_image('josh@eventespresso.com', 'Josh Feck'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('josh@eventespresso.com'); ?>">
            Josh Feck
        </a>
    </li>
    <li class="wp-person" id="ee-person-twarwick">
        <a href="<?php esp_gravatar_profile('tony@eventespresso.com'); ?>">
            <?php echo esp_gravatar_image('tony@eventespresso.com', 'Tony Warwick'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('tony@eventespresso.com'); ?>">
            Tony Warwick
        </a>
    </li>
    <li class="wp-person" id="ee-person-lcaum">
        <a href="<?php esp_gravatar_profile('lorenzo@eventespresso.com'); ?>">
            <?php echo esp_gravatar_image('lorenzo@eventespresso.com', 'Lorenzo Caum'); ?>
        </a>
        <a class="web" href="<?php esp_gravatar_profile('lorenzo@eventespresso.com'); ?>">
            Lorenzo Caum
        </a>
    </li>

</ul>
<h3 class="wp-people-group"><?php esc_html_e('Contributor Recognition', 'event_espresso'); ?></h3>
<p class="description">
    <?php printf(
        esc_html__(
            'For every major release we want to recognize the people who contributed to the release via a GitHub pull request. Want to see your name listed here? %sWhen you submit a pull request that gets included in a major release%s, we\'ll add your name here linked to your GitHub profile.',
            'event_espresso'
        ),
        '<a href="https://github.com/eventespresso/event-espresso-core" title="Contribute to Event Espresso by making a pull request via GitHub">',
        '</a>'
    ); ?>
</p>
<p class="wp-credits-list">
<ul>
    <li><a href="https://github.com/Veraxus">Matt Van Andel</a></li>
    <li><a href="https://github.com/jonathan-dejong">Jonathan de Jong</a></li>
    <li><a href="https://github.com/richardtape">Richard Tape</a></li>
    <li><a href="https://github.com/robert-osborne">Robert Osborne</a></li>
    <li><a href="https://github.com/rgunawans">Robby Gunawan Sutanto</a></li>
</ul>

</p>
<h3 class="wp-people-group"><?php esc_html_e('External Libraries', 'event_espresso'); ?></h3>
<p class="description">
    <?php printf(
        esc_html__(
            'Along with the libraries %sincluded with WordPress%s, Event Espresso utilizes the following third party libraries:',
            'event_espresso'
        ),
        '<a href="credits.php">',
        '</a>'
    ); ?>
</p>
<p class="wp-credits-list">
    <a href="https://openexchangerates.github.io/accounting.js/">accounting.js</a>,
    <a href="https://dompdf.github.io/">dompdf</a>,
    <a href="https://zurb.com/playground/jquery-joyride-feature-tour-plugin">joyride2</a>,
    <a href="https://kint-php.github.io/kint/">Kint</a>,
    <a href="https://momentjs.com/">Moment.js</a>,
    <a href="http://qtip2.com/">qTip2</a>,
    <a href="https://trentrichardson.com/examples/timepicker/">jQuery UI Timepicker</a>,
    <a href="https://github.com/jhogendorn/jQuery-serializeFullArray">SerializeFullArray</a>,
    <a href="https://github.com/jzaefferer/jquery-validation">jQuery Validation</a>
</p>

<?php
function esp_gravatar_profile($email)
{
    echo 'https://www.gravatar.com/' . md5($email);
}

function esp_gravatar_image($email, $name)
{
    echo '<img src="https://0.gravatar.com/avatar/' . md5($email) . '?s=60" class="gravatar" alt="' . $name . '"/>';
}

?>
