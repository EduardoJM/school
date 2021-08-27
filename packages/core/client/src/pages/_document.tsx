import React from 'react';
import NextDocument, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

interface DocumentProps {
    styleTags: Array<React.ReactElement<{}>>;
}

class Document extends NextDocument<DocumentProps> {
    static async getInitialProps(ctx: DocumentContext) {
        const { renderPage } = ctx;
        const initialProps = await NextDocument.getInitialProps(ctx);
        // Step 1: Create an instance of ServerStyleSheet
        const sheet = new ServerStyleSheet();
        // Step 2: Retrieve styles from components in the page
        await renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
        // Step 3: Extract the styles as <style> tags
        const styleTags = sheet.getStyleElement();
        // Step 4: Pass styleTags as a prop
        return { ...initialProps, styleTags };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap"
                        rel="stylesheet"
                    />
                    {this.props.styleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default Document;
