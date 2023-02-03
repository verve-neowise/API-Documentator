export const getHostname = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    return link.hostname;
}