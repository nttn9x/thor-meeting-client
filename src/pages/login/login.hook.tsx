import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from "@thor/store";
import { selectUser, setUser } from "@thor/store/slices/user/user.slice";

const schema = yup
  .object({
    username: yup.string().trim().required(),
    password: yup.string().trim().required(),
  })
  .required();

interface ILoginForm {
  username: string;
  password: string;
}

const useLoginHook = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: ILoginForm) => {
    dispatch(setUser({ user: { ...values } }));
  };

  return { t, user, onSubmit, register, handleSubmit, errors };
};

export default useLoginHook;
