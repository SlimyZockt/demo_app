import { split_fqdn } from "./split_fqdn";
import { get_geolocation } from "./geolocation";
import inquirer from "inquirer";
import { Question } from "inquirer";
import { z } from "zod";

export const app = (async () => {

    const demo = await inquirer.prompt<{ run_demo: string }>({
        message: "Select a demo program",
        type: "list",
        name: "run_demo",
        choices: ["split fqdn", "get geolocation from fqdn"],
    });

    const get_url = async () => {
        const url_input = await inquirer.prompt<{ url: string }>({
            message: "input a url (https://test.example.com):",
            type: "input",
            name: "url",
        });
        const url_schema = z.string().url()

        const url = url_schema.safeParse(url_input.url)

        if (url.success) {
            return new URL(url.data)
        }

    }

    let url = await get_url()
    while (url === undefined) {
        console.log("The specified URL is invalid. Enter a URL that is compatible with the js URL interface.");
        url = await get_url()
    }

    if (demo.run_demo === "split fqdn") {
        console.log(
            split_fqdn(url)
        );
    }

    if (demo.run_demo === "get geolocation from fqdn") {
        console.table(
           [await get_geolocation(url, 'de')]
        );
    }

})();