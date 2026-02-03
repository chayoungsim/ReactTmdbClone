import React from 'react'

const Profile = ({name, hobby, age}) => {
    
  return (
    <div className="profile-card">
        <h2>안녕하세요. {name}입니다!!</h2>
        <p>취미느 {hobby} 입니다.</p>
        <p>나이은 {age}세 입니다.</p>
    </div>
  )
}

export default Profile;
