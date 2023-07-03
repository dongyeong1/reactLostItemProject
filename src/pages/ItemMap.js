import { useEffect, useState, useCallback, useRef } from "react";
import {
    GoogleMap,
    OverlayView,
    LoadScript,
    MarkerClusterer,
    InfoWindow,
    MarkerClustererF,
    MarkerF,
    InfoBox,
    Marker,
    InfoBoxF,
} from "@react-google-maps/api";
// import { OverlayView } from '@react-google-maps/api';
import AddressInput from "../components/AddressInput";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import Markers from "../components/Markers";
import TopLayout from "../components/TopLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
    MARKER_MOUSE_OUT_REQUEST,
    MARKER_MOUSE_OVER_REQUEST,
} from "../reducers/map";

const LostItemComponent = styled.div`
    bottom: 800px;
    // width:330px;
    width: 25%;
    height: 93vh;
    // background-color:green;
    margin-left: auto;
`;
const MapWrapper = styled.div`
    position: "relative";
    display: flex;
`;

const ItemMap = () => {
    const [width, setWidth] = useState("100%");

    const [componentContent, setComponentContent] = useState();

    const [showComponent, setShowComponent] = useState(false);

    const containerStyle = {
        width: width,
        height: "93vh", // zIndex:-1,
        position: "absolute",
        // @media screen and (max)
    };

    const dragEndHandle = useCallback(() => {
        setShowComponent(false);
        setWidth("100%");
    }, []);

    const mapRef = useRef();

    const [opacity, setOpacity] = useState(0.1);

    const handle = (data) => {
        setCenter({
            lat: data.address.lat,
            lng: data.address.lng,
        });

        setShowComponent(true);
        setWidth("75%");
        // console.log(p)
        // // MarkerF.setColor('red')
        // setOpacity(0.9)
        // console.log(opacity)
        console.log("asdfasfsdfgsfdgadf");
        setComponentContent(data);
    };

    const { items, searchLocation } = useSelector((state) => state.map);

    //   const {items}=useSelector((state)=>state.map)

    const [searchedMap, setSearchedMap] = useState([
        {
            key: 1,
            lat: 35.8956224,
            lng: 128.6224266,
        },
        {
            key: 2,
            // 35.8986275 128.6248028
            lat: 35.8986275,
            lng: 128.6248028,
        },
    ]);

    const [center, setCenter] = useState({
        lat: 37.5657037,
        lng: 126.9768616,
    });

    const [loadMap, setLoadMap] = useState(false);
    const success = () => {
        Modal.success({
            // content: ("layout:courseSearch"),
            content: "현재위치검색중...",
            centered: true,
            icon: <LoadingOutlined />,
        });
    };

    useEffect(() => {
        if (loadMap === true) {
            Modal.destroyAll();
        }
    }, [loadMap]);

    const getLocation = () => {
        if (navigator.geolocation) {
            // GPS를 지원하면
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setLoadMap(true);
                },
                function (error) {
                    console.error(error);
                },
                {
                    enableHighAccuracy: false,
                    maximumAge: 0,
                    timeout: Infinity,
                }
            );
        } else {
            alert("GPS를 지원하지 않습니다");
        }
    };
    useEffect(() => {
        if (!searchLocation) {
            success();
        }
    }, []);

    useEffect(() => {
        if (!searchLocation) {
            getLocation();
        } else {
            setCenter({
                lat: searchLocation.lat,
                lng: searchLocation.lng,
            });
        }
    }, [searchLocation]);

    const optionss = {
        imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
    };

    function createKey(location) {
        return location.lat + location.lng;
    }

    // useEffect(()=>{
    //   searchedMap.map((v)=>(
    //     console.log('dd',v.lat)
    //   ))
    //   console.log(center)
    // },[center])

    const [component, setComponent] = useState(true);

    const lostItemShow = useCallback(
        (data) => {
            setComponent((prev) => !prev);
            setCenter({
                lat: data.lat,
                lng: data.lng,
            });
            console.log("ss");
        },
        [component]
    );

    const divStyle = {
        background: "white",
        border: "1px solid #ccc",
        padding: 15,
    };

    const onClick = () => {
        console.info("I have been clicked!");
    };

    // const options = { closeBoxURL: '', enableEventPropagation: true };

    // const onLoad = infoBox => {
    //   console.log('infoBox: ', infoBox)
    // };

    const dispatch = useDispatch();

    const itemMouseOver = (lat) => () => {
        // dispatch({
        //     type:MARKER_MOUSE_OVER_REQUEST,
        //     data:lat
        // })
        MarkerF.setIcon();
    };

    const itemMouseOut = (lat) => () => {
        dispatch({
            type: MARKER_MOUSE_OUT_REQUEST,
            data: lat,
        });
    };
    // const divStyle = {
    //     background: `white`,
    //     border: `1px solid #ccc`,
    //     padding: 15,
    //   };

    const [overLay, setOverLay] = useState();

    const [showOverLay, setShowOverLay] = useState(false);

    const markerMouseOver = useCallback((p) => {
        setOverLay(p);
        setShowOverLay(true);
        console.log("over");
    });

    const markerMouseOut = useCallback(() => {
        console.log("asdasdas");
        setShowOverLay(false);
    });

    return (
        <div>
            <MapWrapper>
                <div
                    style={{
                        position: "absolute",
                        zIndex: 100,
                        marginTop: 60,
                        marginLeft: 10,
                    }}
                >
                    <AddressInput
                        setCenter={setCenter}

                        // searchsuccess={searchsuccess}
                        // setText={setText}
                        // text={text}
                        // errorText={errorText}
                        // setErrorText={setErrorText}
                        // searcherror={searcherror}
                    />
                </div>

                <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_API}>
                    <GoogleMap
                        onDragEnd={dragEndHandle}
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={13}
                    >
                        {/* <MarkerClustererF></MarkerClustererF> */}

                        {/* <MarkerClusterer options={options}>
          {(clusterer) =>
            locations.map((location) => (
              <Marker key={createKey(location)} position={location} clusterer={clusterer} />
            ))
          }
        </MarkerClusterer> */}

                        <MarkerClusterer options={optionss}>
                            {(clusterer) => (
                                <>
                                    {items.map((p) => (
                                        <>
                                            <MarkerF
                                                //   clickable={handle}
                                                //   onLoad={handle}
                                                onMouseOver={() =>
                                                    markerMouseOver(p)
                                                }
                                                onMouseOut={() =>
                                                    markerMouseOut(p)
                                                }
                                                onClick={() => handle(p)}
                                                key={createKey(p)}
                                                position={{
                                                    // lat: p.start_latlng[1],
                                                    // lng: p.start_latlng[0],
                                                    lat: p.address.lat,
                                                    lng: p.address.lng,
                                                }}
                                                clusterer={clusterer}
                                                icon={{
                                                    url: p.image[0].url,
                                                    fillColor: "yellow",
                                                    fillOpacity: opacity,
                                                    scale: 0.1,

                                                    scaledSize:
                                                        new window.google.maps.Size(
                                                            60,
                                                            60
                                                        ),

                                                    // strokeColor: "gold",
                                                    // strokeWeight: 2,
                                                }}
                                            ></MarkerF>
                                            {showOverLay && (
                                                <OverlayView
                                                    position={{
                                                        lat: overLay.address
                                                            .lat,
                                                        lng: overLay.address
                                                            .lng,
                                                    }}
                                                    mapPaneName={
                                                        OverlayView.OVERLAY_MOUSE_TARGET
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            textAlign: "center",
                                                            position:
                                                                "relative",
                                                            bottom: 100,
                                                            right: 20,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize: 15,
                                                            }}
                                                        >
                                                            {overLay.name}
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize: 15,
                                                            }}
                                                        >
                                                            {overLay.reward}
                                                        </div>
                                                        {/* <img onClick={handle}  style={{width:50}} src={overLay.image[0].url}></img> */}
                                                        {/* <Button  >asdasda</Button> */}
                                                    </div>
                                                </OverlayView>
                                            )}
                                        </>
                                    ))}
                                </>
                            )}
                        </MarkerClusterer>

                        {/* <InfoBox
      onLoad={onLoad}
      options={options}
      position={center}
    ></InfoBox> */}

                        {/* {component&&<div style={{backgroundColor:'red',position:'relative', width:500, zIndex:3}}>asdas</div>} */}
                        {/* 
                <OverlayView
      position={center}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div style={divStyle}>
        <h1>OverlayView</h1>

        <button
          onClick={onClick}
          type='button'
        >
          Click me
        </button>
      </div>
    </OverlayView> */}
                    </GoogleMap>
                </LoadScript>

                {showComponent && (
                    <LostItemComponent>
                        {componentContent && (
                            <div>
                                <div>
                                    <img
                                        style={{ width: "100%", height: 300 }}
                                        src={componentContent.image[0].url}
                                    ></img>
                                </div>
                                <div>
                                    <p
                                        style={{
                                            width: 100,
                                            marginLeft: "auto",
                                            marginTop: 10,
                                        }}
                                    >
                                        {componentContent.createdAt}
                                    </p>
                                </div>
                                <div style={{ marginTop: 20, marginLeft: 20 }}>
                                    <h1>{componentContent.name}</h1>
                                </div>
                                <div style={{ marginTop: 20, marginLeft: 20 }}>
                                    <h3>{componentContent.reward} 원</h3>
                                </div>
                                <div style={{ marginTop: 20, marginLeft: 20 }}>
                                    <h3>
                                        {componentContent.tradeType.direct
                                            ? "직거래가능"
                                            : "직거래불가"}
                                    </h3>
                                </div>
                                <div style={{ marginTop: 20, marginLeft: 20 }}>
                                    <h3>
                                        {componentContent.tradeType.delivery
                                            ? "택배거래가능"
                                            : "택배거래불가"}
                                    </h3>
                                </div>

                                <div
                                    style={{
                                        marginTop: 25,
                                        textAlign: "center",
                                    }}
                                >
                                    <h2>{componentContent.content}</h2>
                                </div>

                                <div
                                    style={{ width: 200, margin: "20px auto" }}
                                >
                                    <Button
                                        type="primary"
                                        style={{
                                            width: 200,
                                            borderRadius: 20,
                                            height: 40,
                                        }}
                                    >
                                        채팅하기
                                    </Button>
                                </div>
                            </div>
                        )}
                        {/* {items.map((item)=>(
    <div style={{display:'flex'}} onClick={itemMouseOver(item.address.lat)}  >
    <img style={{width:100}}  src={item.image[0].url}></img>
    <div >{item.name}</div>
    <div>{item.reward}</div>
    </div>
))} */}
                    </LostItemComponent>
                )}
            </MapWrapper>
        </div>
    );
};

export default ItemMap;
