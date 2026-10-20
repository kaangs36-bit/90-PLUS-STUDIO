import {readFile,writeFile} from 'node:fs/promises';

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
await writeFile(path,xml);
