HTML_FILES:=$(shell find . -name "*.html")
HTML_STAMP_FILES:=$(addsuffix .stamp, $(basename $(HTML_FILES)))

.PHONY: all
all: $(HTML_STAMP_FILES)
	$(info doing [$@])

$(HTML_STAMP_FILES): %.stamp: %.html
	$(info doing [$@] from [$<])
	@tidy -errors -q -utf8 $<
	@htmlhint $< > /dev/null
	@touch $@
#xmllint  $(HTML_FILES) --valid --noout 2> err

.PHONY: clean
clean:
	$(info doing [$@])
	@rm -f $(HTML_STAMP_FILES)

.PHONY: debug
debug:
	$(info doing [$@])
	$(info HTML_FILES is $(HTML_FILES))
	$(info HTML_STAMP_FILES is $(HTML_STAMP_FILES))
