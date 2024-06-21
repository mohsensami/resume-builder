import { useUser } from '@clerk/clerk-react';
import './App.css';
import { Navigate, Outlet } from 'react-router-dom';

function App() {
    const { user, isLoaded, isSignedIn } = useUser();
    if (!isSignedIn && isLoaded) {
        return <Navigate to={'/auth/sign-in'} />;
    }
    return (
        <>
            <Outlet />
        </>
    );
}

export default App;
