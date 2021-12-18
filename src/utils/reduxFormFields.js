import s from "./reduxFormFields.module.css";

export const customInput = ({ input, type, placeholder, meta: { touched, error, warning } }) => {
  return (
    <div>
      <div>
        <input {...input} placeholder={placeholder} type={type} />
        {touched &&
          ((error && <span className={s.error}>{error}</span>) ||
            (warning && <span className={s.warning}>{warning}</span>))}
      </div>
    </div>
  );
};
