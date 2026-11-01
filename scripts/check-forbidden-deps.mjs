import { readFileSync } from 'node:fs';

// Principle 1: no analytics, crash reporting, ads or tracking SDK, even as a transitive dependency.
const FORBIDDEN =
  /(^|\/)(@react-native-firebase|firebase|@sentry|sentry-expo|bugsnag|@bugsnag|amplitude|@amplitude|mixpanel|@segment|posthog|appsflyer|react-native-adjust|@datadog|newrelic|onesignal|react-native-branch|react-native-fbsdk|expo-insights|expo-firebase-analytics|crashlytics|appcenter|instabug|logrocket|smartlook|clevertap|@braze|@ua\/react-native-airship|react-native-google-mobile-ads)(\/|$)/i;

const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
const found = [
  ...new Set(
    Object.keys(lock.packages)
      .map((path) => path.replace(/^.*node_modules\//, ''))
      .filter((name) => FORBIDDEN.test(name)),
  ),
];

if (found.length > 0) {
  for (const name of found) {
    console.log(`::error title=Forbidden dependency::${name} is a tracking/analytics SDK`);
  }
  process.exit(1);
}
console.log('No tracking or analytics SDK in the dependency tree.');
