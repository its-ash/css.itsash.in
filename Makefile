.PHONY: build clean serve deploy push all

NODE ?= node
NPM ?= npm
REMOTE ?= origin
BRANCH ?= main

## Build the standalone bundle + copy assets to docs/
build:
	@echo "Building theme engine bundle..."
	@$(NODE) build.mjs
	@echo "Copying preview.html to docs/..."
	@cp preview.html docs/preview.html
	@echo "✓ Build complete → docs/"

## Start a local dev server
serve: build
	@echo "Starting server at http://localhost:8080"
	@npx serve docs/ -l 8080

## Clean generated files
clean:
	@rm -f docs/js/theme-engine.js
	@echo "✓ Cleaned"

## Commit with AI-generated message and push
push: build
	@echo "Generating commit message..."
	@git add -A
	@$(eval MSG := $(shell npx @github/copilot-github-cli@latest commit --message 2>/dev/null || echo "update theme engine"))
	@git commit -m "$(MSG)" 2>/dev/null || true
	@echo "Pushing to $(REMOTE)/$(BRANCH)..."
	@git push $(REMOTE) $(BRANCH)
	@echo "✓ Pushed"

## Deploy to GitHub Pages (just push, GH Actions handles the rest)
deploy: push
	@echo "✓ Deployed to GitHub Pages"

## Full build + push
all: push

## Show help
help:
	@echo "Theme Engine — css.itsash.in"
	@echo ""
	@echo "Commands:"
	@echo "  make build   — Build bundle + copy assets to docs/"
	@echo "  make serve   — Build + start local server (port 8080)"
	@echo "  make push    — Build + commit with Copilot + push"
	@echo "  make deploy  — Same as push (GH Pages auto-deploys)"
	@echo "  make clean   — Remove generated files"
	@echo "  make help    — Show this help"
	@echo ""
	@echo "Deploy target: https://css.itsash.in"