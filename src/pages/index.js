import Head from "next/head";
import Link from "next/link";

import withAuth from "../hocs/withAuth";

import styles from "../styles/Home.module.css";

function HomePage({ articles = [] }) {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>

      <h2 className={styles.title}>Welcome to Next.js!</h2>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>
              <a>{article.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// export async function getStaticProps() {
// const res = await getAllArticles();
// const articles = res.data;
// if (!articles) {
//   return {
//     notFound: true,
//   };
// }
//
// return {
//   props: {
//     articles,
//   }, // will be passed to the page component as props
// };
// }

export default withAuth(HomePage);
