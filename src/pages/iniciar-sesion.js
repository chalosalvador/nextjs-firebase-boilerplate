import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button, Link as MuiLink, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "../lib/auth";
import withoutAuth from "../hocs/withoutAuth";
import Routes from "../constants/routes";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa un correo válido")
    .required("Ingresa tu correo electrónico"),
  password: yup
    .string()
    .required("Ingresa tu clave")
    .min(6, "La clave debe tener al menos 6 caracteres"),
});

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  buttonWrapper: {
    textAlign: "center",
  },
}));

function LoginPage() {
  const { login } = useAuth();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onLogin = async ({ email, password }) => {
    setLoading(true);
    await login(email, password);
    // setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Iniciar sesión</title>
      </Head>

      <Typography variant="h3" align="center">
        Iniciar sesión
      </Typography>

      <Typography variant="subtitle1" align="center">
        ¿No tienes una cuenta?{" "}
        <Link href={Routes.REGISTER} passHref>
          <MuiLink>Crea una ahora</MuiLink>
        </Link>
      </Typography>

      <Grid container justify="center">
        <Grid item xs={6}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onLogin)}>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid xs={12} item>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  inputRef={register}
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Clave"
                  inputRef={register}
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid xs={12} item className={classes.buttonWrapper}>
                <Button
                  name="submit"
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                >
                  Iniciar sesión
                </Button>
              </Grid>
            </Grid>
          </form>
          <br></br>
          <Typography variant="subtitle1" align="center">
            ¿Olvidaste tu clave?{" "}
            <Link href={Routes.RESET_PASSWORD} passHref>
              <MuiLink>Restablécela aquí</MuiLink>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default withoutAuth(LoginPage);
