import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
// import { useRouter } from 'next/router';
import { Params } from 'next/dist/next-server/server/router';
import { GiphyAPI } from '../../lib/giphy';
import { GiphyAPIOut } from '../../interfaces';

type Props = {
    item?: GiphyAPIOut[]
    errors?: string
}

const createImage = (options :{src :any}) => {
    options = options || {};
    const img :HTMLImageElement = document.createElement("img");
    // createElement(tagName: string, options?: ElementCreationOptions): HTMLElement;
    if (options.src) {
      img.src = options.src;
    }
    return img;
  };
  
  const copyToClipboard = async (pngBlob :Blob) => {
    try {
      await navigator.clipboard.write([
        // eslint-disable-next-line no-undef
        new ClipboardItem({
          [pngBlob.type]: pngBlob
        })
      ]);
      console.log("Image copied");
    } catch (error) {
      console.error(error);
    }
  };
  
  const convertToPng = (imgBlob :Blob) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const imageEl = createImage({ src: window.URL.createObjectURL(imgBlob) });
    imageEl.onload = (e) => {
      canvas.width = e.target!.width;
      canvas.height = e.target!.height;
      ctx.drawImage(e.target, 0, 0, e.target.width, e.target.height);
      canvas.toBlob(copyToClipboard, "image/png", 1);
    };
  };
  
const copyImg = async (src :string) => {
    const img = await fetch(src);
    const imgBlob = await img.blob();
    const extension = src.split(".").pop();
    const supportedToBeConverted = ["jpeg", "jpg", "gif"];
    if (extension) {
        if (supportedToBeConverted.indexOf(extension.toLowerCase())) {
            return convertToPng(imgBlob);
        } else if (extension.toLowerCase() === "png") {
            return copyToClipboard(imgBlob);
        }
    }
    console.error("Format unsupported");
    return;
};

const MemesDetail = ({ item, errors }: Props) => {
    // const { isFallback } = useRouter();

    if (errors) {
        return (<title>Error</title>);
    }

    if (item) {

        const images = item.map((image) =>
            <th key={image.url}>
                <Image src={image.url} alt={image.title} width={200} height={200} onClick = {() => {
                    console.log(image.url);
                    // image.
                    copyImg(image.url);
                }} />
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
        );
    };
    return (<title>Error</title>);
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