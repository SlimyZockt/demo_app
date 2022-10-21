import { split_fqdn } from "./split_fqdn";
import { get_geolocation } from "./geolocation";
import inquirer from "inquirer";
import { Question } from "inquirer";

export const app = (async () => {

    const demo = await inquirer.prompt<{ run_demo: string }>({
        message: "Select a demo program",
        type: "list",
        name: "run_demo",
        choices: ["split fqdn", "get geolocation from fqdn"],
    });

    const get_url = async () => {
        const url_input = await inquirer.prompt<{ get_url: string }>({
            message: "input a url (https://test.example.com):",
            type: "input",
            name: "get_url",
        });
        const url = (async (): Promise<URL> => new URL(url_input.get_url))()
            .then((data: URL) => data)
            .catch((_) => {
                console.log(
                    "The specified URL is invalid. Enter a URL that is compatible with the js URL interface"
                );
                get_url();
            }
            );

        return url as Promise<URL>
    }

    const url = await get_url()

    if (demo.run_demo === "split fqdn") {
        console.log(
            split_fqdn(url)
        );
    }

    if (demo.run_demo === "get geolocation from fqdn") {
        console.log(
           await get_geolocation(url, 'de')
        );
    }

})();

console.log("run");
