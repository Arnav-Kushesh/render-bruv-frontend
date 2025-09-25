import copy from "copy-to-clipboard";

export default async function shareExternally(url) {
    copy(url);
    window.popupAlert("Link copied to clipboard");
}
