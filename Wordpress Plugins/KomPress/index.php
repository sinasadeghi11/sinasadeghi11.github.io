<?php
/**
 * Plugin Name: KomPress Media Files
 * Description: Compress all images in the media library to WebP.
 * Author: Sina Sadeghi
 * Version: 1.1
 */

require_once plugin_dir_path(__FILE__) . 'kompress_compress_functions.php';
require_once plugin_dir_path(__FILE__) . 'kompress_scan_functions.php';

function kompress_media_files() {
    $files = scan_upload_dir();
    $total_files = count($files);
    $total_file_size = array_reduce($files, function($carry, $file) {
        return $carry + $file['size'];
    }, 0);
    $total_potential_savings = array_reduce($files, function($carry, $file) {
        return $carry + ($file['size'] - $file['webp_size']);
    }, 0);

    if (isset($_POST['compress_all'])) {
        $success_count = 0;
        $savings_count = 0;
        foreach ($files as $file) {
            if ($file['webp_size'] > 0) {
                continue;
            }
            $success = compress_image($file['path']);
            if ($success) {
                $success_count++;
                $savings_count += $file['size'] - $file['webp_size'];
            }
        }
        $message = sprintf('%d images compressed. Total space saved: %s.', $success_count, size_format($savings_count));
        if ($success_count > 0) {
            $message .= ' The savings might be lower than expected due to quality settings.';
        }
        echo '<div id="message" class="updated"><p>' . esc_html($message) . '</p></div>';
    }

    echo '<div class="wrap">';
    echo '<h1>' . esc_html__('KomPress Media Files', 'kompress') . '</h1>';
    echo '<p>' . sprintf(esc_html__('There are %d images in the media library, with a total size of %s. Compressing all images could save up to %s.', 'kompress'), $total_files, size_format($total_file_size), size_format($total_potential_savings)) . '</p>';
    echo '<form method="post">';
    echo '<input type="hidden" name="compress_all" value="1">';
    echo '<p><input type="submit" class="button button-primary" value="' . esc_attr__('Compress All Images', 'kompress') . '"></p>';
    echo '</form>';
    echo '</div>';
}
add_action('admin_menu', function() {
    add_menu_page(
        __('KomPress Media Files', 'kompress'),
        __('KomPress Media Files', 'kompress'),
        'manage_options',
        'kompress-media-files',
        'kompress_media_files',
        'dashicons-images-alt2'
    );
});
?>
