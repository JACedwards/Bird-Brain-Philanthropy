import App from './App';
import DataProvider from './DataProvider';
import { getAuth } from 'firebase/auth';
import { useFirebaseApp, AuthProvider } from 'reactfire';



const ProviderLayer = () => {
    const app = useFirebaseApp();

    const auth = getAuth(app);
    
    return (
        
        <AuthProvider sdk={auth}>
            <DataProvider>
                <App />
            </DataProvider>
        </AuthProvider>
    )
}

export default ProviderLayer;