#!/bin/bash
export FREEPIK_API_KEY="FPSXb7e441a6cfad42b9a016e441a477a544"

echo "Generating Sky..."
curl -s -X POST "https://api.freepik.com/v1/ai/text-to-image/flux-dev" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "x-freepik-api-key: $FREEPIK_API_KEY" \
  -d '{
    "prompt": "A seamless horizontal 16-bit pixel art background of a bright blue sky with fluffy white clouds, retro arcade game style, endless runner background.",
    "aspect_ratio": "widescreen_16_9"
  }' > /data/workspace/horse_race/scripts/sky.json

echo "Generating Mountains..."
curl -s -X POST "https://api.freepik.com/v1/ai/text-to-image/flux-dev" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "x-freepik-api-key: $FREEPIK_API_KEY" \
  -d '{
    "prompt": "A seamless horizontal 16-bit pixel art background of distant blue and purple mountains, retro arcade game style.",
    "aspect_ratio": "widescreen_16_9"
  }' > /data/workspace/horse_race/scripts/mountains.json

echo "Generating Trees..."
curl -s -X POST "https://api.freepik.com/v1/ai/text-to-image/flux-dev" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "x-freepik-api-key: $FREEPIK_API_KEY" \
  -d '{
    "prompt": "A seamless horizontal 16-bit pixel art background of a dense dark green pine forest silhouette, retro arcade game style.",
    "aspect_ratio": "widescreen_16_9"
  }' > /data/workspace/horse_race/scripts/trees.json

echo "Generating Ground..."
curl -s -X POST "https://api.freepik.com/v1/ai/text-to-image/flux-dev" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "x-freepik-api-key: $FREEPIK_API_KEY" \
  -d '{
    "prompt": "A seamless horizontal 16-bit pixel art texture of a brown dirt race track with small rocks and grass patches, retro arcade style.",
    "aspect_ratio": "widescreen_16_9"
  }' > /data/workspace/horse_race/scripts/ground.json

echo "Generating Horse Sprite..."
curl -s -X POST "https://api.freepik.com/v1/ai/text-to-image/flux-dev" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H "x-freepik-api-key: $FREEPIK_API_KEY" \
  -d '{
    "prompt": "A 16-bit pixel art sprite of a brown horse running side profile, transparent background, isolated, retro arcade game style.",
    "aspect_ratio": "square"
  }' > /data/workspace/horse_race/scripts/horse.json
