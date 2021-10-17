const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Engenharia do Instituto Inventare',
  tagline: 'Documentação técnica e de negócios acumulada durante o desenvolvimento da Plataforma do Instituto Inventare',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'inventare', // Usually your GitHub org/user name.
  projectName: 'school', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Inventare',
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/EduardoJM/school',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentação',
            items: [
              {
                label: 'Blog de Engenharia',
                to: '/blog',
              },
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Engenharia',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/inventare',
              },
            ],
          },
          {
            title: 'Inventare',
            items: [
              {
                label: 'Instituto Inventare',
                href: 'https://institutoinventare.com.br/',
              },
              {
                label: 'Blog do Inventare',
                href: 'https://blog.institutoinventare.com.br/',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/instituto.inventare/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Engenharia do Instituto Inventare, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
