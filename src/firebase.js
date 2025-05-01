self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyCqGg-EqIDx5Wi91mM5L0iRcOhI0Slnrkg",
  authDomain: "landing-page-44bc9.firebaseapp.com",
  projectId: "landing-page-44bc9",
  storageBucket: "landing-page-44bc9.appspot.com",
  messagingSenderId: "848173101314",
  appId: "1:848173101314:web:0201a45b81c20c2e99921b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Initialize App Check with reCAPTCHA Enterprise
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider('6LcImyorAAAAADg78--tGJH026zadc1ePpjM2k16'),
  isTokenAutoRefreshEnabled: true
});

export { auth, appCheck };
