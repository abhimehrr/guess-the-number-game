import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fetch } from "@/utils/fetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
    err: "",
  };
  const [inputs, setInputs] = useState(initialValues);

  const navigate = useNavigate();

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = inputs;

    if (!email || email.length < 8 || !password) {
      setInputs((prev) => ({
        ...prev,
        err: "Enter email or password",
      }));
      return;
    }

    (async () => {
      const res = await Fetch("/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });
      if (!res.login) {
        setInputs((prev) => ({
          ...prev,
          err: "Invalid credentials",
        }));
        return;
      }

      setInputs((prev) => ({
        ...prev,
        err: "",
      }));
      localStorage.setItem('token', res.token)
      navigate("/", { replace: true });
    })();
  };

  return (
    <form onSubmit={handleLogin}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>to access your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            value={inputs.email}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            value={inputs.password}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            id="password"
            type="password"
            placeholder="Enter your Password"
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="space-y-2">
          <div className="text-sm text-red-500">{inputs.err}</div>
          <Button>Login</Button>
        </div>
      </CardFooter>
    </form>
  );
}
