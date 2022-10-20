import React, { useState } from 'react';
import axios from 'axios';
import Head from '../components/head';
import symbolDictionary from './symbolDictionary.json'

export default () => {
  const [spinResult, setSpinResult] = useState("");
  const [threeInARow, setThreeInARow] = useState(false);
  const [spinButtonDisabled, setSpinButtonDisabled] = useState(false);

  function spin() {
    setSpinButtonDisabled(true);
    axios.get('/api/spin')
      .then(function (response) {
        // handle success
        setSpinResult(response?.data?.results);
        setThreeInARow(response?.data?.threeInARow);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        setSpinResult("");
        setThreeInARow(false);
        console.log(error);
      })
      .finally(function () {
        // always executed
        setTimeout(() => setSpinButtonDisabled(false), 3000);
      });
  }

  function getSpriteOffset(letter) {
    return symbolDictionary[letter].offset;
  }

  return (
    <div>
      <Head title="Home" />
      <div className="hero">
        <h1 className="title">raspberry --- [insert fullscreen button][autoplay?]</h1>
        <p className="description">To get started, click the "spin" button.
	<p>Results:</p>
	<p>{spinResult &&
            <span>Three in a row: {JSON.stringify(threeInARow)}</span>
          }
	</p>
        </p>
        <div className="row">
          <div className="card" style={spinResult[0] && { backgroundPositionY: getSpriteOffset(spinResult[0]) }}>
          </div>
          <div className="card" style={spinResult[1] && { backgroundPositionY: getSpriteOffset(spinResult[1]) }}>
          </div>
          <div className="card" style={spinResult[2] && { backgroundPositionY: getSpriteOffset(spinResult[2]) }}>
          </div>
          <button onClick={spin} disabled={spinButtonDisabled}>Spin</button>
        </div>
      </div>
  
      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          padding-bottom: 12px;
          line-height: 1.15;
          font-size: 37px;
        }
        .title, .description {
          text-align: center;
        }
        .row {
          max-width: 587px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          background-image: url(/symbol_strip.svg);
          background-repeat: repeat-y;
          background-position-x: center;
          background-position-y: 0px;
          height: 375px;
          width: 220px;
          border: 1px solid #9B9B9B;
          transition: background-position-y 1000ms ease-in-out;
        }
        .card:nth-of-type(1) {
          background-position-y: 0px;
          transition-delay: 0ms;
        }
        .card:nth-of-type(2) {
          background-position-y: -500px;
          transition-delay: 1000ms;
        }
        .card:nth-of-type(3) {
          background-position-y: -125px;
          transition-delay: 2000ms;
        }
      `}</style>
    </div>
  );
}
