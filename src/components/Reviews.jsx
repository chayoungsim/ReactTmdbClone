import React from 'react'

const Reviews = ({reviews}) => {
    // 날짜 포맷 함수
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  return (
    <div>
        {reviews.length > 0 ? (
          <div className="review-lists">
              {reviews.slice(0, 6).map((item) => (
                    <div key={item.id} className="review-card">
                        <h3>
                            <div className="profile">
                                <div className="avatar">
                                    <img src={item.author_details.avatar_path?.startsWith('/http') 
                                        ? item.author_details.avatar_path.substring(1): item.author_details.avatar_path 
                                    ? `https://image.tmdb.org/t/p/w45${item.author_details.avatar_path}`
                                    : `https://ui-avatars.com/api/?name=${item.author}&background=random`} 
                                        alt={item.author} 
                                    />
                                </div>
                                {item.author}
                            </div> 
                            <span className="date">{new Date(item.created_at).toLocaleDateString()}</span>
                            </h3>                        
                        <p className="desc">{item.content}</p>
                    </div>
                ))}       
          </div>

        ) : (
            <div>등록된 리뷰가 없습니다.</div>
        )}
    </div>
  )
}

export default Reviews