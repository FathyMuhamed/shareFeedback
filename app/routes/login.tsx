import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect, Request } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useState } from "react";
import Layout from "~/components/layout";
import { getUser, login, register } from "~/utils/auth.server";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "~/utils/validators.server";
import FormField from "./../components/form-field";

const styles = {
  button:
    "px-3 py-2 mt-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-700 cursor-pointer rounded-xl hover:bg-blue-300 hover:-translate-y-1",
};
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  let firstName = form.get("firstName");
  let lastName = form.get("lastName");

  if (
    typeof action !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }
  if (
    action === "register" &&
    (typeof firstName !== "string" || typeof lastName !== "string")
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }
  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === "register"
      ? {
          firstName: validateName((firstName as string) || ""),
          lastName: validateName((lastName as string) || ""),
        }
      : {}),
  };

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { email, password, firstName, lastName },
        form: action,
      },
      { status: 400 }
    );
  switch (action) {
    case "login": {
      return await login({ email, password });
    }
    case "register": {
      firstName = firstName as string;
      lastName = lastName as string;
      return await register({ email, password, firstName, lastName });
    }
    default:
      return json({ error: `Invalid Form Data` }, { status: 400 });
  }
};
// export const loader: LoaderFunction = async ({ request }: any) => {
//   // If there's already a user in the session, redirect to the home page
//   return (await getUser(request)) ? redirect("/") : null;
// };

export default function Login() {
  const [action, setAction] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => setFormData((form) => ({ ...form, [field]: event.target.value }));

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center h-full gap-y-4 '>
        <button
          className={`${styles.button} absolute top-8 right-8`}
          onClick={() => setAction(action == "login" ? "register" : "login")}>
          {action === "login" ? "Sign Up" : "Sign In"}
        </button>
        <h2 className='text-5xl font-extrabold text-blue-700 '>
          Welcome to shareFeedback.
        </h2>
        <p className='font-semibold text-slate-400'>
          {action === "login"
            ? "Login In To Give some praise!"
            : "Sign Up To Get Started"}
        </p>
        <form method='post' className='p-6 bg-blue-100 shadow rounded-2xl w-96'>
          <FormField
            label='Email'
            htmlFor='email'
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
          <FormField
            label='password'
            htmlFor='password'
            type='password'
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
          />
          {action === "register" && (
            <>
              <FormField
                label='FirstName'
                htmlFor='firstName'
                value={formData.firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
              />
              <FormField
                label='Last Name'
                htmlFor='lastName'
                value={formData.lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
              />
            </>
          )}

          <div className='w-full text-center'>
            <button
              type='submit'
              name='_action'
              value={action}
              className={styles.button}>
              {action === "login" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
