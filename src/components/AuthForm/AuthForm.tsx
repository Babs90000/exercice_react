import styles from "./AuthForm.module.css";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface FormErrors {
  name: string | null;
  email: string | null;
  password: string | null;
  passwordConfirmation: string | null;
}

export default function AuthForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: null,
    email: null,
    password: null,
    passwordConfirmation: null,
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  function nameVerification() {
    if (formData.name === "") {
      setErrors({ ...errors, name: "Veuillez saisir un nom" });
    } else {
      setErrors({ ...errors, name: null });
    }
  }

  function emailVerification() {
    if (formData.email.includes("@") && formData.email.includes(".")) {
      setErrors({ ...errors, email: null });
    } else {
      setErrors({ ...errors, email: "Veuillez saisir un email correct" });
    }
  }

  function passwordVerification() {
    if (formData.password.length < 7) {
      setErrors({
        ...errors,
        password: "Le mot de passe doit contenir au moins 7 caractères",
      });
    } else {
      setErrors({ ...errors, password: null });
    }
  }

  function passwordDoubleCheckVerification() {
    if (formData.passwordConfirmation !== formData.password) {
      setErrors({
        ...errors,
        passwordConfirmation:
          "La confirmation doit être identique au mot de passe",
      });
    } else {
      setErrors({ ...errors, passwordConfirmation: null });
    }
  }

  function formSubmit(e) {
    e.preventDefault();

    if (
      errors.email == null &&
      errors.name == null &&
      errors.password == null &&
      errors.passwordConfirmation == null &&
      formData.email !== "" &&
      formData.name !== "" &&
      formData.password !== "" &&
      formData.passwordConfirmation !== ""
    ) {
      setIsSubmitted(true);
    } else {
      alert("Veuillez rempliir tous les champs correctement");
    }
  }

  const isValidForm = (): boolean => {
    return (
      errors.email == null &&
      errors.name == null &&
      errors.password == null &&
      errors.passwordConfirmation == null &&
      formData.email !== "" &&
      formData.name !== "" &&
      formData.password !== "" &&
      formData.passwordConfirmation !== ""
    );
  };

  const Data = (
    <div>
      <h1>Formulaire soumis avec succès</h1>
      <p>Nom : {formData.name}</p>
      <p>email {formData.email}</p>
    </div>
  );

  function submitOtherForm() {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });
    setErrors({
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null,
    });
  }
  console.log(`Data : ${Data}`);

  console.log(formData);

  return (
    <div>
      <form className={styles.Form} onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onBlur={nameVerification}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onBlur={emailVerification}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        <input
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          onBlur={passwordVerification}
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        <input
          type="password"
          placeholder="Saisissez à nouveau votre mot de passe"
          value={formData.passwordConfirmation}
          onChange={(e) =>
            setFormData({ ...formData, passwordConfirmation: e.target.value })
          }
          onBlur={passwordDoubleCheckVerification}
        />
        {errors.passwordConfirmation && (
          <p className={styles.error}>{errors.passwordConfirmation}</p>
        )}
        <input type="submit" value="Soumettre" disabled={!isValidForm()} />
      </form>

      {isSubmitted && Data}
      {isSubmitted && (
        <input
          onClick={submitOtherForm}
          type="submit"
          value="Soumettre un nouveau formulaire"
        />
      )}
    </div>
  );
}
