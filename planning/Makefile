# Makefile to convert markdown to HTML
# Requires pandoc for now

all: requirements

requirements: README.md
	pandoc README.md -f markdown -t html \
	-o requirements_mid.html
	cat requirements_top.html requirements_mid.html requirements_bot.html > requirements.html

.PHONY: clean
clean:
	rm -rf requirements.html requirements_mid.html
