# Newsafe desktop wallet

## Where do I find what?

| Section  | Description                  | Location                                                                                                  |
| -------- | ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| General  | Main entry point             | [app/modules/main/index.js](app/modules/main/index.js)                                                    |
| General  | Main router                  | [app/modules/main/containers/Content.js](app/modules/main/containers/Content.js)                          |
| General  | General menu                 | [app/modules/main/containers/Menu.js](app/modules/main/containers/Menu.js)                                |
| General  | General sidebar              | [app/modules/main/containers/Sections/General.js](app/modules/main/containers/Sidebar.js)                 |
| General  | General sidebar translations | [app/renderer/assets/locales/en-US/menu.json](app/renderer/assets/locales/en-US/menu.json)                |
| Prompt   | Prompt main handler          | [app/modules/handler/containers/Stage.js](app/modules/handler/containers/Stage.js)                        |
| Overview | The overview                 | [app/modules/main/containers/Sections/Overview.js](app/modules/main/containers/Sections/Overview.js)      |
| Overview | The overview menu            | [app/modules/main/components/Overview/Menu.js](app/modules/main/components/Overview/Menu.js)              |
| Wallet   | The wallet content           | [app/modules/main/containers/Sections/Wallet.js](app/modules/main/containers/Sections/Wallet/Transfer.js) |
| Apps     | The apps content             | [app/modules/main/containers/Sections/Apps.js](app/modules/main/containers/Sections/Apps.js)              |

## Apps

- Script injection for apps happens at [app/modules/main/electron/index.js](app/modules/main/electron/index.js)

- Script injected is [app/modules/apps/index.js](app/modules/apps/index.js)


## Swap
In order to swap, you can make use of the newcoin schema:
```
newcoin:swap?from=TKN1&to=TKN2

```
Where TKN1 and TKN2 are the tokens you want to swap. The tokens are the token symbol.
