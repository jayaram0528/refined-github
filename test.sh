#!/usr/bin/env bash
set -euo pipefail

output_path=''
mode=''

while [[ $# -gt 0 ]]; do
	case "$1" in
		--output_path)
			output_path="${2:-}"
			shift 2
			;;
		base|new)
			mode="$1"
			shift
			;;
		*)
			echo "Unknown argument: $1" >&2
			exit 2
			;;
	esac
done

if [[ -z "$output_path" || -z "$mode" ]]; then
	echo 'Usage: ./test.sh --output_path <path> <base|new>' >&2
	exit 2
fi

if [[ "$mode" == 'base' ]]; then
	pnpm test -- --reporter=junit --outputFile="$output_path"
else
	pnpm vitest run source/features/copy-discussion-url.test.ts \
		--reporter=junit \
		--outputFile="$output_path"
fi