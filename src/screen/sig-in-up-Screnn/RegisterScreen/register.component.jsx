import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import face from "../../../../assets/face.png";
import google from "../../../../assets/google.png";
import { supabase } from "../../../../lib/initSupaBase";
import { CustomInputComponent } from "../../../components/CustomInput.component";
import { RegisterSchema } from "../../../models/form.model";

export const RegisterComponent = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const { name, email, password } = data;

    // Registrar usuario en Supabase Auth
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: authError.message,
      });
      return;
    }

    // Guardar información del usuario en la tabla "usuarios"
    const { error: dbError } = await supabase
      .from("usuarios")
      .insert([
        {
          nombre_usuario: name,
          correo_electronico: email,
          contraseña_hash: password,
        },
      ]);

    setLoading(false);

    if (dbError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: dbError.message,
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Success",
        text2:
          "Por favor, verifica tu correo electrónico para completar el registro.",
      });
      reset();
      navigation.navigate("SigIn");
    }

  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.text}>
        ¡Bienvenido! Regístrate para comenzar.
      </Text>
      <View style={styles.inputContainer}>
        <CustomInputComponent
          name="name"
          control={control}
          label="Nombre"
          placeholder="Nombre completo"
          type="text"
          error={errors.name}
        />
        <CustomInputComponent
          name="email"
          control={control}
          label="Email"
          placeholder="Ingresa tu email"
          type="email"
          error={errors.email}
        />
        <CustomInputComponent
          name="password"
          control={control}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          secureTextEntry={true}
          type="password"
          error={errors.password}
        />
        <CustomInputComponent
          name="confirmPassword"
          control={control}
          label="Confirmar"
          placeholder="Confirma tu contraseña"
          secureTextEntry={true}
          type="password"
          error={errors.confirmPassword}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        >
          Registrarte
        </Button>
      </View>
      <Divider horizontalInset={true} bold={true} style={{ marginTop: 20 }} />
      <Text variant="titleMedium" style={styles.text}>
        O ingresa con
      </Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Image source={face} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image source={google} />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text variant="titleSmall">¿Ya tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text variant="titleSmall" style={{ color: "#0866FF" }}>
            Ingresa ahora
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#EADDFF",
  },
  text: {
    textAlign: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#9C7CFE",
    marginTop: 40,
    width: "70%",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  socialContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 50,
    marginTop: 40,
    marginBottom: 60,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 30,
  },
});
