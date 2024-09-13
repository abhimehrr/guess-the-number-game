import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fetch } from "@/utils/fetch";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await Fetch("/get-top-users", {
        method: "POST",
        body: {
          limit: 10,
        },
      });
      if (res?.error) {
        window.alert(res?.msg);
        return;
      }
      setUsers(res?.users);
    })();
  }, []);
  return (
    <div className="max-w-[600px] mx-auto my-4 max-sm:px-2">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-wide mb-4">
        Top 10 Players 🔥
      </h1>
      <div className="bg-slate-100 py-2 rouned">
        <Table>
          <TableCaption>A list of top and best player</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">High Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users?.map((user, i) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-center">
                    {i + 1}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-center">{user.score}</TableCell>
                </TableRow>
              ))}
            <TableRow />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
