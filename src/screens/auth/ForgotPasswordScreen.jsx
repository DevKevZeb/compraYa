import { zodResolver } from '@hookform/resolvers/zod';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { AuthFooterLink } from '../../components/AuthFooterLink';
import { AuthLayout } from '../../components/AuthLayout';
import { FormInput } from '../../components/FormInput';
import { supabase } from '../../lib/supabase';
import { ForgotSchema } from '../../schemas/forms';
import { PASSWORD_RESET_PATH } from '../../services/auth';
import { radius } from '../../theme';

export const ForgotPasswordScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(ForgotSchema),
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ email }) => {
    setLoading(true);
    // The email link opens the app (see RootNavigator), which then asks for a new password.
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: Linking.createURL(PASSWORD_RESET_PATH),
    });
    setLoading(false);

    if (error) {
      Toast.show({ type: 'error', text1: 'Could not send the email', text2: error.message });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Check your inbox',
      text2: 'Open the link on this device to choose a new password.',
      visibilityTime: 6000,
    });
    reset();
    navigation.navigate('SignIn');
  };

  return (
    <AuthLayout
      navigation={navigation}
      title="Reset your password"
      subtitle="Enter the email linked to your account and we'll send you a reset link."
      footer={
        <AuthFooterLink
          question="Remembered it?"
          action="Back to sign in"
          onPress={() => navigation.navigate('SignIn')}
        />
      }
    >
      <FormInput
        name="email"
        control={control}
        label="Email"
        placeholder="you@example.com"
        type="email"
        icon="email-outline"
        autoComplete="email"
        error={errors.email}
      />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        disabled={loading}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Send reset link
      </Button>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.pill,
    marginTop: 8,
  },
  buttonContent: {
    height: 50,
  },
});
