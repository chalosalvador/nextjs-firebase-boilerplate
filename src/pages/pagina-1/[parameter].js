/**
 * Created by chalosalvador on 5/2/21
 */
import { useRouter } from "next/router";
// import { getAllArticles, getArticle } from "../../lib/db";

const ItemDetails = ({ item }) => {
  const router = useRouter();
  const { parameter } = router.query;

  return (
    <div>
      <div>Parameter {parameter}</div>
      <div>{item.title}</div>
    </div>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  // const response = await getAllArticles();
  // const articles = response.data;

  // Get the paths we want to pre-render based on posts
  const items = [1, 2, 3, 4, 5];
  const paths = items.map((item) => ({
    params: { parameter: "" + item },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { parameter } = context.params;
  // const article = await getArticle(articleId);

  // console.log("article", article);
  let item = {
    title: "Titulo del item",
  };
  if (!item) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      item,
    }, // will be passed to the page component as props
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    // revalidate: 1, // In seconds
  };
}

export default ItemDetails;
