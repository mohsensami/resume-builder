import Header from '@/components/custom/Header';
import { UserButton } from '@clerk/clerk-react';

const Home = () => {
    return (
        <div>
            <Header />
            <UserButton />
        </div>
    );
};

export default Home;
