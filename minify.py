from css_html_js_minify import process_single_html_file, process_single_js_file, process_single_css_file, html_minify, js_minify, css_minify

process_single_html_file('index.htm', overwrite=False)
process_single_css_file('static/styles.css', overwrite=False)
