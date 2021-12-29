import css from "./reduxFormFields.module.css";
import { Input } from "antd";

export const customInput = ({ input, type, placeholder, meta: { touched, error, warning } }) => {
  let inputStyle = { width: "90%" };

  return (
    <div>
      <div>
        <Input {...input} style={inputStyle} placeholder={placeholder} type={type} className="" />
      </div>
      <div className={css.errorDiv}>
        {touched &&
          ((error && <span className={css.error}>{error}</span>) ||
            (warning && <span className={css.warning}>{warning}</span>))}
      </div>
    </div>
  );
};
