import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button, Link as MuiLink, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";

import withoutAuth from "../hocs/withoutAuth";
import { useAuth } from "../lib/auth";
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
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las claves no coinciden")
    .required("Required"),
});

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  buttonWrapper: {
    textAlign: "center",
  },
}));

function RegisterPage() {
  const { register: callRegister } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const onRegister = async (data) => {
    setLoading(true);
    try {
      await callRegister({
        ...data,
        role: "ROLE_USER",
      });
      // setLoading(false);
    } catch (error) {
      console.log("error", error);
      enqueueSnackbar(error.message, {
        variant: "error",
        anchorOrigin: {
          horizontal: "center",
          vertical: "bottom",
        },
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Crear cuenta</title>
      </Head>
      <Typography variant="h3" align="center">
        Crear cuenta
      </Typography>

      <Typography variant="subtitle1" align="center">
        ¿Ya tienes una cuenta?{" "}
        <Link href={Routes.LOGIN} passHref>
          <MuiLink>Inicia sesión</MuiLink>
        </Link>
      </Typography>

      <Grid container justify="center">
        <Grid item xs={6}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onRegister)}
          >
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid xs={12} item>
                <TextField
                  id="name"
                  name="name"
                  type="text"
                  label="Nombre"
                  inputRef={register}
                  autoComplete="name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

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

              <Grid xs={12} item>
                <TextField
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  label="Confirmar clave"
                  inputRef={register}
                  autoComplete="current-password"
                  error={!!errors.password_confirmation}
                  helperText={errors.password_confirmation?.message}
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
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default withoutAuth(RegisterPage);
