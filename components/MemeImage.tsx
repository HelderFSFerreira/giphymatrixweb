import Image from 'next/image';

type Props = {
    url: string,
    title: string
}


const MemeImage = ({url, title}: Props) => {

    return (
        <div className='h-64 w-64'>
            <Image src={url} alt={title} width={400} height={400}/>
        </div>
        
    );   
};


export default MemeImage;
