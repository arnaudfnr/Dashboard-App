import Client from '../../models/client'
import styles from './ClientTable.module.css';

interface ClientEntryProps {
    client: Client;
}

export function ClientEntry({ client }: ClientEntryProps) {
    return (
        <tr key={client.id}>
            <td>{client.id}</td>
            <td>{client.full_name}</td>
            <td>
                {client.has_elec_heat ? (
                    <i className={`${styles.icon} ${styles['fill-yellow']}`} data-eva="flash"></i>
                ) : (
                    <i className={`${styles.icon} ${styles['fill-gray']}`} data-eva="flash-off"></i>
                )}
            </td>
            <td>
                {!client.has_anomaly ? (
                    <i
                        className={`${styles.icon} ${styles['fill-green']}`}
                        data-eva="checkmark-circle-2-outline"
                    ></i>
                ) : (
                    <i
                        className={`${styles.icon} ${styles['fill-red']}`}
                        data-eva="close-circle-outline"
                    ></i>
                )}
            </td>
            <td>
                <a
                    className={styles['vertical-middle']}
                    href={`/consumption-details/${client.id}`}
                >
                    <span className={`${styles.hidden} ${styles['md-inline']}`}>
                        See consumption
                    </span>
                    <i
                        className={`${styles.icon} ${styles['icon-link']} ${styles.inline} ${styles['fill-gray']}`}
                        data-eva="external-link-outline"
                    ></i>
                </a>
            </td>
        </tr>
    )

}
