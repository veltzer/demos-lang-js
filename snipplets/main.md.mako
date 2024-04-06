<%!
    import pydmt.helpers.git
    file_number_js = pydmt.helpers.git.count_files("src/**/*.js")
    file_number_html = pydmt.helpers.git.count_files("src/**/*.html")
    file_number = file_number_js + file_number_html 
%>${"##"} Number of examples

Currently there are ${file_number} examples in this repo.
${file_number_js} javascript files.
${file_number_html} HTML files.
