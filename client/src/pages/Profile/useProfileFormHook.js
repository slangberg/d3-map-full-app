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
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const password = watch("newPassword");
  const validatePassword = (value) => {
    if (!value) return true; // If no value, no need to validate
    const failedRules = passwordSchema.validate(value, { details: true });
    if (failedRules.length > 0) {
      const messages = failedRules.map((rule) =>
        rule.message.replace("string", "password")
      );
      return messages.join(",");
    }
    return true;
  };

  const validateConfirmPassword = (value) => {
    if (!password) {
      return true;
    }
    if (!value) {
      return "Confirm Password is required";
    }
    return value === password || "Passwords do not match";
  };

  const formFields = {
    email: register("email", {
      required: "Email is required",
      validate: (value) =>
        emailValidator.validate(value) || "Invalid email address",
    }),
    firstName: register("firstName", { required: "First name is required" }),
    lastName: register("lastName", { required: "Last name is required" }),
    oldPassword: register("oldPassword", {
      required: "Your password is required to update your profile",
    }),
    newPassword: register("newPassword", {
      validate: validatePassword,
    }),
    confirmPassword: register("confirmPassword", {
      required: password ? "Confirm Password is required" : false,
      validate: validateConfirmPassword,
    }),
  };

  return { handleSubmit, formFields, errors, isValid, setValue: reset };
}
