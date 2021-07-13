#!/bin/bash
find ./ -iname '*.vue' -type f -exec bash -c 'expand -t 2 "$0" | sponge "$0"' {} \;
find ./ -iname '*.php' -type f -exec bash -c 'expand -t 2 "$0" | sponge "$0"' {} \;
