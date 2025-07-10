import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

    
    
    
    const firebaseConfig = {
        apiKey: "AIzaSyAZBuoliNmCKijga49KPaJwFDApRsvHb3Q",
        authDomain: "dentvision-e6298.firebaseapp.com",
        projectId: "dentvision-e6298",
        storageBucket: "dentvision-e6298.firebasestorage.app",
        messagingSenderId: "689681960765",
        appId: "1:689681960765:web:bb3bb88d8b80a74ab43f54",
        measurementId: "G-FJ69B4N0W6"
      };


      const app = initializeApp(firebaseConfig);
      
      const auth = getAuth(app);
      export{auth};