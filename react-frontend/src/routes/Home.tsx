import logo from '../assets/hwlogo.png';
import styles from './Home.module.css';

export function Home() {
    return (
        <div>
            <img className={styles.logo} src={logo} alt='logo'></img>
        </div>
    );

}

export default Home;