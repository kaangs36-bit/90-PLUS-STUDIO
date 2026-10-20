import {copyFile,mkdir,readFile,writeFile} from 'node:fs/promises';
import {dirname} from 'node:path';

const path='android/app/src/main/AndroidManifest.xml';
let xml=await readFile(path,'utf8');
const marker=`            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>`;
const deepLink=`            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="studio90" />
            </intent-filter>`;
if(!xml.includes('android:scheme="studio90"'))xml=xml.replace(marker,`${marker}\n\n${deepLink}`);
xml=xml
  .replace('android:icon="@mipmap/ic_launcher"','android:icon="@mipmap/studio90_icon"')
  .replace('android:roundIcon="@mipmap/ic_launcher_round"','android:roundIcon="@mipmap/studio90_icon"');
await writeFile(path,xml);

const iconTargets=[
  'android/app/src/main/res/mipmap-mdpi/studio90_icon.png',
  'android/app/src/main/res/mipmap-hdpi/studio90_icon.png',
  'android/app/src/main/res/mipmap-xhdpi/studio90_icon.png',
  'android/app/src/main/res/mipmap-xxhdpi/studio90_icon.png',
  'android/app/src/main/res/mipmap-xxxhdpi/studio90_icon.png',
];
for(const target of iconTargets){await mkdir(dirname(target),{recursive:true});await copyFile('public/icon-512.png',target)}

const splashTargets=[
  'android/app/src/main/res/drawable/splash.png',
  'android/app/src/main/res/drawable-port-mdpi/splash.png',
  'android/app/src/main/res/drawable-port-hdpi/splash.png',
  'android/app/src/main/res/drawable-port-xhdpi/splash.png',
  'android/app/src/main/res/drawable-port-xxhdpi/splash.png',
  'android/app/src/main/res/drawable-port-xxxhdpi/splash.png',
  'android/app/src/main/res/drawable-land-mdpi/splash.png',
  'android/app/src/main/res/drawable-land-hdpi/splash.png',
  'android/app/src/main/res/drawable-land-xhdpi/splash.png',
  'android/app/src/main/res/drawable-land-xxhdpi/splash.png',
  'android/app/src/main/res/drawable-land-xxxhdpi/splash.png',
];
for(const target of splashTargets){await mkdir(dirname(target),{recursive:true});await copyFile('public/splash.png',target)}
