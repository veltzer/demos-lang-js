##############
# parameters #
##############
# do you want to show the commands executed ?
DO_MKDBG:=0
# do you want dependency on the Makefile itself ?
DO_ALLDEP:=1
# do you want to do htmlhint?
DO_HTMLHINT:=1
# do you want to do htmllint?
DO_HTMLLINT:=0
# do you want to do validate_html
DO_VALIDATEHTML:=1
# do you want to use tidy to check HTML files?
DO_TIDY:=1
# do you want to do eslint on javascript files?
DO_ESLINT_JS:=0 # INPROGRESS
# do you want to do eslint on html files?
DO_ESLINT_HTML:=1
# do you want to run standard?
DO_STANDARD:=0
# do you want to do jslint?
DO_JSLINT:=0
# do you want to do jshint?
DO_JSHINT:=0
# do you want to check html with simple makefile rules?
DO_CHECK_HTML:=0
# do you want to lint css?
DO_STYLELINT:=0 # INPROGRESS

########
# code #
########
ALL:=
ALL_HTML:=$(shell find src -name "*.html")
ALL_HTML_FRAG:=$(shell find src -name "*.html_frag")
ALL_JS:=$(shell find src -name "*.js")
ALL_CSS:=$(shell find src -name "*.css")
ALL_HTMLHINT:=$(addprefix out/,$(addsuffix .htmlhint, $(basename $(ALL_HTML))))
ALL_HTMLLINT:=$(addprefix out/,$(addsuffix .htmllint, $(basename $(ALL_HTML))))
ALL_VALIDATEHTML:=$(addprefix out/,$(addsuffix .vhtml, $(basename $(ALL_HTML))))
ALL_TIDY:=$(addprefix out/,$(addsuffix .tidy, $(basename $(ALL_HTML))))
ALL_ESLINT_JS:=$(addprefix out/,$(addsuffix .eslint_js, $(basename $(ALL_JS))))
ALL_ESLINT_HTML:=$(addprefix out/,$(addsuffix .eslint_html, $(basename $(ALL_HTML))))
ALL_STANDARD:=$(addprefix out/,$(addsuffix .standard, $(basename $(ALL_JS))))
ALL_JSLINT:=$(addprefix out/,$(addsuffix .jslint, $(basename $(ALL_JS))))
ALL_JSHINT:=$(addprefix out/,$(addsuffix .jshint, $(basename $(ALL_JS))))
ALL_STYLELINT:=$(addprefix out/,$(addsuffix .stylelint, $(basename $(ALL_CSS))))

# silent stuff
ifeq ($(DO_MKDBG),1)
Q:=
# we are not silent in this branch
else # DO_MKDBG
Q:=@
#.SILENT:
endif # DO_MKDBG

ifeq ($(DO_HTMLHINT),1)
ALL+=$(ALL_HTMLHINT)
endif # DO_HTMLHINT

ifeq ($(DO_HTMLLINT),1)
ALL+=$(ALL_HTMLLINT)
endif # DO_HTMLLINT

ifeq ($(DO_VALIDATEHTML),1)
ALL+=$(ALL_VALIDATEHTML)
endif # DO_VALIDATEHTML

ifeq ($(DO_TIDY),1)
ALL+=$(ALL_TIDY)
endif # DO_TIDY

ifeq ($(DO_ESLINT_JS),1)
ALL+=$(ALL_ESLINT_JS)
endif # DO_ESLINT_JS

ifeq ($(DO_ESLINT_HTML),1)
ALL+=$(ALL_ESLINT_HTML)
endif # DO_ESLINT_HTML

ifeq ($(DO_STANDARD),1)
ALL+=$(ALL_STANDARD)
endif # DO_STANDARD

ifeq ($(DO_JSLINT),1)
ALL+=$(ALL_JSLINT)
endif # DO_JSLINT

ifeq ($(DO_JSHINT),1)
ALL+=$(ALL_JSHINT)
endif # DO_JSHINT

ifeq ($(DO_STYLELINT),1)
ALL+=$(ALL_STYLELINT)
endif # DO_STYLELINT

ifeq ($(DO_CHECK_HTML),1)
ALL+=out/html.stamp
endif # DO_CHECK_HTML

# dependency on the makefile itself
ifeq ($(DO_ALLDEP),1)
.EXTRA_PREREQS+=$(foreach mk, ${MAKEFILE_LIST},$(abspath ${mk}))
endif # DO_ALLDEP

#########
# rules #
#########
.PHONY: all
all: $(ALL)
	@true
.PHONY: check_jsl
check_jsl:
	$(info doing [$@])
	$(Q)tools/jsl/jsl --conf=support/jsl.conf --quiet --nologo --nosummary --nofilelisting $(ALL_HTML) $(ALL_JS)
.PHONY: check_eslint
check_eslint:
	$(info doing [$@])
	$(Q)eslint $(ALL_JS)
