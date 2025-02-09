import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import type { 
  Auth, 
  User, 
  UserCredential,
} from 'firebase/auth';

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

interface MessageResponse {
  type: "auth" | "un-auth";
  status: "success" | "error" | "false" | "no-auth";
  message: User | boolean | string | Error;
}

interface BaseMessage {
  command: "logoutAuth" | "checkAuth" | "loginUser";
}

interface LoginMessage extends BaseMessage {
  command: "loginUser";
  email: string;
  password: string;
}

interface LogoutMessage extends BaseMessage {
  command: "logoutAuth";
}

interface CheckAuthMessage extends BaseMessage {
  command: "checkAuth";
}

type Message = LoginMessage | LogoutMessage | CheckAuthMessage;

const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

chrome.runtime.onMessage.addListener((
  msg: Message, 
  sender: chrome.runtime.MessageSender, 
  sendResponse: (response: MessageResponse) => void
) => {
  if (msg.command === 'logoutAuth') {
    signOut(auth).then(() => {
      sendResponse({ 
        type: "un-auth", 
        status: "success", 
        message: true 
      });
    }).catch((error: Error) => {
      sendResponse({ 
        type: "un-auth", 
        status: "false", 
        message: error 
      });
    });
  }

  if (msg.command === 'checkAuth') {
    const user: User | null = auth.currentUser;
    if (user) {
      sendResponse({ 
        type: "auth", 
        status: "success", 
        message: user 
      });
    } else {
      sendResponse({ 
        type: "auth", 
        status: "no-auth", 
        message: false 
      });
    }
  }

  if (msg.command === 'loginUser') {
    const { email, password } = msg;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        const user: User = userCredential.user;
        sendResponse({ 
          type: "auth", 
          status: "success", 
          message: user 
        });
      })
      .catch((error: Error) => {
        sendResponse({ 
          type: "auth", 
          status: "error", 
          message: error.message 
        });
      });
  }
  return true;
});