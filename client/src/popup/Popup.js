/*global chrome*/
import { useMemo, useState } from 'react';
import { DEFAULT_SCRAPPING_SOURCE_URL, INFO_TEXT, SCRAPPING_SOURCE, SCRAPPING_STATUS, START_SCRAPPING } from '../constants/constants';
import './Popup.css';

function Popup() {
  const [targetUrl, setTargetUrl] = useState(DEFAULT_SCRAPPING_SOURCE_URL);
  const [status, setStatus] = useState(SCRAPPING_STATUS.Ideal);
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('')

  const handleTargetURLChange = (event) => {
    setErrorMessage('')
    setTargetUrl(event.target.value)
  }

  const validateAndGetSourceDetail = (value) => {
    const index = SCRAPPING_SOURCE.findIndex((source) => value.includes(source.domain))
    if (index < 0) {
      return setErrorMessage('Unsupported source|domain.')
    }
    return SCRAPPING_SOURCE[index]
  }

  const startScrapping = () => {
    const source = validateAndGetSourceDetail(targetUrl)
    if (!source) return
    setCount(0)
    setStatus(SCRAPPING_STATUS.Started)
    chrome.runtime.sendMessage({
      action: START_SCRAPPING,
      source: source.name,
      targetUrl,
    }, (response) => {
      if (response.success) {
        setStatus(SCRAPPING_STATUS.Completed)
        setCount(response.data?.length)
      } else {
        setStatus(SCRAPPING_STATUS.Error)
        setCount(0)
      }
    }
    );
  };

  const disabled = useMemo(()=> {
    return status === SCRAPPING_STATUS.Started || !targetUrl
  }, [status, targetUrl])

  return (
    <div className="container">
      <h2>Scrapper</h2>
      <hr className='line' />
      <div className='analysic'>
        <p>Status: <span>{status}</span></p>
        <p>New product count: {count}<span></span></p>
      </div>
      <div className='form'>
        <h3 className='info'>{INFO_TEXT}</h3>
        {errorMessage && (
          <p className='error info'>{errorMessage}</p>
        )}
        <input value={targetUrl} type='text' placeholder={`Source url - ${DEFAULT_SCRAPPING_SOURCE_URL}`} onChange={handleTargetURLChange} />
        <button className='btn' onClick={startScrapping} disabled={disabled}>Start Scrapping</button>
      </div>

      <div className='footer'>
       <span className='label'>Current supported e-commerce sites: </span> 
       <span className='value'>{SCRAPPING_SOURCE?.map((source)=> source.name)?.join(', ')}</span>
      </div>

    </div>
  );
}

export default Popup;