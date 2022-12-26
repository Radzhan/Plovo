import React from "react";
import type {User} from '../../types'

interface Props {
    user: User;
}

const UsersItem: React.FC<Props> = ({user}) => {
    
    const isActive = () => {
        if (user.active === true){
            return 'Active !'
        } else if (user.active === false){
            return 'not Active'
        } 
    }

    return (
        <div className="card mb-2">
          <div className="row no-gutters">
            <div className="col-sm-8">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                    <h3 className="card-title">{user.name}</h3>
                    <h4 className="card-text small">{user.role}</h4>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <p className="card-text" >{user.email}</p>
                    <p className="card-text">{isActive()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default UsersItem