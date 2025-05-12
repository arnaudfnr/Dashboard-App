import logo from '../assets/hwlogo.png';
import styles from './Routes.module.css';

export function Home() {
    return (
        <div className={styles['feature-container']}>
            <img className={styles.logo} src={logo} alt='logo'></img>
        </div>
    );

}

export default Home;