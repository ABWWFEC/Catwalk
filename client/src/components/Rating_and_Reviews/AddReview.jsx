import React from 'react';
import axios from 'axios';

const AddReview = () => {
  return (
    <div>
      <div>
        <div>Rate this product!</div>
        {[...Array(5)].map((rating, index) => {
          index += 1;
          return (
            <input type="radio" key={index} value={index} name="rating" />
          )
        })}
        <label>Some descriptor</label>
      </div>
      <div>
        <div>Would you recommend this product?</div>
        <label>Yes</label>
        <input type="radio" value={true} name="recommend"></input>
        <label>No</label>
        <input type="radio" value={false} name="recommend"></input>
      </div>
      <div>
        <div>Rate the characteristics of this product!</div>
        {[...Array(5)].map((rating, index) => {
            index += 1;
            return (
                <input type="radio" key={index} value={index} name="characteristic" />
            )
          })}
      </div>
      <div>
        <div>Review Summary</div>
        <input type="text" name="summary" placeholder="Example: Best purchase ever!"></input>
      </div>
      <div>
        <div>Tell us what you thought!</div>
        <textarea placeholder="Why did you like this product or not?"></textarea>
      </div>
      <button>Add photos</button>
      <div>
        <div>Username</div>
        <input type="text" name="nickname"></input>
        <div>For privacy reasons, do not use your full name or e-mail address</div>
      </div>
      <div>
        <div>E-mail</div>
        <input type="email" name="email"></input>
        <div>For authentication reasons, you will not be emailed</div>
      </div>
      <button>Submit!</button>
    </div>
  )
}

export default AddReview;