function e(e,t,s,n){Object.defineProperty(e,t,{get:s,set:n,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},n={},o=t.parcelRequirec21a;null==o&&((o=function(e){if(e in s)return s[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return s[e]=o,t.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},t.parcelRequirec21a=o),o.register("27Lyk",(function(t,s){var n,o;e(t.exports,"register",(()=>n),(e=>n=e)),e(t.exports,"resolve",(()=>o),(e=>o=e));var r={};n=function(e){for(var t=Object.keys(e),s=0;s<t.length;s++)r[t[s]]=e[t[s]]},o=function(e){var t=r[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),o.register("afaem",(function(t,s){e(t.exports,"createNewUser",(()=>c));var n=o("k8Jq9"),r=o("aLLA2");const a=document.getElementById("side-nav"),i=document.getElementById("open-btn"),l=document.getElementById("close-btn");function c(e){const t=localStorage.getItem(e);if(console.log(t),null!==t){if("user"===e){const e=JSON.parse(t),s=new(0,r.User)(e[0],e[1],e[2],e[3]);return console.log(s),s}{const e=JSON.parse(t),s=new(0,r.User)(e[2],e[0],"password",e[1]);return console.log(s),s}}}i.addEventListener("click",(()=>{a.style.width="60%"})),l.addEventListener("click",(()=>{a.style.width="0"}));const d=c("user");console.log(d),void 0!==d&&(function(e){document.getElementById("profile-name").innerText=e.getUserName();document.getElementById("menu-profile-name").innerText=e.getUserName();const t=document.querySelectorAll(".profile-img");for(let s=0;s<t.length;s++)u(t[s],e);g(e)}(d),async function(e){const t=await(0,n.getUserIndex)(e);if(null!=t){console.log(t);const s=await(0,n.getPostsFromDb)(t),o=[];s.forEach((e=>{o.push(e)})),e.setPosts(o),g(e)}}(d),async function(){const e=await(0,n.getAllUsers)();for(let t=0;t<e.length;t++){const s=document.getElementById("user-list");if(null!==s&&s.children.length<e.length){const n=document.createElement("a");n.innerText=e[t].userName;const o={name:e[t].name,userName:e[t].userName,imgUrl:e[t].imgUrl,posts:e[t].posts};n.ariaValueText=JSON.stringify(o),s.appendChild(n),n.addEventListener("click",(()=>{if(n.ariaValueText){console.log(n.ariaValueText);const e=JSON.parse(n.ariaValueText);localStorage.setItem("visitUser",JSON.stringify(Object.values(e))),console.log(localStorage.getItem("visitUser"))}location.assign("./visitProfile.html")}))}}}());function u(e,t){const s=t.getImgUrl();let n=new URL(o("iGlvB"));switch(s){case"../images/angry-computer.jpg":case"../images/crazy-eddie.jpg":case"../images/pixeledDog.jpg":n=new URL(o("iGlvB")),e.src=n.href;break;default:console.log("URL is not recognized")}}function g(e){if(0!==e.getPosts().length){const t=document.getElementById("posts-container");t.innerHTML="",e.getPosts().forEach((e=>{const s=document.createElement("div");s.classList.add("post"),t.append(s);const n=document.createElement("div");n.classList.add("post-info");const o=document.createElement("span"),r=document.createElement("span");o.innerText=e.sender,r.innerText=e.date,n.append(o,r),s.append(n);const a=document.createElement("div");a.classList.add("post-message");const i=document.createElement("p");i.classList.add("message"),i.innerText=e.message,a.append(i),s.append(a)}))}}document.getElementById("post-form").addEventListener("submit",(async e=>{e.preventDefault();const t=document.getElementById("message-input");if(void 0!==d){const e={sender:d.getUserName(),date:(new Date).toLocaleDateString()+" "+(new Date).toLocaleTimeString(),message:t.value};t.value="",d.addPost(e);const s=await(0,n.getUserIndex)(d);(0,n.addPostsToDb)(s,d.getPosts()),g(d)}}))})),o.register("k8Jq9",(function(t,s){async function n(e){const t=await o();return console.log(t),function(e,t){let s={};if(console.log("VALIDATION"),null!==e)for(const n of e)n.userName===t.userName&&n.password===t.password&&(console.log("User found!"),s=n,console.log(s));else console.log("user not found");return s}(t,e)}async function o(){const e=await fetch("https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users.json");return await e.json()}async function r(e){const t=await o();for(let s=0;s<t.length;s++)if(void 0!==e&&t[s].userName===e.getUserName()&&t[s].password===e.getPassword())return s}async function a(e){console.log(e);const t=`https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${e}/posts.json`,s=await fetch(t),n=await s.json();return console.log(n),n}async function i(e,t){const s=`https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${e}/posts.json`,n={method:"PUT",body:JSON.stringify(t),headers:{"Content-type":"application/json; charset=UTF-8"}},o=(await fetch(s,n)).json();console.log(o)}async function l(e){const t=await o();let s=0;null!==t&&(s=t.length);const n=`https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${s}.json`,r={method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json; charset=UTF-8"}},a=(await fetch(n,r)).json();console.log(a)}e(t.exports,"findUserInDb",(()=>n)),e(t.exports,"getAllUsers",(()=>o)),e(t.exports,"getUserIndex",(()=>r)),e(t.exports,"getPostsFromDb",(()=>a)),e(t.exports,"addPostsToDb",(()=>i)),e(t.exports,"addUserToDb",(()=>l))})),o.register("aLLA2",(function(t,s){e(t.exports,"User",(()=>n));class n{constructor(e,t,s,n,o=[]){this.imgUrl=e,this.name=t,this.password=s,this.userName=n,this.posts=o}getName(){return this.name}getUserName(){return this.userName}getPassword(){return this.password}getImgUrl(){return this.imgUrl}getPosts(){return this.posts}setPosts(e){this.posts=e}addPost(e){this.posts.push(e)}removePost(e){}}})),o.register("iGlvB",(function(e,t){e.exports=new URL("../"+o("27Lyk").resolve("98ugg"),import.meta.url).toString()})),o("27Lyk").register(JSON.parse('{"iBxPy":"profile.0659fa95.js","98ugg":"angry-computer.b7a81c0f.jpg"}'));
//# sourceMappingURL=profile.0659fa95.js.map