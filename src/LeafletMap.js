import React from 'react'
import { Icon, Map, divIcon, point } from 'leaflet';
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer, Popup, useMapEvent } from "react-leaflet"
import icon from "./img/marker.png"
import MarkerClusterGroup from "react-leaflet-cluster";
import { useState } from 'react';

const LeafletMap = () => {
    const [clickPosition, setClickPosition] = useState(null);

    // markers
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Hello, I am pop up 1"
    },
    {
      geocode: [48.85, 2.3522],
      popUp: "Hello, I am pop up 2"
    },
    {
      geocode: [48.855, 2.34],
      popUp: "Hello, I am pop up 3"
    }
  ];

  const customIcon= new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: icon,
    iconSize: [32, 32]
  })

  const createCustomClusterIcon = (cluster)=>{
   return new divIcon({
    html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    className: "custom-marker-cluster",
    iconSize: point(33,33,true)
   })
  }

  const MapClickHandler = () => {
    useMapEvent('click', (event) => {
      console.log(event);
      setClickPosition(event.latlng);
    });
    return null;
  };

return (
  <div className='p-24'>
    <MapContainer
    center={[48.8566, 2.3522]}
    zoom={13}
    >
      <TileLayer
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       
      />
      <MarkerClusterGroup
      chunkedLoading
      iconCreateFunction={createCustomClusterIcon}
      >
      {
        markers.map((marker,index)=>{
          return( <Marker position={marker.geocode} key={index} icon={customIcon}>
            <Popup><h2 >{marker.popUp}</h2></Popup>
          </Marker>)
        })
      }
      </MarkerClusterGroup>
      <MapClickHandler/>
      {clickPosition && (
        <Marker position={clickPosition} icon={customIcon}>
          <Popup>Clicked at {clickPosition.lat.toFixed(4)}, {clickPosition.lng.toFixed(4)}</Popup>
        </Marker>
      )}
     
    </MapContainer>
    <div >
    {clickPosition && (
      <div  className='bg-blue-500 p-3'>
        Clicked Position: Latitude: {clickPosition.lat.toFixed(4)}, Longitude: {clickPosition.lng.toFixed(4)}
      </div>
    )}
    </div>
    
  </div>
);
}

export default LeafletMap