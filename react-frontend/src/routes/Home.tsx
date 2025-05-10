import logo from '../assets/hwlogo.png';
import { SearchBar } from '../features/searchBar/SearchBar';

export function Home() {
    return (
        <div>
            <img src={logo} alt='logo'></img>
            <SearchBar />
        </div>
    );

}

export default Home;