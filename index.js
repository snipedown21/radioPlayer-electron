const Lautfm = require('lautfm');
const $ = require('jquery');
const lfm = new Lautfm();
let player = $('audio').get(0);

lfm.getStations({
  by: 'letter',
  term: 'e'
}).then((stations) => {
  if(stations) {
    stations.forEach(station => {
      let stationList = `
        <li class="list-group-item" ondblclick="playStream('${station.stream_url}', this)">
            <img class="img-circle media-object pull-left" src="${station.images.station_120x120}" width="32" height="32">
            <div class="media-body">
                <strong>${station.display_name}</strong>
                <p>${station.description}</p>
            </div>
        </li>
      `;

      $('#station-list').append(stationList);
    });
  }
}).catch((err) => {
  console.log(err);
});

function playStream(url, li) {
  $('.list-group-item').removeClass('active');
  $(li).addClass('active');
  player.src = url;
  player.load();
  player.play();
}
