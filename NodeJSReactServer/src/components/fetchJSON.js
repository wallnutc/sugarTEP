import React, { useState, useEffect } from 'react';

export default function fetchJSON(url) {
  console.log(url);
  return fetch(url)
     .then((response) => response.json())
     .then((responseJson) => {
       return responseJson;
     })
     .catch((error) => {
       console.error(error);
     });
}
