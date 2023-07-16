import { useEffect, useState, useCallback, useRef } from "react";
import GeoCode from "../components/GeoCode";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
import { Carousel } from "react-responsive-carousel";

// import { OverlayView } from '@react-google-maps/api';
import AddressInput from "../components/AddressInput";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
import Markers from "../components/Markers";
import TopLayout from "../components/TopLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
    LOAD_ITEM_REQUEST,
    MARKER_MOUSE_OUT_REQUEST,
    MARKER_MOUSE_OVER_REQUEST,
} from "../reducers/map";
import { USER_INFO_REQUEST } from "../reducers/user";
import { detailDate } from "../function";

const LostItemComponent = styled.div`
    bottom: 800px;
    // width:330px;
    width: 25%;
    height: 93vh;
    // background-color:green;
    margin-left: auto;
    .ant-carousel {
        background: red;
        width: 300px;
        height: 100px;
    }
`;
const MapWrapper = styled.div`
    position: "relative";
    display: flex;
`;

const SearchWrapper = styled(Input)`
    border-radius: 200px;
    height: 50px;
    width: 500px;
    font-size: 25px;
`;

const Buttons = styled(Button)`
    border-radius: 20px;
    height: 50px;
    width: 130px;
    font-size: 18px;
    margin-left: 10px;
`;

