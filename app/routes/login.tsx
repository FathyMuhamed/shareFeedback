import { useState } from "react";
import Layout from "~/components/layout";
import FormField from "./../components/form-field";

const styles = {
  button:
    "px-3 py-2 mt-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-700 cursor-pointer rounded-xl hover:bg-blue-300 hover:-translate-y-1",
};

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
        <form action='post' className='p-6 bg-blue-100 shadow rounded-2xl w-96'>
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
