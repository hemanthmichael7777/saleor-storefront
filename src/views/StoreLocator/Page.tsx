import * as React from "react";


interface PageProps {


}
export const StoreLocator: React.FC<PageProps> = ({

}) => (
    <div className="store-locator">
        <iframe 
            id="store-locator-iframe" 
            src="https://dayleen.frogfishsolutions.com:4433/ESC_Geocode_Dayleen/" 
            style={{width:"100%", height:"1120px"}}>
        </iframe>
    </div>
);
export default StoreLocator;