const ItemMap = () => {
    const [mapref, setMapref] = useState(null);

    const [text, setText] = useState("");
    const [errorText, setErrorText] = useState("");

    const [width, setWidth] = useState("100%");

    const [componentContent, setComponentContent] = useState();

    const [showComponent, setShowComponent] = useState(false);

    const containerStyle = {
        width: width,
        height: "93vh", // zIndex:-1,
        position: "absolute",
        // @media screen and (max)
    };

    const [opacity, setOpacity] = useState(0.1);

    useEffect(() => {
        setText("검색성공");
    }, [text]);

    useEffect(() => {
        setErrorText("없는 지역입니다");
    }, [errorText]);

    const searchsuccess = () => {
        Modal.success({
            content: text,
        });
    };
    const searcherror = () => {
        Modal.error({
            content: errorText,
        });
    };

    const handleButton = async () => {
        const currentAddr = document.getElementById("address").value;
        if (currentAddr) {
            console.log(currentAddr);
            //   return await console.log(GeoCode(currentAddr))
            const location = await GeoCode(currentAddr);
            console.log("asd", location);
            if (location.msg) {
                setErrorText("다른지역으로 검색해주세요");

                searcherror();
            } else {
                dispatch({
                    type: LOAD_ITEM_REQUEST,
                    data: {
                        southlat: mapref.getBounds().getSouthWest().lat(),
                        southlng: mapref.getBounds().getSouthWest().lng(),
                        northlat: mapref.getBounds().getNorthEast().lat(),
                        northlng: mapref.getBounds().getNorthEast().lng(),
                    },
                });
                setCenter({
                    lat: location.lat,
                    lng: location.lng,
                });
                setText("검색성공");
                console.log(text);
                searchsuccess();
            }

            // console.log("ddd", lat, lng);
        }
    };

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
        if (loadMap) {
            console.log("loadmap");

            Modal.destroyAll();
        }
    }, [loadMap]);

    // useEffect(() => {
    //     if (!searchLocation) {
    //         success();
    //     }
    // }, []);

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

    // const options = { closeBoxURL: '', enableEventPropagation: true };

    // const onLoad = infoBox => {
    //   console.log('infoBox: ', infoBox)
    // };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: USER_INFO_REQUEST,
        });
    }, []);

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

    const loadHandle = (map) => {
        console.log("loddddadadㄴㄴㄴㄴasdas");
        console.log("aaaaaaaaaaa", map.getBounds());
        // if (map) {
        //     dispatch({
        //         type: LOAD_ITEM_REQUEST,
        //         data: {
        //             southlat: map.getBounds().getSouthWest().lat(),
        //             southlng: map.getBounds().getSouthWest().lng(),
        //             northlat: map.getBounds().getNorthEast().lat(),
        //             northlng: map.getBounds().getNorthEast().lng(),
        //         },
        //     });
        // }
    };

    useEffect(() => {
        if (!searchLocation) {
            dispatch({
                type: LOAD_ITEM_REQUEST,
                data: {
                    southlat: 37.50802674434482,
                    southlng: 126.8718048373047,
                    northlat: 37.61307862693566,
                    northlng: 127.0860382357422,
                },
            });
        } else {
            setCenter({
                lat: searchLocation.lat,
                lng: searchLocation.lng,
            });
            // dispatch({
            //     type: LOAD_ITEM_REQUEST,
            //     data: {
            //         southlat: 37.50802674434482,
            //         southlng: 126.8718048373047,
            //         northlat: 37.61307862693566,
            //         northlng: 127.0860382357422,
            //     },
            // });
        }
    }, []);
    useEffect(() => {
        if (mapref && mapref.getBounds()) {
            dispatch({
                type: LOAD_ITEM_REQUEST,
                data: {
                    southlat: mapref.getBounds().getSouthWest().lat(),
                    southlng: mapref.getBounds().getSouthWest().lng(),
                    northlat: mapref.getBounds().getNorthEast().lat(),
                    northlng: mapref.getBounds().getNorthEast().lng(),
                },
            });
        }
    }, [searchLocation, loadMap]);

    const dragEndHandle = useCallback(() => {
        setShowComponent(false);
        setWidth("100%");
        console.log("qqqqqqqq", mapref);
        dispatch({
            type: LOAD_ITEM_REQUEST,
            data: {
                southlat: mapref.getBounds().getSouthWest().lat(),
                southlng: mapref.getBounds().getSouthWest().lng(),
                northlat: mapref.getBounds().getNorthEast().lat(),
                northlng: mapref.getBounds().getNorthEast().lng(),
            },
        });

        console.log("northeast", mapref.getBounds().getNorthEast().lat());
        // console.log("northwest", mapref.getBounds().getNorthWest().lat());

        console.log("southwest", mapref.getBounds().getSouthWest().lat());
        // console.log("southeast", mapref.getBounds().getSouthEast().lat());
    }, [mapref]);

    const getLocation = () => {
        if (navigator.geolocation) {
            success();
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
    // useEffect(() => {

    useEffect(() => {
        if (mapref) {
            dispatch({
                type: LOAD_ITEM_REQUEST,
                data: {
                    southlat: mapref.getBounds().getSouthWest().lat(),
                    southlng: mapref.getBounds().getSouthWest().lng(),
                    northlat: mapref.getBounds().getNorthEast().lat(),
                    northlng: mapref.getBounds().getNorthEast().lng(),
                },
            });
        }
    }, [loadMap]);

    // const onChange=

    const myLocation = () => {
        getLocation();
        setLoadMap(false);
    };

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
                    <SearchWrapper
                        prefix={<SearchOutlined style={{ fontSize: 30 }} />}
                        enterButton="검색"
                        onPressEnter={handleButton}
                        placeholder="지역을 검색해보세요"
                        id="address"
                    />
                </div>
                <div
                    style={{
                        position: "absolute",
                        zIndex: 110,
                        marginTop: 60,
                        top: 60,
                    }}
                >
                    <Buttons type="primary" onClick={myLocation}>
                        현재위치보기
                    </Buttons>
                </div>

                <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_API}>
                    <GoogleMap
                        onDragEnd={dragEndHandle}
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={13}
                        onLoad={(map) => setMapref(map)}
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
                                    {items
                                        ? items.map((p) => (
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
                                                          lat: p.address
                                                              .latitude,
                                                          lng: p.address
                                                              .longitude,
                                                      }}
                                                      clusterer={clusterer}
                                                      icon={{
                                                          // url: p.images[0].url,
                                                          url: "https://cdn-icons-png.flaticon.com/512/1201/1201867.png",
                                                          fillColor: "yellow",
                                                          fillOpacity: opacity,
                                                          scale: 0.1,

                                                          scaledSize:
                                                              new window.google.maps.Size(
                                                                  40,
                                                                  40
                                                              ),

                                                          // strokeColor: "gold",
                                                          // strokeWeight: 2,
                                                      }}
                                                  ></MarkerF>
                                                  {showOverLay && (
                                                      <OverlayView
                                                          position={{
                                                              lat: overLay
                                                                  .address
                                                                  .latitude,
                                                              lng: overLay
                                                                  .address
                                                                  .longitude,
                                                          }}
                                                          mapPaneName={
                                                              OverlayView.OVERLAY_MOUSE_TARGET
                                                          }
                                                      >
                                                          <div
                                                              style={{
                                                                  textAlign:
                                                                      "center",
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
                                                                  {
                                                                      overLay.itemName
                                                                  }
                                                              </div>
                                                              <div
                                                                  style={{
                                                                      fontSize: 15,
                                                                  }}
                                                              >
                                                                  {
                                                                      overLay.reward
                                                                  }
                                                              </div>
                                                              {/* <img onClick={handle}  style={{width:50}} src={overLay.image[0].url}></img> */}
                                                              {/* <Button  >asdasda</Button> */}
                                                          </div>
                                                      </OverlayView>
                                                  )}
                                              </>
                                          ))
                                        : null}
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
                                    <Carousel
                                        showArrows={true}
                                        showThumbs={false}
                                    >
                                        {componentContent.images.map((v) => (
                                            <div>
                                                <img
                                                    style={{
                                                        width: "100%",
                                                        height: 300,
                                                    }}
                                                    src={v.url}
                                                ></img>
                                            </div>
                                        ))}
                                        {/* <div>
        <h3 >1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div> */}
                                    </Carousel>
                                    {/* <img
                                        style={{ width: "100%", height: 300 }}
                                        src={componentContent.images[0].url}
                                    ></img> */}
                                </div>
                                <div>
                                    <p
                                        style={{
                                            width: 100,
                                            marginLeft: "auto",
                                            marginTop: 10,
                                        }}
                                    >
                                        {detailDate(
                                            new Date(componentContent.createdAt)
                                        )}
                                    </p>
                                </div>
                                <div style={{ marginTop: 20, marginLeft: 20 }}>
                                    <h1>{componentContent.itemName}</h1>
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
