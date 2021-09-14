import React from 'react';

const Review = ({ reviewData }) => {
  const { date, rating, reviewer_name, summary, body, recommend, response, helpfulness } = reviewData;
  const readableDate = new Date(date).toLocaleDateString(
    'en-us',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  return (
    <div>
      <div>
        <div>{rating}</div>
        <div>{reviewer_name}, {readableDate}</div>
      </div>
      <div>{summary}</div>
      <div>{body}</div>
      {recommend && <div>checkmark I recommend this product</div>}
      {response && <div>reviewData.response</div>}
      <div>
        Helpful?
        <span>Yes({helpfulness})</span> | <span>Report</span>
      </div>
    </div>
  )
}

export default Review;