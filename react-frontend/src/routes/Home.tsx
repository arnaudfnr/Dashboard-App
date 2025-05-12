import { Box } from '@mui/material';
import logo from '../assets/hwlogo.png';
import styles from './logo.module.css'


export function Home() {
    return (
        <Box
            component="img"
            src={logo}
            alt="logo"
            className={styles.logo}
        />
    );

}

export default Home;