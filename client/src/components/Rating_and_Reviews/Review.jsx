import React from 'react';
import axios from 'axios';

const Review = ({ reviewData }) => {
  const { date, rating, reviewer_name, summary, body, recommend, response, helpfulness, review_id } = reviewData;
  const readableDate = new Date(date).toLocaleDateString(
    'en-us',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  const handleYesClick = () => {
    axios.put(`/api/reviews/${review_id}`)
      .then(() => console.log(`Marked review as helpful! :)`))
      .catch((err) => console.log(`Couldn't mark review as helpful :(`, err));
  }

  const handleReportClick = () => {
    axios.put(`/api/reviews/${review_id}`)
      .then(() => console.log(`Reported review! :)`))
      .catch((err) => console.log(`Couldn't report the review :(`, err));
  }

  return (
    <div>
      <div>
        <div>star rating {rating}</div>
        <div>{reviewer_name}, {readableDate}</div>
      </div>
      <div>{summary}</div>
      <div>{body}</div>
      {recommend && <div>checkmark I recommend this product</div>}
      {response && <div>{response}</div>}
      <div>
        Helpful? <span>Yes</span>({helpfulness}) | <span>Report</span>
      </div>
    </div>
  )
}

export default Review;