<?php
/*
Plugin Name: WebP Image Compressor
Description: A plugin that compresses all images in the WordPress media library to WebP to increase website loading speed.
Version: 1.0
Author: Sina Sadeghi
Author URI: https://www.isfastudio.com
*/

// Add the menu item to the admin sidebar
function webp_image_compressor_menu() {
    add_menu_page('KomPress WebP by Sina', 'KomPress WebP by Sina', 'manage_options', 'webp-image-compressor', 'webp_image_compressor_page');
}
add_action('admin_menu', 'webp_image_compressor_menu');

// Enqueue the plugin stylesheet
function webp_image_compressor_styles() {
    wp_enqueue_style('webp-image-compressor-styles', plugin_dir_url(__FILE__) . 'css/webp-image-compressor.css');
}
add_action('admin_enqueue_scripts', 'webp_image_compressor_styles');


// Create the plugin page
function webp_image_compressor_page() {
    echo '<div class="wrap">';
    echo '<h1>KomPress WebP Image Compressor</h1>';
    echo '<p>by Sina.</p>';
    echo '<p> </p>';
    echo '<p> </p>';
    echo '<p>Click the button below to compress all images in the media library to WebP format at 80 quality.</p>';
    echo '<form method="post" action="' . admin_url('admin-post.php') . '">';
    echo '<input type="hidden" name="action" value="webp_image_compressor">';
    echo '<input type="submit" class="button button-primary" value="Compress">';
    echo '</form>';
    echo '</div>';
}

// Handle the form submission
function webp_image_compressor_process() {
    // Check if the user has the necessary permissions
    if (!current_user_can('manage_options')) {
        wp_die('You do not have sufficient permissions to access this page.');
    }

    // Start the image compression process
    $output = "";
    $index = 0;
    $image_count = wp_count_attachments()->inherit;
    foreach ($image_count as $mime_type => $count) {
        for ($i = 0; $i < $count; $i++) {
            $output .= shell_exec("python " . plugin_dir_path(__FILE__) . "webp_image_compressor.py --index=$index");
            $index++;
        }
    }

    echo '<div class="wrap">';
    echo '<h1>WebP Image Compressor</h1>';
    echo '<p>All images have been compressed to WebP format at 80 quality.</p>';
    echo '</div>';
}

// Register the form action
add_action('admin_post_webp_image_compressor', 'webp_image_compressor_process');

