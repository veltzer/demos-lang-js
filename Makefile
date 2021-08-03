##############
# parameters #
##############
# do you want to show the commands executed ?
DO_MKDBG:=0

########
# code #
########
FOLDERS_SRC:=src
SOURCES:=$(shell find $(FOLDERS_SRC) -name "*.html" -or -name "*.js")

# silent stuff
ifeq ($(DO_MKDBG),1)
Q:=
# we are not silent in this branch
else # DO_MKDBG
Q:=@
#.SILENT:
endif # DO_MKDBG

ALL:=

#########
# rules #
#########
.PHONY: all
all: $(ALL) $(ALL_DEP)
	@true

.PHONY: check_jsl
check_jsl:
	$(info doing [$@])
	$(Q)tools/jsl/jsl --conf=support/jsl.conf --quiet --nologo --nosummary --nofilelisting $(SOURCES)

.PHONY: check_eslint
check_eslint:
	$(info doing [$@])
	$(Q)node_modules/.bin/eslint $(SOURCES)

.PHONY: check_grep 
check_grep:
	$(info doing [$@])
	$(Q)-git grep "<br>" -- $(FOLDERS_SRC)
	$(Q)-git grep "type=\"text/javascript" -- $(FOLDERS_SRC)
	$(Q)-git grep "\"" -- $(SOURCES) | grep -v JSON
	$(Q)-git grep "DOCTYPE" -- $(SOURCES)
	$(Q)-git grep "  " -- $(SOURCES)
	$(Q)-git grep " + " -- $(SOURCES)
	$(Q)-git grep " = " -- $(SOURCES)
	$(Q)-git grep " - " -- $(SOURCES)
	$(Q)-git grep " > " -- $(SOURCES)
	$(Q)-git grep " < " -- $(SOURCES)
	$(Q)-git grep " $$" -- $(SOURCES)

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
	$(info SOURCES is $(SOURCES))

.PHONY: clean_hard
clean_hard:
	$(info doing [$@])
	$(Q)git clean -qffxd
