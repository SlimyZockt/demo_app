import axios from "axios";
import { z } from "zod";

export let get_geolocation = async (url: URL, lang_code: string) => {

    const schema = z.object({
        city: z.string(),
        country: z.string(),
    })

    let opt = {
        url: `http://ip-api.com/json/${url.hostname}?lang=${lang_code}`,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    let data = axios.request(opt).then(
        (response) => schema.parse({
            city: response.data.city,
            country: response.data.country,
        })
    )
    return data
}