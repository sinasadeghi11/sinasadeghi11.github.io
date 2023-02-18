<?php
function compress_image($file_path, $quality = 80) {
    $python_script = ABSPATH . 'wp-content/plugins/kompress/webp_image_compressor.py';
    $command = escapeshellcmd("python3 $python_script \"$file_path\" $quality");
    $output = shell_exec($command);
    return $output;
  }
  
  function compress_all_images($quality = 80) {
    $python_script = ABSPATH . 'wp-content/plugins/kompress/webp_image_compressor.py';
    $command = escapeshellcmd("python3 $python_script --quality $quality");
    $output = shell_exec($command);
    return $output;
  }

  function count_all_images() {
    $query_images = new WP_Query(array(
      'post_type' => 'attachment',
      'post_status' => 'inherit',
      'posts_per_page' => -1,
      'post_mime_type' => 'image/jpeg,image/png,image/gif,image/webp',
    ));
    return $query_images->found_posts;
  }
  
  function size_of_all_images() {
    global $wpdb;
    $size_query = "SELECT SUM(meta_value) FROM $wpdb->postmeta pm
                   INNER JOIN $wpdb->posts p ON pm.post_id = p.ID
                   WHERE meta_key = '_wp_attached_file'
                   AND p.post_mime_type IN ('image/jpeg','image/png','image/gif','image/webp')";
    $size = $wpdb->get_var($size_query);
    return $size;
  }
  
  function size_of_all_webp_images() {
    global $wpdb;
    $size_query = "SELECT SUM(filesize) FROM $wpdb->posts
                   WHERE post_mime_type = 'image/webp'";
    $size = $wpdb->get_var($size_query);
    return $size;
  }
  
?>
