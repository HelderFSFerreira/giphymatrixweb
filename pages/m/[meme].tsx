import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import MemeImage from '../../components/MemeImage';
import { Params } from 'next/dist/next-server/server/router';
import { GiphyAPI } from '../../lib/giphy';
import { GiphyAPIOut } from '../../interfaces';
import MemeImageSkeleton from '../../components/MemeImageSkeleton';

type Props = {
    item?: GiphyAPIOut[]
    errors?: string
  }

const MemesDetail = ({ item, errors }: Props) => {
    const { isFallback } = useRouter();

    if (errors) {
        return (<title>Error</title>);
    }

    if (isFallback) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center space-x-1' >
                <MemeImageSkeleton/>
                <MemeImageSkeleton/>
                <MemeImageSkeleton/>
                <MemeImageSkeleton/>
                <MemeImageSkeleton/>
            </div>
        );
    }

    if (item) {
        const images = item.map((image) =>
            <MemeImage url={image.url} title={image.title}/>;
        );

        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center space-x-1' >
                {images}
            </div>
        );
    };
  }
  
export default MemesDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    // We'll not pre-render only these paths at build time.
    return { paths: [], fallback: true };
}

export const getStaticProps: GetStaticProps = async ( {params}: Params ) => {
    const keyWord: string = params.meme;
    if (keyWord) {
        const item = await new GiphyAPI( ).getBest5(keyWord);
        
        if (item) {
            return { props: { item } };
        } else {
            return { props: { errors: 'No memes found' } };
        }
    } else {
        return { notFound: true };
    }
}