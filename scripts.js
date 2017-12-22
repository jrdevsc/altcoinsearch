$(document).ready(function(){
  const url = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
var myData;

  axios.get(url)
    .then((res) => {
      myData = res.data;
    })
    .catch((err) =>{
      console.log(err);
    })

  $('#submit').on('click', function(e){
    e.preventDefault();
    let myMaxPrice = $('#maxPrice').val();
    let myMinVolume = $('#minVolume').val();
    myMinVolume = myMinVolume * 1000000;
    let myMinMarketCap = $('#minMarketCap').val();
    myMinMarketCap = myMinMarketCap * 1000000;
    filterMe(myData, myMaxPrice, myMinVolume, myMinMarketCap);
  })

  function filterMe(myData, myMaxPrice, myMinVolume, myMinMarketCap){
    for (c of myData)  {
      let cPrice = parseInt(c.price_usd);
      let cMinV = parseInt(c['24h_volume_usd']);
      let cMinMC = parseInt(c.market_cap_usd);
// && myMinVolume >= cMinV && myMinMarketCap >= cMinMC
// myMaxPrice >= cPrice && cMinV >= myMinVolume
      if(myMaxPrice >= cPrice && cMinV >= myMinVolume && cMinMC >= myMinMarketCap){
        // console.log(c.name);
        $('#coinName').append('<h3>'+c.name+'<em>('+c.symbol+')</em></h3><ul><li>Price USD: $'+c.price_usd+'</li><li>Market Cap: $ '+c.market_cap_usd+'</li><li>24H Volume: $'+cMinV+'</li><li>Change over 7D: '+c.percent_change_7d+'</li><li>Change over 24h: '+c.percent_change_24h+'</li></ul>');
      }
    }
  }




})
