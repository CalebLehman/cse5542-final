# Makefile to convert markdown to HTML

all: requirements

requirements: README.md
	pandoc README.md -f markdown -t html \
	--metadata title="CSE 5542 Final Project - Requirements" -s \
	-o requirements.html

.PHONY: clean
clean:
	rm -rf requirements.html
