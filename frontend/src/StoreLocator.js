import GoogleMap from './GoogleMap';
import React, { Component } from 'react';



// const getSationInfoWindowBox = (station) => `
//     <div>
//       <b>Divvy Station</b> 
//       <br><br> 
//       <strong>stationName:  ${station.stationName}</strong> 
//       <br><br>
//       <strong>status: ${station.status}</strong> 
//       <br><br> 
//       <strong>availableDocks: ${station.availableDocks}</strong>
//     </div>`;

    const getSelectedPlacesInfoWindowBox = (place) => `
    <div>
    <strong><u>Grocery Store Details</u> :</strong>
     <br><br>
     <strong> Name: ${place.name}</strong> 
     <br>
     <strong>Phone   : ${place.display_phone} </strong> 
     <br>
     <strong>Address : ${place.location.address1}</strong> 
    </div>`;

const getCurrentLocationInfoWindowBox = (zip) => `
    <div>
     <strong>You are currently at zipcode : ${zip}  </strong>
    </div>`;

const radiusCircle = (map, maps, center) => {
  let marker = new maps.Circle({
    center: center,
    map,
    strokeOpacity: 0.0,
    radius: 3000,
    fillColor: "blue",
    fillOpacity: 0.305,
    zindex: 3
  });
  return marker;
};



const currentLocationMarker = (map, maps, center,zip) => {
  let marker = new maps.Marker({
    position: center,
    map,
    label: { color: 'white', text: 'You are Here' },
    icon: { url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }
  });

  marker.addListener('click', () => {
      new maps.InfoWindow({
          content: getCurrentLocationInfoWindowBox(zip),
        }).open(map, marker);
    });
  return marker;
};

const stationMarkers = (map, maps, stations) => {
  const markers = [];
  const infowindows = [];

  stations.forEach((station) => {
    markers.push(new maps.Marker({
      position: { lat: station.coordinates.latitude, lng: station.coordinates.longitude },
      //  label: { color: "black", text: station.id, width: "parent" },
      map,
    }));

     infowindows.push(new maps.InfoWindow({
       content: getSelectedPlacesInfoWindowBox(station),
     }));
  });

    markers.forEach((marker, i) => {
      marker.addListener('click', () => {
        infowindows[i].open(map, marker);
      });
    });
};




class StoreLocator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      places: {},
      loading: false,
      longitude: '',
      latitude: ''
    }

    console.log(this.props.state.locationZip)

  

    // fetch(`https://geolocation-db.com/json/`, { method: 'GET' }).then(res => res.json())
    //   .then(data => (this.setState({ longitude: data.longitude, latitude: data.latitude })));


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location: this.props.state.locationZip })
    };

    const requestOptionsNearme = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ longitude: this.state.longitude, latitude: this.state.latitude })
    };

    fetch('http://localhost:5000/search', requestOptions)
      .then(res => res.json())
      .then(data => (this.setState({ places: data, loading: true })));

  }

  render() {
    if (this.state.loading) {

      console.log("This is your current long,lat", this.state.longitude, this.state.latitude);
      return (
        
        <div className="pl flex align-center bg-light-gray">
          <div className= "ma4 justify-between shadow " style={{ height: '35rem', width: '100%' }}>
            <GoogleMap
              defaultZoom={13}
              defaultCenter={{ lat: this.state.places.region.center.latitude, lng: this.state.places.region.center.longitude }} //
              bootstrapURLKeys={{ key: 'AIzaSyB7x4nkPViBZZVCHFhLLt5AZjvroIJK-yI' }}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => {
                stationMarkers(map, maps, this.state.places.businesses);
                radiusCircle(map, maps, { lat: this.state.places.region.center.latitude, lng: this.state.places.region.center.longitude });
                currentLocationMarker(map, maps, { lat: this.state.places.region.center.latitude, lng: this.state.places.region.center.longitude },this.props.state.locationZip);
              }}
            />
          </div>
        </div>

      )
    }
    else {
      return (<div>loading stores near you...</div>)
    }

  }

}
export default StoreLocator;