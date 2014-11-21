r.js -o app/build/build.js
cd dist
rm -rf build/
cd scripts/
rm -rf config/ locale/ model/ vendor/ view/ app.js
echo "Build completed"
