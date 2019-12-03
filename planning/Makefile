# Makefile to convert markdown to HTML
# Requires pandoc for now

all: goals

goals: README.md
	pandoc --webtex README.md -f markdown -t html \
	-o goals_mid.html
	cat goals_top.html goals_mid.html goals_bot.html > goals.html

.PHONY: clean
clean:
	rm -rf goals.html goals_mid.html
