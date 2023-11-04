<%!
    import pydmt.helpers.git
    file_number = pydmt.helpers.git.count_files("src/**/*.js") +\
	pydmt.helpers.git.count_files("src/**/*.html")
%>${"##"} number of examples 

Currently there are ${file_number} examples in this repo.
