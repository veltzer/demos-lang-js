##############
# parameters #
##############
# do you want to show the commands executed ?
DO_MKDBG:=0
# do you want dependency on the Makefile itself ?
DO_ALLDEP:=1
# do you want to do eslint?
DO_ESLINT:=0
# do you want to do htmlhint?
DO_HTMLHINT:=0

########
# code #
########
ALL:=
ALL_HTML:=$(shell find src -name "*.html")
ALL_JS:=$(shell find src -name "*.js")
ALL_ESLINT:=$(addprefix out/,$(addsuffix .eslint, $(basename $(ALL_JS))))
ALL_HTMLHINT:=$(addprefix out/,$(addsuffix .htmlhint, $(basename $(ALL_HTML))))

# silent stuff
ifeq ($(DO_MKDBG),1)
Q:=
# we are not silent in this branch
else # DO_MKDBG
Q:=@
#.SILENT:
endif # DO_MKDBG

ifeq ($(DO_ESLINT),1)
ALL+=$(ALL_ESLINT)
endif # DO_ESLINT

ifeq ($(DO_HTMLHINT),1)
ALL+=$(ALL_HTMLHINT)
endif # DO_HTMLHTINT

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
	$(info ALL_ESLINT is $(ALL_ESLINT))
	$(info ALL_HTMLHINT is $(ALL_HTMLHINT))
.PHONY: clean
clean:
	$(Q)rm -f $(ALL)
.PHONY: clean_hard
clean_hard:
	$(info doing [$@])
	$(Q)git clean -qffxd

############
# patterns #
############
$(ALL_ESLINT): out/%.eslint: %.js
	$(info doing [$@])
	$(Q)node_modules/.bin/eslint $<
	$(Q)pymakehelper touch_mkdir $@
$(ALL_HTMLHINT): out/%.htmlhint: %.html
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error node_modules/.bin/htmlhint $<
	$(Q)pymakehelper touch_mkdir $@
