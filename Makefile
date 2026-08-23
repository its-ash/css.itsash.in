.PHONY: build clean serve deploy push run all

NODE ?= node
NPM ?= npm
REMOTE ?= origin
BRANCH ?= main

## Build the standalone bundle
build:
	@echo "Building theme engine bundle..."
	@$(NODE) build.mjs
	@echo "✓ Build complete → js/theme-engine.js"

## Start a local dev server
serve: build
	@echo "Starting server at http://localhost:8080"
	@npx serve . -l 8080

## Start a live-reload dev server
run: build
	@echo "Starting dev server at http://localhost:8080"
	@npx live-server . --port=8080 --no-browser

## Clean generated files
clean:
	@rm -f js/theme-engine.js
	@echo "✓ Cleaned"

## Commit with Copilot-generated message and push
push: build
	@echo "Staging changes..."
	@git add -A
	@echo "Generating commit message with Copilot..."
	@$(eval MSG := $(shell gh copilot suggest -t commit 2>/dev/null | head -5 | tail -1 || echo "update theme engine"))
	@git commit -m "$(MSG)" 2>/dev/null || git commit -m "update theme engine" 2>/dev/null || true
	@echo "Pushing to $(REMOTE)/$(BRANCH)..."
	@git push $(REMOTE) $(BRANCH)
	@echo "✓ Pushed → GitHub Pages will auto-deploy"

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
	@echo "  make run     — Build + start live-reload server (port 8080)"
	@echo "  make clean   — Remove generated files"
	@echo "  make help    — Show this help"
	@echo ""
	@echo "Deploy target: https://css.itsash.in"