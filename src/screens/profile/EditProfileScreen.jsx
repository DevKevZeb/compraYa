import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { FormInput } from '../../components/FormInput';
import { supabase } from '../../lib/supabase';
import { DataUserSchema } from '../../schemas/forms';
import { useUserStore } from '../../stores/user.store';
import { colors, radius, spacing } from '../../theme';
import { getInitials } from '../../utils/user';

export const EditProfileScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '' },
    resolver: zodResolver(DataUserSchema),
    mode: 'onBlur',
  });

  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      setValue('name', user.nombre_usuario);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const showError = (message) =>
    Toast.show({ type: 'error', text1: 'Something went wrong', text2: message });

  const onSubmit = async ({ name, email }) => {
    setLoading(true);

    const { error: updateError } = await supabase
      .from('usuarios')
      .update({ nombre_usuario: name })
      .eq('usuario_id', user.userId);

    if (updateError) {
      setLoading(false);
      showError('We could not update your name.');
      return;
    }

    // Email changes go through Supabase Auth, which sends a confirmation email.
    // A database trigger mirrors the confirmed address into the profile.
    const emailChanged = email !== user.email;
    if (emailChanged) {
      const { error: authError } = await supabase.auth.updateUser({ email });
      if (authError) {
        setLoading(false);
        showError('We could not update your email address.');
        return;
      }
    }

    setUser({ ...user, nombre_usuario: name });
    setLoading(false);

    Toast.show({
      type: 'success',
      text1: 'Profile updated',
      text2: emailChanged ? 'Check your inbox to confirm your new email address.' : undefined,
    });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.avatarWrap}>
          <Avatar.Text
            size={84}
            label={getInitials(user?.nombre_usuario)}
            style={styles.avatar}
            color={colors.primary}
          />
          <Text variant="bodySmall" style={styles.hint}>
            Your initials are used as your avatar.
          </Text>
        </View>

        <View style={styles.card}>
          <FormInput
            name="name"
            control={control}
            label="Full name"
            icon="account-outline"
            autoComplete="name"
            error={errors.name}
          />
          <FormInput
            name="email"
            control={control}
            label="Email"
            type="email"
            icon="email-outline"
            autoComplete="email"
            error={errors.email}
          />
          <Text variant="bodySmall" style={styles.hint}>
            Changing your email sends a confirmation link to the new address.
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Save changes
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  avatarWrap: {
    alignItems: 'center',
    marginVertical: spacing.xl,
    gap: spacing.sm,
  },
  avatar: {
    backgroundColor: colors.primarySoft,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  hint: {
    color: colors.textMuted,
  },
  button: {
    marginTop: spacing.xxl,
    borderRadius: radius.pill,
  },
  buttonContent: {
    height: 50,
  },
});
