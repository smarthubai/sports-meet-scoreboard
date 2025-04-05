#!/bin/bash

echo "Scanning JavaScript files for external links and suspicious patterns..."
echo "-------------------------------------------------------------"

# Find all .js files
find . -type f -name "*.js" | while read file; do
  echo "🔍 Checking: $file"

  # External links (http/https)
  grep -Eo 'https?://[^"]+' "$file" | sed 's/^/  🌐 External link: /'

  # Suspicious libraries
  grep -E 'googletagmanager|google-analytics|mixpanel|segment|matomo|hotjar' "$file" \
    && echo "  ⚠️ Tracking library found!" || echo "  ✅ No tracking libraries"

  # Data-sending code
  grep -E '\b(fetch|XMLHttpRequest|navigator\.sendBeacon|WebSocket)\b' "$file" \
    && echo "  ⚠️ Data-sending function found!" || echo "  ✅ No data-sending code"

  echo "-------------------------------------------------------------"
done
