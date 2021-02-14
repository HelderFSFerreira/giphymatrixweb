import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Params } from 'next/dist/next-server/server/router';
import { GiphyAPI } from '../../lib/giphy';
import { GiphyAPIOut } from '../../interfaces';

type Props = {
    item?: GiphyAPIOut[]
    errors?: string
  }

const MemesDetail = ({ item, errors }: Props) => {
    const { isFallback } = useRouter();
    console.log(isFallback);

    if (errors) {
        return (<title>Error</title>);
    }

    if (item) {

        const images = item.map((image) =>
            <th key={image.url}>
                <Image src={image.url} alt={image.title} width={200} height={200}/>
            </th>
        );

        return (
            <table>
                <tbody>
                    <tr>
                        {images}
                    </tr>
                </tbody>
            </table>
        )
    }
    return (<title>Error</title>);
  }
  
export default MemesDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    // We'll not pre-render only these paths at build time.
    return { paths: [], fallback: true }
}

export const getStaticProps: GetStaticProps = async ( {params}: Params ) => {
    const keyWord: string = params.meme;
    if (keyWord) {
        let item = await new GiphyAPI( ).getBest5(keyWord);
        
        if (item) {
            return { props: { item } }
        } else {
            return { props: { errors: 'No memes found' } }
        }
    } else {
        return { notFound: true };
    }
}