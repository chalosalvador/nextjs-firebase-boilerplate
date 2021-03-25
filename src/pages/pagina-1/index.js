/**
 * Created by chalosalvador on 5/2/21
 */

// import { getAllArticles } from "../../lib/db";
import Link from "next/link";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Link as MuiLink,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Routes from "../../constants/routes";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  title: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 1,
    "-webkit-box-orient": "vertical",
  },
  body: {
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
  },
});

const Page1 = ({ articles = [] }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {articles.map((article, index) => (
        <Grid item xs={12} sm={6} md={4} key={article.id}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={article.title}
                height="140"
                // faker image no está funcionando así que pongo otro source para que se presenten las imagenes
                // image={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${article.image}`}
                // image={`https://source.unsplash.com/random/400x200?sig=${index}`}
                image={`https://picsum.photos/200/300?sig=${index}`}
                title={article.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.title}
                >
                  {article.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.body}
                >
                  {article.body}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Compartir
              </Button>
              <Button size="small" color="primary">
                <Link href={`${Routes.ARTICLES}/${article.id}`} passHref>
                  <MuiLink>Ver más</MuiLink>
                </Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export async function getStaticProps(context) {
  // const response = await getAllArticles();
  // const articles = response.data;
  const articles = [
    {
      title: "Title",
      body: "Lorem ipsum",
      id: 1,
    },
    {
      title: "Title",
      body: "Lorem ipsum",
      id: 2,
    },
    {
      title: "Title",
      body: "Lorem ipsum",
      id: 3,
    },
    {
      title: "Title",
      body: "Lorem ipsum",
      id: 4,
    },
  ];

  return {
    props: {
      articles,
    }, // will be passed to the page component as props
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    // revalidate: 1, // In seconds
  };
}

export default Page1;
