import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Auth() {
  return (
    <div className="flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <Login />
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <Register />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
