import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "../node_modules/axios"

const UserForm = ({ values, errors, touched, status }) => {
    const [users, setUser] = useState([]);
    useEffect(() => {
        if (status) {
            setUser([...users, status])
        }
    }, [status])
        
  return (
    <div>
        <Form>
         {touched.firstname && errors.firstname && <p>{errors.firstname}</p>}    
            <Field type="text" placeholder="first name" name="firstname" />
            <div>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field type="email" placeholder="email address" name="email" />
            </div>
            <div>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field type="current-password" placeholder="password" name="password" />
            </div>
            <Field type="checkbox" name="TermsofService" />
            <button type="submit">Submit</button>
        </Form >
        {users.map(userItem => (
            <ul>
                <li>
                    Name:{userItem.username}
                    Email:{userItem.email}
                </li>
                <li>

                </li>
            </ul>
        ))}
        </div>
    )
    
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, termsOfService }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: termsOfService || false,
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email()
            .required("A valid email address is required."),
        password: Yup.string()
            .min(6)
            .required("A 6-character password is required."),
        // termsOfService: Yup.bool()
        // .test(
        //     'termsOfService',
        //     'Please accept our Terms of Service agreement',
        //     value => value === true
        //   )
        // .required("Please accept our Terms of Service agreement"),     
    }),

    handleSubmit(values, {setStatus, resetForm, setErrors, setSubmitting }) {
        if (values.email === "waffles@syrup.com") {
          setErrors({ email: "That email is already taken" });
        } else {
          axios
            .post("https://reqres.in/api/users", values)
            .then(response => {
            setStatus(response.data);
              console.log(response);
              resetForm();
              setSubmitting(false);
            })
            .catch(error => {
              console.log(error.response); 
              setSubmitting(false);
            });
        }
    }
})(UserForm)

export default FormikUserForm