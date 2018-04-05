import '../exit-modal-survey';
import './style.css';
import $ from 'jquery';

if ($('tr.ee-upsell-plugin-list-table').length > 0) {
    $('tr[data-slug="event-espresso"],tr[data-slug="event-espresso-decaf"]').addClass('update');
}