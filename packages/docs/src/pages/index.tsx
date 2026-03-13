import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

const codeExample = `import { AddressActivityWebhook, AlchemyCredential } from "@kovi-soft/cdk-alchemy-webhooks";

new AddressActivityWebhook(this, "AddressActivityExample", {
\talchemyApiKey: AlchemyCredential.fromPlainText("<your-alchemy-api-key>"),
\talchemyNetwork: "eth-mainnet",
\talchemyAuthToken: AlchemyCredential.fromPlainText("<your-alchemy-auth-token>"),
\talchemyWebhookDestinationUrl: "https://my-domain.com/destination-to-my-server",
\talchemyContractAddress: "0x026224A2940bFE258D0dbE947919B62fE321F042",
\talchemyWebhookName: "MyAddressActivityWebhook"
});`;

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={styles.heroBanner}>
			<div className="container">
				<div className={styles.badge}>
					Alchemy SDK Challenge Winner
				</div>
				<h1 className={styles.heroTitle}>{siteConfig.title}</h1>
				<p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
				<div className={styles.buttons}>
					<Link className={styles.btnPrimary} to="/alchy-webhooks/intro">
						Get Started
					</Link>
					<Link
						className={styles.btnOutline}
						href="https://github.com/KovacZan/cdk-alchemy"
					>
						GitHub
					</Link>
				</div>
			</div>
		</header>
	);
}

function CodeShowcase() {
	return (
		<section className={styles.codeSection}>
			<div className="container">
				<div className={styles.codeColumns}>
					<div className={styles.codeText}>
						<h2>Deploy Webhooks in Minutes</h2>
						<p>
							Define Alchemy webhooks as CDK constructs. Your infrastructure
							and webhook configuration live together in version-controlled
							TypeScript — deploy with a single <code>cdk deploy</code>.
						</p>
					</div>
					<div className={styles.codeBlock}>
						<CodeBlock language="typescript">{codeExample}</CodeBlock>
					</div>
				</div>
			</div>
		</section>
	);
}

function SocialProof() {
	return (
		<section className={styles.socialProof}>
			<div className="container">
				<h2>Built by Challenge Winners</h2>
				<p className={styles.socialSubtitle}>
					CDK Alchemy won the Alchemy SDK Developer Challenge, recognized for
					bringing Infrastructure-as-Code to Web3 webhooks.
				</p>
				<div className={styles.tweetCard}>
					<div className={styles.tweetHeader}>
						<div>
							<div className={styles.tweetAuthor}>Zan Kovi</div>
							<div className={styles.tweetHandle}>@zan_kovi</div>
						</div>
					</div>
					<div className={styles.tweetBody}>
						Super excited to have won the Alchemy SDK Challenge!
						CDK Alchemy brings the power of AWS CDK to Alchemy&apos;s Web3
						platform — deploy webhooks, monitors, and more with
						infrastructure-as-code.
					</div>
					<a
						className={styles.tweetLink}
						href="https://x.com/zan_kovi/status/1637913270202793984"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
						</svg>
						View on X
					</a>
				</div>
			</div>
		</section>
	);
}

function BottomCTA() {
	return (
		<section className={styles.bottomCta}>
			<div className="container">
				<h2>Ready to Get Started?</h2>
				<p>Deploy your first Alchemy webhook with AWS CDK in minutes.</p>
				<Link className={styles.btnPrimary} to="/alchy-webhooks/intro">
					Get Started
				</Link>
			</div>
		</section>
	);
}

export default function Home(): React.ReactNode {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={siteConfig.title}
			description="AWS CDK Constructs for Alchemy Web3 Webhooks"
		>
			<HomepageHeader />
			<main>
				<CodeShowcase />
				<HomepageFeatures />
				<SocialProof />
				<BottomCTA />
			</main>
		</Layout>
	);
}
