import React, { useState, useEffect } from 'react';

export default async function fetchJSON(url) {
  useEffect(() => {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
    });
}, []);
}
