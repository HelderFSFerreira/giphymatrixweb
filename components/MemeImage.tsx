import { WidgetApi } from 'matrix-widget-api';
import Image from 'next/image';
import { M_TEXT } from '../pages/m/windowExt';

type Props = {
    url: string,
    title: string
}


const MemeImage = ({url, title}: Props) => {

    return (
        <div className='h-64 w-64'>
            <Image src={url} alt={title} width={400} height={400} onClick={() => {
                

                const api = new WidgetApi();
                api.requestCapabilityToSendMessage(M_TEXT)
                
                api.sendRoomEvent("m.room.message",{"body":"test"})

            }} />
        </div>
        
    );   
};


export default MemeImage;
