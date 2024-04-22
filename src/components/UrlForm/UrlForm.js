import React, { useState } from 'react';
import { getUrls, postUrls } from '../../apiCalls';

function UrlForm({ setUrls }) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    postUrls('', {long_url: urlToShorten, title: title})
    getUrls('')
      .then(data => setUrls(data.urls))
      .catch(error => console.log(error))
    clearInputs();
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}

      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='urlToShorten'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)}

      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
    </form>
  )
}

export default UrlForm;
