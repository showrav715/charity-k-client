import { baseUrl } from "../BaseUrl";

const api = baseUrl;

const RegisterSubmit = async (
  email: string,
  password: string,
  confirm_password: string,
  name: string
) => {
  const res = await fetch(`${api}/api/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, confirm_password }),
  });
  const data = await res.json();
  return data;
};

const LoginSubmit = async (email: string, password: string) => {
  const res = await fetch(`${api}/api/user/login`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return data;
};


const ForgotSubmit = async (email: string) => {
  const res = await fetch(`${api}/api/user/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  return data;
};


const EmailVerification = async (email: string,code:string) => {
  const res = await fetch(`${api}/api/user/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email,code }),
  });
  const data = await res.json();
  return data;
};


const verifyEmailResendCode = async (email: string) => {
  const res = await fetch(`${api}/api/user/resend/verify-email/code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  return data;
};


const newPasswordSubmit = async ({password,password_confirmation,code}:
  {
    password: string;
    password_confirmation: string;
    code: string;
  }) => {
  const res = await fetch(`${api}/api/user/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password,password_confirmation,code }),
  });
  const data = await res.json();
  return data;
};



const Logout = async (token: string) => {
  const res = await fetch(`${api}/api/user/logout`, {
    cache: "no-cache",
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export { RegisterSubmit, LoginSubmit,ForgotSubmit,newPasswordSubmit,EmailVerification,verifyEmailResendCode, Logout };
