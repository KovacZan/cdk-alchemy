import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
	icon: string;
	title: string;
	description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
	{
		icon: "\uD83D\uDD17",
		title: "Custom Webhooks",
		description: (
			<>GraphQL-based webhooks with full event filtering control.</>
		),
	},
	{
		icon: "\uD83D\uDCE1",
		title: "Address Activity",
		description: (
			<>Monitor any address for transactions and token transfers.</>
		),
	},
	{
		icon: "\uD83D\uDDBC\uFE0F",
		title: "NFT Activity",
		description: (
			<>Track NFT mints, transfers, and sales in real-time.</>
		),
	},
	{
		icon: "\uD83D\uDD10",
		title: "Flexible Credentials",
		description: (
			<>SSM Parameter Store, Secrets Manager, or plain text.</>
		),
	},
];

function Feature({ icon, title, description }: FeatureItem) {
	return (
		<div className={clsx("col col--6", styles.cardCol)}>
			<div className={styles.card}>
				<div className={styles.cardIcon}>{icon}</div>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures(): React.ReactNode {
	return (
		<section className={styles.features}>
			<div className="container">
				<h2>Features</h2>
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
