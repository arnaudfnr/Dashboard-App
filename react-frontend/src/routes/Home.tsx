import logo from '../assets/hwlogo.png';
import { SearchBar } from '../features/searchBar/SearchBar';
import styles from './Home.module.css';

export function Home() {
    return (
        <div>
            <img className={styles.logo} src={logo} alt='logo'></img>
            <SearchBar />
        </div>
    );

}

export default Home;