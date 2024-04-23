import { useForm } from "react-hook-form";
import PasswordValidator from "password-validator";
import emailValidator from "email-validator";

// Define the password validation schema
const passwordSchema = new PasswordValidator();
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(20) // Maximum length 12
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has(/\W|_/, "Must have at least one special character") // Must have at least one special character
  .has()
  .not()
  .spaces(); // Should not have spaces

export default function useSignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const password = watch("password");

  const validatePassword = (value) => {
    const failedRules = passwordSchema.validate(value, { details: true });
    if (failedRules.length > 0) {
      const messages = failedRules.map((rule) =>
        rule.message.replace("string", "password")
      );
      return messages.join(",");
    }
    return true;
  };

  // Define your form fields with validation rules here
  const formFields = {
    username: register("username", { required: "Username is required" }),
    email: register("email", {
      required: "Email is required",
      validate: (value) =>
        emailValidator.validate(value) || "Invalid email address",
    }),
    firstName: register("firstName", { required: "First name is required" }),
    lastName: register("lastName", { required: "Last name is required" }),
    password: register("password", {
      required: "Password is required",
      validate: validatePassword,
    }),
    confirmPassword: register("confirmPassword", {
      validate: (value) => value === password || "Passwords do not match",
    }),
  };

  return { handleSubmit, formFields, errors, isValid };
}
