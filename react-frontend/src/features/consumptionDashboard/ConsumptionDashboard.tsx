import Client from "../../models/client";
import Consumption from "../../models/consumption";
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface ConsumptionDashboardProps {
    client: Client;
    conso: Consumption[];
}

export function ConsumptionDashboard({ client, conso }: ConsumptionDashboardProps) {
    const dataPoints = conso.map((item) => ({
        label: `${item.month}/${item.year}`, // Concatenate month and year for the x-axis
        y: item.kwh_consumed,
        ...(item.month === client.anomaly_month && item.year === client.anomaly_year && {
            color: "#d50000", // Highlight the anomaly point in red
            indexLabel: "Anomalie" // Label for the anomaly point
        })
    })).reverse(); // Reverse the order of data points to follow chronological order

    console.log("Data points for chart:", dataPoints);
    console.log("Client data:", client);
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        title: {
            text: "Votre consommation électrique des 12 derniers mois",
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column",
            color: "#3CB371",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: dataPoints
        }]
    }

    return (
        <div>
            <h2>Tableau de bord</h2>
            <CanvasJSChart options={options} />
            {client.has_anomaly && (
                <div>
                    <h3>Attention !</h3>
                    <p>Une anomalie a été détectée dans votre consommation électrique en {client.anomaly_month}/{client.anomaly_year}.</p>
                    {client.has_elec_heating && (
                        <p>Nous avons remarqué que vous avez un chauffage électrique. Cela peut expliquer l'anomalie.</p>
                    )}
                    <p>Nous vous recommandons de vérifier votre consommation et de contacter un professionnel si nécessaire.</p>
                </div>
            )}
            {client.has_elec_heating && (
                <div>
                    <h3>Chauffage électrique</h3>
                    <p>Nous avons remarqué que vous utilisez un chauffage électrique. Cela peut avoir un impact sur votre consommation.</p>
                    <p>Nous vous recommandons de vérifier vos appareils et de considérer des alternatives plus économes en énergie.</p>
                </div>
            )}
            <h3>Conseils pour réduire votre consommation</h3>
            <ul>
                <li>Éteignez les appareils en veille.</li>
                <li>Utilisez des ampoules LED.</li>
                <li>Optimisez l'utilisation de votre chauffage.</li>
                <li>Investissez dans des appareils électroménagers économes en énergie.</li>
                <li>Consultez votre fournisseur d'énergie pour des conseils personnalisés.</li>
            </ul>
            <h3>Contact</h3>
            <p>Si vous avez des questions ou des préoccupations concernant votre consommation, n'hésitez pas à nous contacter.</p>
            <p>Nous sommes là pour vous aider à optimiser votre consommation d'énergie et à réduire vos factures.</p>
            <p>Vous pouvez nous contacter par téléphone au 01 23 45 67 89 ou par email à support@hellowatt.fr.</p>
            <p>Nous vous remercions de votre confiance et de votre engagement envers une consommation d'énergie responsable.</p>
            <p>Nous espérons que ces conseils vous seront utiles et que vous pourrez profiter d'une consommation d'énergie plus efficace.</p>
            <p>Merci de votre attention et à bientôt !</p>
            <p>Votre équipe de support client.</p>
            <p>PS : N'oubliez pas de consulter régulièrement votre tableau de bord pour suivre votre consommation et détecter d'éventuelles anomalies.</p>
            <p>Nous vous souhaitons une excellente journée !</p>
        </div>
    );
}

export default ConsumptionDashboard;
// import React from 'react';