import Head from 'next/head';
import styled from 'styled-components';

type Props = {
  html: string;
};
const RenderHtmlEditor = (props: Props) => {
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/jodit/3.20.3/jodit.es2018.min.css'
        />
      </Head>

      <Wrapper className='jodit-wysiwyg' dangerouslySetInnerHTML={{ __html: props.html }} />
    </>
  );
};
export default RenderHtmlEditor;

const Wrapper = styled.div`
  font-size: 14px;

  * {
    max-width: 100%;
  }
  h1 {
    font-size: 2.5em;
  }
  h2 {
    font-size: 2em;
  }
  h3 {
    font-size: 1.7em;
  }
  h4 {
    font-size: 1.3em;
  }
  h5 {
  }
  h6 {
  }
  /* p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  } */
  ul {
    padding: 0 20px 10px;
  }
  ol {
    display: block;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
  em {
    font-style: italic;
  }
  img {
    width: auto;
  }
  blockquote {
    background-color: var(--color-primary-25);
    border-left: 5px solid var(--color-primary-100);
    border-radius: 5px;
    /* box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.05), 0px 15px 20px -1px rgba(0, 0, 0, 0.025); */
    margin: 0;
    margin-bottom: 1em;
    padding: 0.8em;
  }
  iframe[src^="https://www.youtube.com/"]
  {
    max-width: 100%;
    height: unset;
    aspect-ratio: 16 / 9;
  }
`;
