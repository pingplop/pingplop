import Alpine from "alpinejs";
import "htmx.org";
import "preline";

// Instantiate Alpine.js
window.Alpine = Alpine;
Alpine.start();

const logHello = (enable = false) => {
    if (enable) {
        console.log(
            `%cWelcome to Pingplop!%c\n\nDoes this page need fixes or improvements? Open an issue or contribute a merge request to help make Pingplop more lovable. At Pingplop, everyone can contribute!\n
${String.fromCodePoint(0x1f91d)} Contribute to Pingplop: https://github.com/pingplop/pingplop
${String.fromCodePoint(0x1f50e)} Create a new issue: https://github.com/pingplop/pingplop/issues
${String.fromCodePoint(
    0x1f680
)} We like your curiosity! Help us improve Pingplop by joining the team:\nhttps://github.com/orgs/pingplop/discussions`,
            "padding-top: 0.5em; font-size: 2em;",
            "padding-bottom: 0.5em;"
        );
    }
};

logHello(true);
