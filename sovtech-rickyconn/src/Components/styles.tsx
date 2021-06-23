export const color = 'blue'
export const imageUrl = 'http://images-assets.nasa.gov/image/PIA03653/PIA03653~orig.jpg'

export const personSummary = `
  .summary-card{
    margin: 0.5vh;
    border-radius: 0;
    width: 96%;
    height: 6.2vh;
    padding-top: 10px;
    text-align: -webkit-center;
    color: white;
    vertical-align: middle;
    border: 1px #210106 solid;
    background: #6441A5;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #2a0845, #6441A5);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #000000, #0d0323);
    background-repeat: no-repeat;
    background-size: cover;
  }
`

export const cardTemplate = `
  .card{
    display: block;
    width: 50%;
    height: 8vh;
    margin: auto;
    border: 1px solid #ffffff14;
    margin-top: 1.6vh;
    overflow: hidden;
    border-radius: 0px;
    transition: all 0.4s;
    position: relative;
    box-shadow: 0 0 25px 14px rgb(51 0 0 / 15%);
    background-image: url(${imageUrl});
    color: white;
    font-size: xx-large;
    background-size: cover;
  }
`

export const personContainer = `
  .container{
    text-align: -webkit-center;
  }
` 