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
import { useSnackbar } from 'notistack';

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa un correo válido")
    .required("Ingresa tu correo electrónico"),
});

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },
  buttonWrapper: {
    textAlign: "center",
  },
}));

function PasswordResetPage() {
  const { sendPasswordResetEmail } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onReset = async ({ email }) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(email);
      console.log('Email enviado con éxito');
      enqueueSnackbar("El correo de restablecimiento de contraseña fue enviado correctamente.", {
        variant: "success",
        anchorOrigin: {
          horizontal: "center",
          vertical: "bottom",
        },
      });
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
        <title>Olvidé mi clave</title>
      </Head>

      <Typography variant="h3" align="center">
        Restablecer tu contraseña
      </Typography>

      <Typography variant="subtitle1" align="center">
        ¿No tienes una cuenta?{" "}
        <Link href={Routes.REGISTER} passHref>
          <MuiLink>Crea una ahora</MuiLink>
        </Link>
      </Typography>

      <Grid container justify="center">
        <Grid item xs={6}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onReset)}>
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
              <Grid xs={12} item className={classes.buttonWrapper}>
                <Button
                  name="submit"
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                >
                  Confirmar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default withoutAuth(PasswordResetPage);
