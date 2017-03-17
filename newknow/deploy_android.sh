#!/bin/sh

PATH_TO_APK="platforms/android/build/outputs/apk"

cordova platform add android
rm -r $PATH_TO_APK
cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore $PATH_TO_APK/android-release-unsigned.apk alias_name 

zipalign -v 4 $PATH_TO_APK/android-release-unsigned.apk $PATH_TO_APK/NewKnow.apk