.PHONY: check_grep 
check_grep:
	$(info doing [$@])
	$(Q)-git grep "<br>" -- src
	$(Q)-git grep "type=\"text/javascript" -- src
	$(Q)-git grep "\"" -- $(ALL_HTML) $(ALL_JS) | grep -v JSON
	$(Q)-git grep "DOCTYPE" -- $(ALL_HTML) $(ALL_JS)
	$(Q)-git grep "  " -- $(ALL_HTML) $(ALL_JS)
	$(Q)-git grep " + " -- $(ALL_HTML) $(ALL_JS)
	$(Q)-git grep " = " -- $(ALL_HTML) $(ALL_JS)
	$(Q)-git grep " - " -- $(ALL_HTML) $(ALL_JS)
	$(Q)-git grep " > " -- $(ALL_HTML) $(ALL_JS)
	$(Q)-git grep " < " -- $(ALL_HTML) $(ALL_JS)
	$(Q)-git grep " $$" -- $(ALL_HTML) $(ALL_JS)
.PHONY: count
count:
	$(info doing [$@])
	$(Q)find . -name toolkits -prune -o -type f -and -name "*.js" -or -name "*.html" | wc -l
.PHONY: show
show:
	$(info doing [$@])
	$(Q)find . -name toolkits -prune -o -type f -and -name "*.js" -or -name "*.html"
.PHONY: find_weird_files
find_weird_files:
	$(info doing [$@])
	$(Q)find src -type f -and -not -name "*.html" -and -not -name "*.js" -and -not -name "*.css"
#	$(Q)find . -name toolkits -prune -o -type f -and -not -name "*.js" -and -not -name "*.html" -and -not -name "*.php" -and -not -name "*.txt" -and -not -name "*.json" -and -not -name "Makefile" -and -not -name "*.ajax" -and -not -name "*.ppt" -and -not -name "*.css" -and -not -name "*.pdf" -and -not -name "*.jpg" -and -not -name "*.png" -and -not -name ".gitignore" -and -not -name "*.odp" -and -not -name "*.htaccess" -and -not -name "*.pptx" -and -not -name "*.pps" -and -not -name "*.gif" -and -not -name "*.swf" -and -not -name "*.xml" -and -not -name "*.sh"
.PHONY: debug
debug:
	$(info doing [$@])
	$(info ALL_HTML is $(ALL_HTML))
	$(info ALL_JS is $(ALL_JS))
	$(info ALL_HTMLHINT is $(ALL_HTMLHINT))
	$(info ALL_HTMLLINT is $(ALL_HTMLLINT))
	$(info ALL_VADLIDATEHTML is $(ALL_VADLIDATEHTML))
	$(info ALL_TIDY is $(ALL_TIDY))
	$(info ALL_ESLINT_JS is $(ALL_ESLINT_JS))
	$(info ALL_ESLINT_HTML is $(ALL_ESLINT_HTML))
	$(info ALL_STANDARD is $(ALL_STANDARD))
	$(info ALL_JSLINT is $(ALL_JSLINT))
	$(info ALL_JSHINT is $(ALL_JSHINT))
	$(info ALL_STYLELINT is $(ALL_STYLELINT))
.PHONY: clean
clean:
	$(Q)rm -f $(ALL)
.PHONY: clean_hard
clean_hard:
	$(info doing [$@])
	$(Q)git clean -qffxd
out/html.stamp: $(ALL_HTML)
	$(info doing [$@])
	$(Q)pymakehelper error_on_print git grep -l "'" -- "*.html"
	$(Q)pymakehelper error_on_print git grep -l " $$" -- "*.html"
	$(Q)pymakehelper error_on_print git grep -l "  " -- "*.html"
	$(Q)pymakehelper touch_mkdir $@
.PHONY:
all_htmlhint: $(ALL_HTML)
	$(Q)node_modules/.bin/htmlhint src
.PHONY: all_eslint_js
all_eslint_js: $(ALL_ESLINT_JS)
.PHONY: all_eslint_html
all_eslint_html: $(ALL_ESLINT_HTML)
.PHONY: all_tidy
all_tidy: $(ALL_TIDY)

############
# patterns #
############
$(ALL_HTMLHINT): out/%.htmlhint: %.html .htmlhintrc
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error node_modules/.bin/htmlhint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_HTMLLINT): out/%.htmllint: %.html .htmllintrc
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error node_modules/.bin/htmllint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_VALIDATEHTML): out/%.vhtml: %.html scripts/run_validate_html.py
	$(info doing [$@])
	$(Q)scripts/run_validate_html.py $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_TIDY): out/%.tidy: %.html scripts/run_tidy.py
	$(info doing [$@])
	$(Q)scripts/run_tidy.py $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_ESLINT_JS): out/%.eslint_js: %.js .eslintrc.js
	$(info doing [$@])
	$(Q)node_modules/.bin/eslint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_ESLINT_HTML): out/%.eslint_html: %.html .eslintrc.js
	$(info doing [$@])
	$(Q)node_modules/.bin/eslint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_STANDARD): out/%.standard: %.js
	$(info doing [$@])
	$(Q)node_modules/.bin/standard --fix $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_JSLINT): out/%.jslint: %.js
	$(info doing [$@])
	$(Q)node_modules/.bin/jslint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_JSHINT): out/%.jshint: %.js
	$(info doing [$@])
	$(Q)node_modules/.bin/jshint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_STYLELINT): out/%.stylelint: %.css
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error node_modules/.bin/stylelint $<
	$(Q)pymakehelper touch_mkdir $@
