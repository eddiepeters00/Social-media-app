function e(e,t,n,s){Object.defineProperty(e,t,{get:n,set:s,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},s={},o=t.parcelRequirec21a;async function a(){const e=await fetch("https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users.json");return await e.json()}async function r(e){const t=await a();for(let n=0;n<t.length;n++){const s=t[n];if(s&&void 0!==e&&s.userName===e.getUserName())return n}}async function i(e){console.log(e);const t=`https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${e}/posts.json`,n=await fetch(t),s=await n.json();return console.log(s),s}async function l(e,t){const n=`https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${e}/posts.json`,s={method:"PUT",body:JSON.stringify(t),headers:{"Content-type":"application/json; charset=UTF-8"}},o=(await fetch(n,s)).json();console.log(o)}async function c(e){const t=await r(e);fetch(`https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${t}.json`,{method:"DELETE"})}null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in s){var t=s[e];delete s[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){s[e]=t},t.parcelRequirec21a=o),o.register("27Lyk",(function(t,n){var s,o;e(t.exports,"register",(()=>s),(e=>s=e)),e(t.exports,"resolve",(()=>o),(e=>o=e));var a={};s=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)a[t[n]]=e[t[n]]},o=function(e){var t=a[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),o("27Lyk").register(JSON.parse('{"6eg5j":"profile.5a66d6de.js","bUv6T":"cat-profile.531b76bc.jpg","4all4":"mona-profile.898dc249.jpg","jqkbg":"thing-profile.9db302f0.jpg"}'));class d{constructor(e,t,n,s,o=[]){this.imgUrl=e,this.name=t,this.password=n,this.userName=s,this.posts=o}getName(){return this.name}getUserName(){return this.userName}getPassword(){return this.password}getImgUrl(){return this.imgUrl}getPosts(){return this.posts}setPosts(e){this.posts=e}addPost(e){this.posts.push(e)}removePost(e){}}const u=document.getElementById("side-nav"),g=document.getElementById("open-btn"),m=document.getElementById("close-btn");g.addEventListener("click",(()=>{u.style.width="60%"})),m.addEventListener("click",(()=>{u.style.width="0"}));const p=function(e){const t=localStorage.getItem(e);if(console.log(t),null!==t){if("user"===e){const e=JSON.parse(t);if("object"==typeof e[3]||""===e[3]){const t=new d(e[0],e[1],e[2],e[4]);return console.log(t),t}{const t=new d(e[0],e[1],e[2],e[3]);return console.log(t),t}}{const e=JSON.parse(t),n=new d(e[2],e[0],"password",e[1]);return console.log(n),n}}}("user");console.log(p),void 0!==p&&(!function(e){document.getElementById("profile-name").innerText=e.getUserName();document.getElementById("menu-profile-name").innerText=e.getUserName();const t=document.querySelectorAll(".profile-img");for(let n=0;n<t.length;n++)E(t[n],e);b(e)}(p),async function(e){const t=await r(e);if(null!=t){console.log(t);const n=await i(t);if(Array.isArray(n)){const t=[];n.forEach((e=>{t.push(e)})),e.setPosts(t),b(e)}else console.log("Error: userPosts is not an array")}}(p).then((async function(){const e=await a();e.forEach((t=>{const n=document.getElementById("user-list");if(null!==n&&n.children.length<e.length&&null!==t){const e=document.createElement("a");e.innerText=t.userName;const s={name:t.name,userName:t.userName,imgUrl:t.imgUrl,posts:t.posts};e.ariaValueText=JSON.stringify(s),n.appendChild(e),e.addEventListener("click",(()=>{if(e.ariaValueText){console.log(e.ariaValueText);const t=JSON.parse(e.ariaValueText);localStorage.setItem("visitUser",JSON.stringify(Object.values(t))),console.log(localStorage.getItem("visitUser"))}location.assign("./visitProfile.html")}))}}))})));document.getElementById("post-form").addEventListener("submit",(async e=>{e.preventDefault();const t=document.getElementById("message-input");if(void 0!==p){const e={sender:p.getUserName(),date:(new Date).toLocaleDateString()+" "+(new Date).toLocaleTimeString(),message:t.value};t.value="",p.addPost(e);l(await r(p),p.getPosts()),b(p)}}));const f=document.getElementById("delete-account");f&&f.addEventListener("click",(()=>{console.log("DELETE ACCOUNT"),null!=p&&(c(p),location.assign("./index.html"))}));var h={};h=new URL("../"+o("27Lyk").resolve("bUv6T"),import.meta.url).toString();var w={};w=new URL("../"+o("27Lyk").resolve("4all4"),import.meta.url).toString();var y={};function E(e,t){const n=t.getImgUrl();let s=new URL(h);switch(n){case"../images/cat-profile.jpg":s=new URL(h),e.src=s.href;break;case"../images/mona-profile.jpg":s=new URL(w),e.src=s.href;break;case"../images/thing-profile.jpg":s=new URL(y),e.src=s.href;break;default:console.log("URL is not recognized")}}function b(e){if(0!==e.getPosts().length){const t=document.getElementById("posts-container");t.innerHTML="",e.getPosts().forEach((e=>{const n=document.createElement("div");n.classList.add("post"),t.append(n);const s=document.createElement("div");s.classList.add("post-info");const o=document.createElement("span"),a=document.createElement("span");o.innerText=e.sender,a.innerText=e.date,s.append(o,a),n.append(s);const r=document.createElement("div");r.classList.add("post-message");const i=document.createElement("p");i.classList.add("message"),i.innerText=e.message,r.append(i),n.append(r)}))}}y=new URL("../"+o("27Lyk").resolve("jqkbg"),import.meta.url).toString();
//# sourceMappingURL=profile.5a66d6de.js.map
