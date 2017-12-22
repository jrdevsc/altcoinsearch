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
    var myMaxPrice = $('#maxPrice').val();
    myMaxPrice =  parseFloat(myMaxPrice);
    var myMinVolume = $('#minVolume').val();
    myMinVolume = myMinVolume * 1000000;
    var myMinMarketCap =$('#minMarketCap').val();
    myMinMarketCap = myMinMarketCap * 1000000;


    filterMe(myData, myMaxPrice, myMinVolume, myMinMarketCap);
  })

  function filterMe(myData, myMaxPrice, myMinVolume, myMinMarketCap){
    for (c of myData)  {
      let cPrice = parseFloat(c.price_usd);
      let cMinV = parseFloat(c['24h_volume_usd']);
      let cMinMC = parseFloat(c.market_cap_usd);

      if(myMaxPrice >= cPrice && cMinV >= myMinVolume && cMinMC >= myMinMarketCap){
        $('#mTable').append('<tr><td>'+c.name+'</td><td>'+c.symbol+'</td><td>'+cPrice+'</td><td>'+cMinV+'</td><td>'+cMinMC+'</td><td class="change">'+c.percent_change_24h+'</td><td>'+c.percent_change_7d+'</td></tr>');
      }

    }
  
  }




})
