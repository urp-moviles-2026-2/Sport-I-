
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

type LegacyFormFieldProps = TextInputProps & {
  label: string;
};

type FormFieldProps<T extends FieldValues> =
  | ControlledFormFieldProps<T>
  | LegacyFormFieldProps;

export function FormField<T extends FieldValues = FieldValues>(
  props: FormFieldProps<T>,
) {
  if ('control' in props && props.control && 'name' in props && props.name) {
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
              style={[
                s.input,
                error ? { borderColor: '#DC2626', borderWidth: 1 } : undefined,
              ]}
            />
            {error?.message ? (
              <Text
                accessibilityRole="alert"
                style={{ color: '#DC2626', fontSize: 12, marginTop: 4 }}
              >
                {error.message}
              </Text>
            ) : null}
          </View>
        )}
      />
    );
  }

  const { label, ...inputProps } = props as LegacyFormFieldProps;

  return (
    <View style={s.field}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        {...inputProps}
        accessibilityLabel={label}
        style={s.input}
        placeholderTextColor={SportColors.muted}
      />
    </View>
  );
}
