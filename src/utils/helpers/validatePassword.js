export const validatePassword = (password, setValError) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.#$!%*?&^_])[A-Za-z\d@.#$!%*?&^_]{8,}$/;

  if (!passwordRegex.test(password)) {
    setValError({
      message:
        "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben, eine Zahl sowie ein Sonderzeichen (@.#$!%*?&^_) enthalten.",
    });
  } else {
    setValError(null);
  }
};
