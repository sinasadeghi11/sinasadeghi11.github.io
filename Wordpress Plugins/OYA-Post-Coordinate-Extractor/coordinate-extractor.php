<?php
/*
Plugin Name: OYA Post Coord Extractor
Description: Extracts latitude and longitude from WP User Frontend form and saves them as custom fields.
Version: 1.0
Author: Sina Sadeghi
*/

function save_lat_lng_to_custom_fields($post_id) {
    if (array_key_exists('google_map', $_POST)) {
        $location_data = json_decode(stripslashes($_POST['google_map']), true);
        error_log(print_r($location_data, true)); // Debug line

        if (isset($location_data['lat']) && isset($location_data['lng'])) {
            update_post_meta(
                $post_id,
                'latitude',
                sanitize_text_field($location_data['lat'])
            );
            update_post_meta(
                $post_id,
                'longitude',
                sanitize_text_field($location_data['lng'])
            );
        }
    }
}
add_action('save_post', 'save_lat_lng_to_custom_fields');

add_action('save_post', 'save_lat_lng_to_custom_fields');
