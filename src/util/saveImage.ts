// Copied methods from https://github.com/josermarinr/svg-export, cleaned up the code

interface Size {
    width: number;
    height: number;
}
interface SaveImageOptions {
    size: Size,
    background?: string;
    filename?: string;
}

const flattenStyles = (clone: any, original: SVGSVGElement | any) => {
    let containerElements = ["svg", "g"];

    for (let element = 0; element < clone.childNodes.length; element++) {
        let child = clone.childNodes[element];
        if (containerElements.indexOf(child.tagName) !== -1) {
            flattenStyles(child, original.childNodes[element]);
            continue;
        }
        let style =
            original.childNodes[element].currentStyle ||
            window.getComputedStyle(original.childNodes[element]);

        if (style === "undefined" || style === null) continue;

        for (let ThisStyle = 0; ThisStyle < style.length; ThisStyle++) {
            child.style.setProperty(
                style[ThisStyle],
                style.getPropertyValue(style[ThisStyle])
            );
        }
    }
}

const createCleanCopy = (svg: SVGSVGElement, size: Size) => {
    const node = svg.cloneNode(true) as SVGSVGElement;
    node.style.background = '#FFFFFF00';
    node.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`)
    node.setAttribute('width', `${size.width}`)
    node.setAttribute('height', `${size.height}`)
    const copy = node.cloneNode(true) as SVGSVGElement;
    flattenStyles(copy, node);

    return copy;
}

const createDrawingBoard = (size: Size) => {
    const canvas = document.createElement("canvas");
    canvas.width = size.width;
    canvas.height = size.height;

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.clearRect(0, 0, size.width, size.height);
    context.beginPath();
    context.rect(0, 0, size.width, size.height);
    context.fillStyle = 'rgba(255, 255, 255, 0.0)';
    context.fill();

    return {canvas, context};
}

export const download = (href: string, name: string, ext = 'png') => {
    let link = document.createElement("a");
    link.download = `${name}.${ext}`;
    link.href = href;
    link.click();
    link.remove();
};

export const savePNG = (svg: SVGSVGElement, opts: SaveImageOptions, startDownload = true): Promise<string> => {
    const { size, background, filename } = opts;
    // const bgColor = background || '#FFF';
    const fileName = filename || 'image';

    const copy = createCleanCopy(svg, size);
    const {canvas, context} = createDrawingBoard(size);

    const DOMURL = window.URL || window.webkitURL || window;

    const url = DOMURL.createObjectURL(
        new Blob([
            new XMLSerializer().serializeToString(copy)
        ], { type: "image/svg+xml;charset=utf-8" })
    );

    const image = new Image();
    image.src = url;

    return new Promise((resolve, reject) => {
        image.onload = function() {
            if (context) {
                URL.revokeObjectURL(url);

                context.drawImage(image, 0, 0, size.width, size.height);
                const imgURI = canvas.toDataURL("image/png");

                if(imgURI.length < 20) {
                    alert('Something went wrong. Your image is probably too big, try a smaller size (block size)\n\nhttps://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas#maximum_canvas_size');
                } else {
                    if (startDownload) {
                        download(imgURI, fileName);
                    }
                }

                resolve(image.src);
            }
        }
        image.onerror = function (error) {
            reject(error);
        }
    })
}

export const saveSVG = (svg: SVGSVGElement, opts: SaveImageOptions, startDownload = true): Promise<string> => {
    const { size, filename } = opts;

    const fileName = filename || 'image';
    const copy = createCleanCopy(svg, size);
    const svgAsXML = (new XMLSerializer).serializeToString(copy);
    const dataURL = `data:image/svg+xml,${encodeURIComponent(svgAsXML)}`;

    download(dataURL, fileName, 'svg');

    return new Promise((resolve, reject) => {
        resolve(dataURL);
    })
}
