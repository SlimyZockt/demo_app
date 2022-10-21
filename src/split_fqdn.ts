export let split_fqdn = (url: URL): [string, string] => {

    const URL_SEGMENTS = url.hostname.split(".")
    var domain = URL_SEGMENTS
        .filter((_, index) => index >= URL_SEGMENTS.length - 2)
        .join(".");
    var host = URL_SEGMENTS
        .filter((_, index) => index < URL_SEGMENTS.length - 2)
        .join(".")

    return [host, domain]
}