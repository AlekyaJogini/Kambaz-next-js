"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as coursesClient from "../client";

export default function PeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  
  const fetchUsers = async () => {
    if (!cid) return;
    const users = await coursesClient.findUsersForCourse(cid as string);
    setUsers(users);
  };
  
  useEffect(() => {
    fetchUsers();
  }, [cid]);
  
  return (
    <div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}