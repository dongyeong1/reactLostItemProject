import Geocode from "react-geocode";
const API_KEY = process.env.REACT_APP_MAP_API;

Geocode.setApiKey(API_KEY);
Geocode.setLanguage("ko");
Geocode.setRegion("kr");
Geocode.enableDebug();

const GeoCode = async (currentAddr) => {
    return Geocode.fromAddress(currentAddr)
        .then((response) => {
            console.log("res", response);
            const { lat, lng } = response.results[0].geometry.location;
            if (lat) {
                if (lng) {
                    return { lat, lng };
                }
            }

            console.log(lat, lng);
        })
        .catch((error) => {
            console.log("asdasdasdasdas");
            return { msg: "error" };
            console.error(error);
        });
};

export default GeoCode;
