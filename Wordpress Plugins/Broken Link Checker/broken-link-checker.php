<?php
/*
Plugin Name: Broken Link Checker
Description: Checks your website for broken links.
Version: 1.0
Author: Sina Sadeghi
*/

function check_broken_links() {
    $output = "";

    $site_url = get_site_url();

    $pages = get_pages(array(
        'post_status' => 'publish',
        'number' => -1,
    ));

    foreach ($pages as $page) {
        $page_url = get_permalink($page->ID);
        $broken_links = shell_exec("python " . plugin_dir_path(__FILE__) . "broken_link_checker.py " . $page_url);

        if (strlen($broken_links) > 0) {
            $output .= "<h2>Broken Links on " . $page->post_title . "</h2>";
            $output .= "<ul>";

            foreach (explode("\n", $broken_links) as $link) {
                $output .= "<li><a href='" . $link . "'>" . $link . "</a></li>";
            }

            $output .= "</ul>";
        }
    }

    if (strlen($output) == 0) {
        $output = "<p>No broken links found.</p>";
    }

    echo $output;
}

function add_broken_link_checker_menu_item() {
    add_menu_page(
        "Broken Link Checker",
        "Broken Link Checker",
        "manage_options",
        "broken-link-checker",
        "check_broken_links"
    );
}

add_action("admin_menu", "add_broken_link_checker_menu_item");
