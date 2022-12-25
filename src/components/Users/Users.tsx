import React from "react";
import UsersItem from "./UsersItem";
import type {User} from '../../types'

interface Props {
    users: User[],
}

const Users: React.FC<Props> = ({users}) => {
    return (
        <>
            <h4>Users</h4>
            {users.map((user)=> (
                <UsersItem key={user.id} user={user}/>
            ))}
        </>
    )
}

export default Users