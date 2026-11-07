
import {
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import type { ComponentRef } from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { SportColors } from '@/theme';
import { PichangaStyles as s } from '@/theme/pichanga-styles';

type ControlledFormFieldProps<T extends FieldValues> = Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onBlur'
> & {
  label: string;
  name: Path<T>;
  control: Control<T, any, any>;
  inputRef?: React.Ref<ComponentRef<typeof TextInput>>;
};


export function FormField<T extends FieldValues = FieldValues>(
  props: ControlledFormFieldProps<T>,
) {
  const { label, name, control, inputRef, ...inputProps } = props;

  return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View style={s.field}>
            <Text style={s.label}>{label}</Text>
            <TextInput
              {...inputProps}
              ref={inputRef}
              accessibilityLabel={label}
              value={value == null ? '' : String(value)}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor={SportColors.muted}
              style={[s.input, error ? s.inputError : undefined]}
            />
            {error?.message ? (
              <Text accessibilityRole="alert" style={s.errorText}>
                {error.message}
              </Text>
            ) : null}
          </View>
        )}
      />
  );
}
