##############
# parameters #
##############
# do you want to show the commands executed ?
DO_MKDBG:=0
# do you want to use tools?
DO_TOOLS:=1

########
# code #
########
FOLDERS_GREP:=src/jquery src/core src/jquery_controls src/extjs
FOLDERS_CHECK:=src/jquery src/core src/jquery_controls
SOURCES_GREP:=$(shell find $(FOLDERS_GREP) -name "*.html" -or -name "*.js")
SOURCES_CHECK:=$(shell find $(FOLDERS_CHECK) -name "*.html" -or -name "*.js")

# silent stuff
ifeq ($(DO_MKDBG),1)
Q:=
# we are not silent in this branch
else # DO_MKDBG
Q:=@
#.SILENT:
endif # DO_MKDBG

# tools
ifeq ($(DO_TOOLS),1)
ALL_DEP+=tools.stamp
endif # DO_TOOLS

ALL:=

#########
# rules #
#########
.PHONY: all
all: $(ALL) $(ALL_DEP)
	@true

tools.stamp: config/deps.py
	$(info doing [$@])
	$(Q)templar install_deps
	$(Q)make_helper touch-mkdir $@

.PHONY: check_lint
check_lint:
	$(info doing [$@])
	$(Q)tools/jsl/jsl --conf=support/jsl.conf --quiet --nologo --nosummary --nofilelisting $(SOURCES_CHECK)

.PHONY: check_grep 
check_grep:
	$(info doing [$@])
	$(Q)-git grep "<br>" -- $(FOLDERS_GREP)
	$(Q)-git grep "type=\"text/javascript" -- $(FOLDERS_GREP)
	$(Q)-git grep "\"" -- $(SOURCES_GREP) | grep -v JSON
	$(Q)-git grep "DOCTYPE" -- $(SOURCES_GREP)
	$(Q)-git grep "  " -- $(SOURCES_GREP)
	$(Q)-git grep " + " -- $(SOURCES_GREP)
	$(Q)-git grep " = " -- $(SOURCES_GREP)
	$(Q)-git grep " - " -- $(SOURCES_GREP)
	$(Q)-git grep " > " -- $(SOURCES_GREP)
	$(Q)-git grep " < " -- $(SOURCES_GREP)
	$(Q)-git grep " $$" -- $(SOURCES_GREP)

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
	$(Q)find . -name toolkits -prune -o -type f -and -not -name "*.js" -and -not -name "*.html" -and -not -name "*.php" -and -not -name "*.txt" -and -not -name "*.json" -and -not -name "Makefile" -and -not -name "*.ajax" -and -not -name "*.ppt" -and -not -name "*.css" -and -not -name "*.pdf" -and -not -name "*.jpg" -and -not -name "*.png" -and -not -name ".gitignore" -and -not -name "*.odp" -and -not -name "*.htaccess" -and -not -name "*.pptx" -and -not -name "*.pps" -and -not -name "*.gif" -and -not -name "*.swf" -and -not -name "*.xml" -and -not -name "*.sh"

.PHONY: debug
debug:
	$(info doing [$@])
	$(info SOURCES_GREP is $(SOURCES_GREP))
	$(info SOURCES_CHECK is $(SOURCES_CHECK))
