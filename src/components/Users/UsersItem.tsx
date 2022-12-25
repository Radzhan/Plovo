import React from "react";
import type {User} from '../../types'

interface Props {
    user: User;
}

const UsersItem: React.FC<Props> = ({user}) => {
    return (
        <div className="card mb-2">
          <div className="row no-gutters">
            <div className="col-sm-8">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text small">{user.role}</p>
                <p className="card-text">{user.in} KGS</p>
              </div>
            </div>
          </div>
        </div>
    );
}

export default UsersItem