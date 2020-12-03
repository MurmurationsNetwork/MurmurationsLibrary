// const http = require("https");
// const fs = require('fs');

const fetch = require("node-fetch");

let schemas = [];

// fetch("https://cdn.murmurations.tech/schemas")
fetch("https://murmurations-library-5dq2s0fbp.vercel.app/schemas")
  .then((res) => res.text())
  .then((body) => {
    const files = [...body.matchAll(/(?<=file json">)(.*)(?=<\/a>)/g)];

    files.forEach((file) => {
      schemas.push(file[0]);
    });

    console.log(JSON.stringify(schemas, null, 2));
  });

// let source;

// const file = fs.createWriteStream("file.jpg");
// const request = http.get(
//   "https://cdn.murmurations.tech/schemas",
//   function (response) {
//     console.log(response.body);
// response.pipe(source);
//   }
// );

// let source = `<!doctype html><html lang=en><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Files within &#47;schemas/</title><style>body{margin:0;padding:30px;background:#fff;font-family:-apple-system,BlinkMacSystemFont,segoe ui,roboto,oxygen,ubuntu,cantarell,fira sans,droid sans,helvetica neue,sans-serif;-webkit-font-smoothing:antialiased}main{max-width:920px}header{display:flex;justify-content:space-between;flex-wrap:wrap}h1{font-size:18px;font-weight:500;margin-top:0;color:#000}h1 i{font-style:normal}ul{margin:0 0 0 -2px;padding:20px 0 0}ul li{list-style:none;font-size:14px;display:flex;justify-content:space-between}a{text-decoration:none}ul a{color:#000;padding:10px 5px;margin:0 -5px;white-space:nowrap;overflow:hidden;display:block;width:100%;text-overflow:ellipsis}header a{color:#0076ff;font-size:11px;font-weight:400;display:inline-block;line-height:20px}svg{height:13px;vertical-align:text-bottom}ul a::before{display:inline-block;vertical-align:middle;margin-right:10px;width:24px;text-align:center;line-height:12px}ul a.file::before{content:url(data:image/svg+xml;utf8;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwIDhDOC4zNCA4IDcgNi42NiA3IDVWMUgzYy0xLjEuMC0yIC45LTIgMnYxM2MwIDEuMS45IDIgMiAyaDljMS4xLjAgMi0uOSAyLTJWOGgtNHpNOCA1YzAgMS4xLjkgMiAyIDJoMy41OUw4IDEuNDFWNXpNMyAwaDVsNyA3djljMCAxLjY2LTEuMzQgMy0zIDNIM2MtMS42Ni4wLTMtMS4zNC0zLTNWM2MwLTEuNjYgMS4zNC0zIDMtM3oiIGZpbGw9IiMwMDAiLz48L3N2Zz4=)}ul a:hover{text-decoration:underline}ul a.folder::before{content:url(data:image/svg+xml;utf8;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE4Ljc4NCAzLjg3YTEuNTY1IDEuNTY1LjAgMCAwLS41NjUtLjM1NlYyLjQyNmMwLS42NDgtLjUyMy0xLjE3MS0xLjE1LTEuMTcxSDguOTk2TDcuOTA4LjI1QS44OS44OS4wIDAgMCA3LjMwMi4wSDIuMDk0QzEuNDQ1LjAuOTQ0LjUyMy45NDQgMS4xNzF2Mi4zYy0uMjEuMDg1LS4zOTguMjEtLjU2NS4zNTZhMS4zNDggMS4zNDguMCAwIDAtLjM3NyAxLjAwNGwuMzk4IDkuODNDLjQyIDE1LjM5MyAxLjA0OCAxNiAxLjggMTZoMTUuNTgzYy43NTMuMCAxLjM2LS41ODYgMS40LTEuMzM5bC4zOTgtOS44M2MuMDIxLS4zMTMtLjEyNS0uNjktLjM5Ny0uOTYyek0xLjg0MyAzLjQxVjEuMTkxYzAtLjE0Ni4xMDQtLjI3Mi4yNS0uMjcySDcuMjZsMS4yMzQgMS4wODhjLjA4My4wNDIuMTY3LjEwNC4yOTMuMTA0aDguMjgyYy4xMjUuMC4yNS4xMjYuMjUuMjcyVjMuNDFIMS44NDR6bTE1LjU0IDExLjcxMkgxLjc4YS40Ny40Ny4wIDAgMS0uNDgxLS40NmwtLjM5Ny05LjgzYzAtLjE0Ny4wNDEtLjI1Mi4xMjUtLjM1NmEuNTA0LjUwNC4wIDAgMSAuMzc3LS4xNDdIMTcuNzhjLjEyNS4wLjI3Mi4wNjMuMzc3LjE0Ny4wODMuMDgzLjEyNS4yMDkuMTI1LjMzNGwtLjQxOCA5LjgzYy0uMDIxLjI3Mi0uMjMuNDgyLS40ODEuNDgyeiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==)}ul a.lambda::before{content:url(data:image/svg+xml;utf8;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMuNSAxNC40MzU0SDUuMzE2MjJMNy4zMDU0MSA5LjgxMzExSDcuNDM1MTRMOC42NTMxNSAxMy4wNzk3QzkuMDU2NzYgMTQuMTY0MyA5LjU1NDA1IDE0LjUgMTAuNyAxNC41IDExLjAxNzEgMTQuNSAxMS4yOTEgMTQuNDY3NyAxMS41IDE0LjQwMzJWMTMuMTU3MkMxMS4zODQ3IDEzLjE3NjYgMTEuMjYyMiAxMy4yMDI0IDExLjE1NDEgMTMuMjAyNCAxMC42MzUxIDEzLjIwMjQgMTAuMzgyOSAxMy4wMjgxIDEwLjE1OTUgMTIuNDY2NEw4LjAyNjEzIDcuMDc1ODZDNy4yMTE3MSA1LjAxNjQ2IDYuNTQ4NjUgNC41IDUuMTE0NDEgNC41IDQuODMzMzMgNC41IDQuNjI0MzIgNC41MzIyOCA0LjM3MjA3IDQuNTkwMzhWNS44MzYzNUM0LjU2NjY3IDUuODEwNTIgNC42NjAzNiA1Ljc5NzYxIDQuNzc1NjggNS43OTc2MSA1LjY0Nzc1IDUuNzk3NjEgNS45IDYuMDA0MiA2LjQwNDUgNy4xOTg1Mkw2LjY0MjM0IDcuNzc5NTQgMy41IDE0LjQzNTR6IiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iLjUiIHk9Ii41IiB3aWR0aD0iMTQiIGhlaWdodD0iMTgiIHJ4PSIyLjUiIHN0cm9rZT0iIzAwMCIvPjwvc3ZnPg==)}ul a.file.gif::before,ul a.file.jpg::before,ul a.file.png::before,ul a.file.svg::before{content:url(data:image/svg+xml;utf8;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSI2IiB5PSI2IiB3aWR0aD0iNjgiIGhlaWdodD0iNjgiIHJ4PSI1IiByeT0iNSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMjQiIHI9IjgiLz48cGF0aCBkPSJNNzMgNDkgNTkgMzQgMzcgNTJtMTYgMjBMMjcgNDIgNyA1OCIvPjwvc3ZnPg==)}::selection{background-color:#79ffe1;color:#000}::-moz-selection{background-color:#79ffe1;color:#000}@media(min-width:768px){ul{display:flex;flex-wrap:wrap}ul li{width:230px;padding-right:20px}}@media(min-width:992px){body{padding:45px}h1{font-size:15px}ul li{font-size:13px;box-sizing:border-box;justify-content:flex-start}}</style><main><header><h1><i>Index of&nbsp; &#47;schemas/</i></h1><a href=https://vercel.com/docs/directory-listing target=_blank><svg viewBox="0 0 16 16"><g stroke-width="1" fill="#0076ff" stroke="#0076ff"><circle cx="8.5" cy="5" r="1" stroke="none"/><circle fill="none" cx="8.5" cy="8.5" r="7"/><path d="M8.5 13V8z" stroke-width="1.4"/></g></svg>&nbsp;What's this?</a></header><ul id=files><li><a href=&#47;schemas&#47;default-v1.json title=&#47;schemas&#47;default-v1.json class="file json">default-v1.json</a>
// <li><a href=&#47;schemas&#47;demo-v1.json title=&#47;schemas&#47;demo-v1.json class="file json">demo-v1.json</a>
// <li><a href=&#47;schemas&#47;demo-v2.json title=&#47;schemas&#47;demo-v2.json class="file json">demo-v2.json</a>
// <li><a href=&#47;schemas&#47;murmurations_users-v1.json title=&#47;schemas&#47;murmurations_users-v1.json class="file json">murmurations_users-v1.json</a>
// </ul></main>%`;