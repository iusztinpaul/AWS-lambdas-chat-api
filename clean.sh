find . -name "*.zip" -type f -delete
find . -name "common" -not -path "./common" -type d -exec rm -r "{}" \;
