/**
 * Created by chalosalvador on 17/01/2019.
 */

const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  REGISTER: "/registro",
  RESET_PASSWORD: "/olvide-mi-clave",
  ARTICLES: "/pagina-1",
  USERS: "/usuarios",
  USERS_ID: `/usuario/:id`,
  ABOUT: "/sobre-nosotros",
};

const privateRoutes = {
  HOME: "/",
  // ARTICLE_ID: "/articulo/:id",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
