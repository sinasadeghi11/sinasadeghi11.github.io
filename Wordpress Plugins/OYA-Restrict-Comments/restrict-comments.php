<?php
/**
 * Plugin Name: OYA Restrict Comments Plugin
 * Description: Restrict users to comment only on their own posts.
 * Version: 1.0
 * Author: Sina Sadeghi
 */

function restrict_comments_to_own_posts($commentdata) {
    if(is_user_logged_in()) {
        $post = get_post($commentdata['comment_post_ID']);
        $current_user = wp_get_current_user();
        if($post->post_author != $current_user->ID) {
            wp_die( __('Oops! You are only allowed to add content to your own posts.') );
        }
    }
    return $commentdata;
}
add_filter('preprocess_comment', 'restrict_comments_to_own_posts');
?>

