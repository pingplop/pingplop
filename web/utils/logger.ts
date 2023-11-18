const HANDSHAKE = String.fromCodePoint(0x1f91d)
const MAG = String.fromCodePoint(0x1f50e)
const ROCKET = String.fromCodePoint(0x1f680)

export const logHello = (enable = false) => {
  if (enable) {
    // eslint-disable-next-line no-console
    console.log(
      `%cWelcome to Pingplop!%c\n
Does this page need fixes or improvements? Open an issue or contribute a merge request to help make Pingplop more lovable. At Pingplop, everyone can contribute!

${HANDSHAKE} Contribute to Pingplop: https://github.com/pingplop/pingplop
${MAG} Create a new Pingplop issue: https://github.com/pingplop/pingplop/issues
${ROCKET} We like your curiosity! Help us improve Pingplop by joining the team: https://github.com/orgs/pingplop/discussions
`,
      'padding-top: 0.5em; font-size: 2em;',
      'padding-bottom: 0.5em;'
    )
  }
}
