// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Alchemy CDK',
    tagline: 'Dinosaurs are cool',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://your-docusaurus-test-site.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'KovacZan', // Usually your GitHub org/user name.
    projectName: 'cdk-alchemy', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */

            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    plugins: [
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'alchemy-webhooks',
                path: 'alchemy-webhooks',
                routeBasePath: 'alchemy-webhooks',
                sidebarPath: require.resolve('./sidebars.js'),
            },
        ],
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'alchemy-integrator',
                path: 'alchemy-integrator',
                routeBasePath: 'alchemy-integrator',
                sidebarPath: require.resolve('./sidebars.js'),
            },
        ]
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: 'Alchemy CDK',
                logo: {
                    alt: 'Alchemy CDK Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {to: '/alchemy-webhooks/intro', label: 'Alchemy Webhooks', position: 'left'},
                    {to: '/alchemy-integrator/intro', label: 'Alchemy Integrator', position: 'left'},
                    {
                        href: 'https://github.com/KovacZan/cdk-alchemy',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'CDK Alchemy Webhooks',
                                to: '/alchemy-webhooks/intro',
                            },
                            {
                                label: 'CDK Alchemy Integrator',
                                to: '/alchemy-integrator/intro',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Discussions',
                                href: 'https://github.com/KovacZan/cdk-alchemy/discussions',
                            },
                            {
                                label: 'Issues',
                                href: 'https://github.com/KovacZan/cdk-alchemy/issues',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/zan_kovi',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/KovacZan/cdk-alchemy',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Alchemy CDK`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
