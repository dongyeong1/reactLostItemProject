import { MarkerF } from "@react-google-maps/api";

const Markers = ({ center }) => {
    return (
        <div>
            <MarkerF
                key={2}
                position={{ lat: center.lat, lng: center.lng }}
            ></MarkerF>{" "}
        </div>
    );
};

export default Markers;
