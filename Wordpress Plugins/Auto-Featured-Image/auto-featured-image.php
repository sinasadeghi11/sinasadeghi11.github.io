<?php
/*
Plugin Name: Auto Featured Image
Description: Automatically sets the first uploaded image as the post thumbnail for each post that doesn't already have a post thumbnail set.
Version: 1.0
Author: Sina Sadeghi
*/

function autoset_featured_image() {
  global $post;
  
  if (function_exists('has_post_thumbnail') && function_exists('set_post_thumbnail')) {
    if (!has_post_thumbnail($post->ID)) { // check if the post is missing a thumbnail
      $attached_image = get_children( array('post_parent' => $post->ID, 'post_type' => 'attachment', 'post_mime_type' => 'image', 'numberposts' => 1) );
      
      if ($attached_image) {
        foreach ($attached_image as $attachment_id => $attachment) {
          set_post_thumbnail($post->ID, $attachment_id);
        }
      }
    }
  }
}
add_action('the_post', 'autoset_featured_image');

?>
