interface Client {
    id: string;
    full_name: string;
    has_anomaly: boolean;
    has_elec_heating: boolean;
    anomaly_month: number;
    anomaly_year: number;
  }

export default Client;