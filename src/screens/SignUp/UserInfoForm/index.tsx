import { View } from "react-native";
import { useTabNavigation } from "react-native-paper-tabs";
import { Controller, useForm } from "react-hook-form";

import { Button } from "../../../components/Button";
import { TextInput } from "../../../components/TextInput";
import { InvalidFormText } from "../../../components/Form/InvalidFormText";
import { withKeyboardAwareScrollView } from "../../../components/withKeyboardAwareScrollView";
import { maskCellphone } from "../../../utils/masks";

import { NewUserProps } from "../../../lib/props/NewUserProps";
import { styles } from "./styles";

type UserInfoFormProps = {
  newUser: NewUserProps;
  setNewUser: (newUser: NewUserProps) => void;
};

type FormDataProps = {
  firstName: string;
  lastName: string;
  phone: string;
};
function UserInfoForm({ newUser, setNewUser }: UserInfoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      phone: "",
    },
  });

  const goTo = useTabNavigation();

  const submit = handleSubmit(() => {
    goTo(1);
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentInputs}>
        <View style={styles.input}>
          <Controller
            name="firstName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Nome"
                value={value}
                onChangeText={(text) => {
                  setNewUser({ ...newUser, firstName: text });
                  onChange(text);
                }}
                error={errors.firstName ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.firstName && <InvalidFormText title="Insira o seu nome!" />}
        </View>
        <View style={styles.input}>
          <Controller
            name="lastName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Sobrenome"
                value={value}
                onChangeText={(text) => {
                  setNewUser({ ...newUser, lastName: text });
                  onChange(text);
                }}
                error={errors.lastName ? true : false}
              />
            )}
            rules={{ required: true }}
          />
          {errors.lastName && (
            <InvalidFormText title="Insira o seu sobrenome!" />
          )}
        </View>
        <Controller
          name="phone"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Celular"
              placeholder="(00) 00000-0000"
              value={value}
              maxLength={15}
              onChangeText={(text) => {
                setNewUser({ ...newUser, phone: text });
                onChange(maskCellphone(text));
              }}
              keyboardType="phone-pad"
            />
          )}
        />
      </View>
      <Button onPress={submit}>Proximo</Button>
    </View>
  );
}

export default withKeyboardAwareScrollView(UserInfoForm);
