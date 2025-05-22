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
DO_HTMLLINT:=1
# do you want to do validate_html
DO_VALIDATEHTML:=1
# do you want to do htmlpyrelist?
DO_HTMLPYRELIST:=1
# do you want to do jspyrelist?
DO_JSPYRELIST:=1
# do you want to do csspyrelist?
DO_CSSPYRELIST:=1
# do you want to use tidy to check HTML files?
DO_TIDY:=1
# do you want to do eslint on javascript files?
DO_ESLINT_JS:=1
# do you want to do eslint on html files?
DO_ESLINT_HTML:=1
# do you want to run standard? (I don't use it because it is too restrictive).
DO_STANDARD:=0
# do you want to do jslint?
DO_JSLINT:=0
# do you want to do jshint?
DO_JSHINT:=1
# do you want to lint css?
DO_STYLELINT:=1

########
# code #
########
ALL:=
ALL_HTML:=$(shell find src -type f -and -name "*.html")
ALL_HTML_FRAG:=$(shell find src -type f -and -name "*.html_frag")
ALL_JS:=$(shell find src -type f -and -name "*.js")
ALL_CSS:=$(shell find src -type f -and -name "*.css")

ALL_HTMLHINT:=$(addprefix out/,$(addsuffix .htmlhint, $(basename $(ALL_HTML))))
ALL_HTMLLINT:=$(addprefix out/,$(addsuffix .htmllint, $(basename $(ALL_HTML))))
ALL_VALIDATEHTML:=$(addprefix out/,$(addsuffix .vhtml, $(basename $(ALL_HTML))))
ALL_HTMLPYRELIST:=$(addprefix out/,$(addsuffix .htmlpyrelist, $(basename $(ALL_HTML))))
ALL_JSPYRELIST:=$(addprefix out/,$(addsuffix .jspyrelist, $(basename $(ALL_JS))))
ALL_CSSPYRELIST:=$(addprefix out/,$(addsuffix .csspyrelist, $(basename $(ALL_CSS))))
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

ifeq ($(DO_HTMLPYRELIST),1)
ALL+=$(ALL_HTMLPYRELIST)
endif # DO_HTMLPYRELIST

ifeq ($(DO_JSPYRELIST),1)
ALL+=$(ALL_JSPYRELIST)
endif # DO_JSPYRELIST

ifeq ($(DO_CSSPYRELIST),1)
ALL+=$(ALL_CSSPYRELIST)
endif # DO_CSSPYRELIST

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

#########
# rules #
#########
.PHONY: all
all: $(ALL)
	@true
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
	$(info ALL_HTML_FRAG is $(ALL_HTML_FRAG))
	$(info ALL_JS is $(ALL_JS))
	$(info ALL_HTMLHINT is $(ALL_HTMLHINT))
	$(info ALL_HTMLLINT is $(ALL_HTMLLINT))
	$(info ALL_VADLIDATEHTML is $(ALL_VADLIDATEHTML))
	$(info ALL_HTMLPYRELIST is $(ALL_HTMLPYRELIST))
	$(info ALL_JSPYRELIST is $(ALL_JSPYRELIST))
	$(info ALL_CSSPYRELIST is $(ALL_CSSPYRELIST))
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

.PHONY: all_htmlhint
all_htmlhint: $(ALL_HTMLHINT)
.PHONY: all_htmllint
all_htmllint: $(ALL_HTMLLINT)
.PHONY: all_validatehtml
all_validatehtml: $(ALL_VALIDATEHTML)
.PHONY: all_htmlpyrelist
all_htmlpyrelist: $(ALL_HTMLPYRELIST)
.PHONY: all_jspyrelist
all_jspyrelist: $(ALL_JSPYRELIST)
.PHONY: all_csspyrelist
all_csspyrelist: $(ALL_CSSPYRELIST)
.PHONY: all_tidy
all_tidy: $(ALL_TIDY)
.PHONY: all_eslint_js
all_eslint_js: $(ALL_ESLINT_JS)
.PHONY: all_eslint_html
all_eslint_html: $(ALL_ESLINT_HTML)
.PHONY: all_standard
all_standard: $(ALL_STANDARD)
.PHONY: all_jslint
all_jslint: $(ALL_JSLINT)
.PHONY: all_jshint
all_jshint: $(ALL_JSHINT)
.PHONY: all_stylelint
all_stylelint: $(ALL_STYLELINT)

############
# patterns #
############
$(ALL_HTMLHINT): out/%.htmlhint: %.html .htmlhintrc
	$(info doing [$@])
	$(Q)pymakehelper run_with_ignore $< NOHTMLHINT node_modules/.bin/htmlhint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_HTMLLINT): out/%.htmllint: %.html .htmllintrc
	$(info doing [$@])
	$(Q)pymakehelper run_with_ignore $< NOHTMLLINT node_modules/.bin/htmllint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_VALIDATEHTML): out/%.vhtml: %.html
	$(info doing [$@])
	$(Q)pymakehelper run_with_ignore $< NOVALIDATEHTML pycmdtools validate_html $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_HTMLPYRELIST): out/%.htmlpyrelist: %.html support/pyrelist.json
	$(info doing [$@])
	$(Q)pyrelist match --patterns=support/pyrelist.json $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_JSPYRELIST): out/%.jspyrelist: %.js support/pyrelist.json
	$(info doing [$@])
	$(Q)pyrelist match --patterns=support/pyrelist.json $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_CSSPYRELIST): out/%.csspyrelist: %.css support/pyrelist.json
	$(info doing [$@])
	$(Q)pyrelist match --patterns=support/pyrelist.json $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_TIDY): out/%.tidy: %.html .tidy.config
	$(info doing [$@])
	$(Q)pymakehelper run_with_ignore $< NOTIDY tidy -errors -quiet -config .tidy.config $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_ESLINT_JS): out/%.eslint_js: %.js .eslintrc.js
	$(info doing [$@])
	$(Q)pymakehelper run_with_ignore $< NOESLINT node_modules/.bin/eslint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_ESLINT_HTML): out/%.eslint_html: %.html .eslintrc.js
	$(info doing [$@])
	$(Q)pymakehelper run_with_ignore $< NOESLINT node_modules/.bin/eslint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_STANDARD): out/%.standard: %.js
	$(info doing [$@])
	$(Q)node_modules/.bin/standard $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_JSLINT): out/%.jslint: %.js
	$(info doing [$@])
	$(Q)node_modules/.bin/jslint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_JSHINT): out/%.jshint: %.js .jshintrc
	$(info doing [$@])
	$(Q)pymakehelper run_with_ignore $< NOJSHINT node_modules/.bin/jshint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_STYLELINT): out/%.stylelint: %.css
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error node_modules/.bin/stylelint $<
	$(Q)pymakehelper touch_mkdir $@

##########
# alldep #
##########
ifeq ($(DO_ALLDEP),1)
.EXTRA_PREREQS+=$(foreach mk, ${MAKEFILE_LIST},$(abspath ${mk}))
endif # DO_ALLDEP
