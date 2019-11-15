# Makefile to convert markdown to HTML

all: requirements

requirements: README.md
	pandoc README.md -f markdown -t html \
	-o requirements_mid.txt
	cat requirements_top.txt requirements_mid.txt requirements_bot.txt > requirements.html

.PHONY: clean
clean:
	rm -rf requirements.html requirements_mid.txt
