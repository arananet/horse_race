#!/bin/bash
export FREEPIK_API_KEY="FPSXb7e441a6cfad42b9a016e441a477a544"

echo "Generating Sky..."
curl -s -X POST "https://api.freepik.com/v1/ai/text-to-image" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "x-freepik-api-key: $FREEPIK_API_KEY" \
  -d '{
    "prompt": "A seamless horizontal 16-bit pixel art background of a bright blue sky with fluffy white clouds, retro arcade game style, endless runner background.",
    "engine": "flux-dev"
  }' > /data/workspace/horse_race/scripts/sky_b64.json

echo "Generating Mountains..."
curl -s -X POST "https://api.freepik.com/v1/ai/text-to-image" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "x-freepik-api-key: $FREEPIK_API_KEY" \
  -d '{
    "prompt": "A seamless horizontal 16-bit pixel art background of distant blue and purple mountains, retro arcade game style.",
    "engine": "flux-dev"
  }' > /data/workspace/horse_race/scripts/mountains_b64.json

echo "Generating Ground..."
curl -s -X POST "https://api.freepik.com/v1/ai/text-to-image" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "x-freepik-api-key: $FREEPIK_API_KEY" \
  -d '{
    "prompt": "A seamless horizontal 16-bit pixel art texture of a brown dirt race track with small rocks and grass patches, retro arcade style.",
    "engine": "flux-dev"
  }' > /data/workspace/horse_race/scripts/ground_b64.json
