class e{constructor(e,t,s,o,a=[{}]){this.name=e,this.email=t,this.password=s,this.imgUrl=o,this.posts=a}getName(){return this.name}getEmail(){return this.email}getPassword(){return this.password}getImgUrl(){return this.imgUrl}}async function t(e){return function(e,t){let s=!1;if(console.log("VALIDATION"),console.log("ALL USERS",e),console.log("USER OBJECT",t),null!==e){for(const o of e)o.email===t.email&&o.password===t.password&&(console.log("User found!"),s=!0);s||console.log("Could not find user in db")}return s}(await s(),e)}async function s(){const e=await fetch("https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users.json");return await e.json()}async function o(e){const t=await s();let o=0;null!==t&&(o=t.length);const a=`https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${o}.json`,n={method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json; charset=UTF-8"}},l=(await fetch(a,n)).json();console.log(l)}const a={};document.querySelectorAll(".image-select img").forEach((e=>{e.addEventListener("click",(()=>{console.log(e.ariaValueText),null!==e.ariaValueText&&(a.imgUrl=e.ariaValueText)}))}));document.querySelector("#register-form").addEventListener("submit",(s=>{s.preventDefault(),document.querySelectorAll("input").forEach((e=>{null!==e.value&&""!==e.value&&(a[e.name]=e.value)})),async function(s){if(await t(s))console.log("User already exists");else{const t=function(t){const s=new e(t.name,t.email,t.password,t.imgUrl);return console.log(s),s}(s);o(t),setTimeout((()=>{location.replace("/src/index.html")}),1e3)}}(a)}));
//# sourceMappingURL=createAccount.76155f65.js.map
