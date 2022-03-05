import Image from 'next/image';

type Props = {
    url: string,
    title: string
}


const MemeImage = ({url, title}: Props) => {

    return (
        <div className='h-64 w-64'>
            <Image src={url} alt={title} width={400} height={400} onClick={() => {

                let params: RequestInit = {
                    headers: {'Content-Type':'application/json'},
                    method: "POST",
                    body: JSON.stringify({
                        url: url
                    })
                }

                fetch('/api/sendImg', params)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                })
            }}/>
        </div>
        
    );   
};


export default MemeImage;
