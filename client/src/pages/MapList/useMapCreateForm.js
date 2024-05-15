import { useForm } from "react-hook-form";

export default function useSignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const formFields = {
    file: register("file", { required: "Image required" }),
    title: register("title", { required: "Title required" }),
    description: register("description", { required: "Description required" }),
  };

  const clearForm = () => {
    reset();
  };

  return {
    handleSubmit,
    formFields,
    errors,
    isValid,
    setValues: reset,
    clearForm,
    setValue,
  };
}
