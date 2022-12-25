import React, { useState } from "react";
import type {User, UserMutation} from "../../types"


interface Props {
    onSubmit: (user: User) => void
}

const UserForm:React.FC<Props> = ({onSubmit}) => {
    const [user, setUser] = useState<UserMutation>({
        name:'',
        role:'',
        email: '',
        in: false,
    })

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({
            id: Math.random().toString(),
            ...user,
            in: user.in,
        })
    }
    return (
        <form onSubmit={onFormSubmit}>
            <h4>create user</h4>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" className="form-control" value={user.name} onChange={(e) => {
                    setUser(prev => ({...prev, name: e.target.value}))
                }}/>
            </div>
            <div className="form-group">
                <label htmlFor="role">Rolw</label>
                <select name="role" id="role" className="form-control" value={user.role} onChange={(e) => {
                    setUser(prev => ({...prev, role: e.target.value}))
                }}>
                    <option disabled></option>
                    <option>user</option>
                    <option>editor</option>
                    <option>admin</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="form-control" value={user.email} onChange={(e) => {
                    setUser(prev => ({...prev, email: e.target.value}))
                }}/>
            </div>
            <div className="mb-2">
                <label htmlFor="in">Active</label>
                <input type="checkbox" id="in" name="in" checked={user.in} onChange={(e) => {
                    setUser(prev => ({...prev, in: e.target.checked}))
                }}/>
            </div>
            <button type="submit" className="btn btn-primary">create</button>
        </form>
    )
}

export default UserForm