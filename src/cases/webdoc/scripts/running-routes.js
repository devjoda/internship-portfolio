var mymap = L.map('mapid').setView([56.149375, 10.213509], 11);

L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap);

fetch('https://api.jsonbin.io/b/60815e1256c62a0c0e8a6846')
  .then(function (data) {
    return data.json();
  })
  .then(function (post) {
    L.geoJSON(post).addTo(mymap);
  })
  .catch(function (error) {
    console.log(error);
  });
