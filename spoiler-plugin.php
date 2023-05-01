<?php
/*
Plugin Name: Spoil Text
Description: A simple plugin to add spoiler functionality to text wrapped in "||".
Version: 1.0
Author: CalaMariGold
*/

function spoiler_plugin_enqueue_scripts() {
    wp_enqueue_style('spoiler-plugin', plugin_dir_url(__FILE__) . 'spoiler-plugin.css');
    wp_enqueue_script('spoiler-plugin', plugin_dir_url(__FILE__) . 'spoiler-plugin.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'spoiler_plugin_enqueue_scripts');

