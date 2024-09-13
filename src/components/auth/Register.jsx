import { useState } from "react";
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

export default function Register() {
  const initialValues = {
    name: '',
    email: "",
    password: "",
    msg: false,
    errMsg: "",
  };
  const [inputs, setInputs] = useState(initialValues);

  // Handle register
  const handleRegister = (e) => {
    e.preventDefault();
    
    const { name, email, password } = inputs

    if(!name || !email || !password) {
      setInputs((prev) => ({
        ...prev,
        errMsg: "All the fields are required",
      }));
      return;
    }

    (async () => {
      const res = await Fetch("/auth/register", {
        method: "POST",
        body: {
          name,
          email,
          password,
        },
      });
      
      if (res?.error) {
        setInputs((prev) => ({
          ...prev,
          errMsg: res?.msg,
        }));
        return;
      }

      setInputs(prev=>({
        ...initialValues,
        msg: 'Registration successfull, Login please...'
      }));
      
    })();
  };

  return (
    <form onSubmit={handleRegister}>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            value={inputs.name}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            type="text"
            id="name"
            placeholder="Enter your name"
          />
        </div>
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
          <div className="text-sm text-red-500">{inputs.errMsg}</div>
          {inputs.msg
          &&<div className="text-sm text-green-600">{inputs.msg}</div>
          }
          <Button>Get Registered</Button>
        </div>
      </CardFooter>
    </form>
  );
}
