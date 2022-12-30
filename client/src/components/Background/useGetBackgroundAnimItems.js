import React from "react";
import { v4 as uuid } from 'uuid';

const stripeAmount = Math.ceil(window.innerWidth / 5) > 200 ? 200 : Math.ceil(window.innerWidth / 5);

const createSpans = (stripeAmount) => {

  const spans = [];
  for (let i = 0; i < stripeAmount; i++) {
    spans[i] = React.createElement(
      'div',
      {
        className: 'snow',
        style: {
          zIndex:1000
        },
        key: uuid(),
      },
      null
    );
  }
  return spans;
}

export const useGetBackgroundAnimItems = () => {
  return createSpans(stripeAmount);
}