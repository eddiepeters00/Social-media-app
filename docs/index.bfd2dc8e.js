function e(e,o,t,s){Object.defineProperty(e,o,{get:t,set:s,enumerable:!0,configurable:!0})}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},s={},n=o.parcelRequirec21a;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in s){var o=s[e];delete s[e];var n={id:e,exports:{}};return t[e]=n,o.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,o){s[e]=o},o.parcelRequirec21a=n),n.register("kOHZq",(function(o,t){e(o.exports,"isEmpty",(()=>r));var s=n("k8Jq9");const a={};console.log("Start");function r(e){return console.log("ISEMPTY",e),console.log(0!==Object.keys(e).length),0!==Object.keys(e).length}document.querySelector("form").addEventListener("submit",(e=>{e.preventDefault(),document.querySelectorAll("input").forEach((e=>{null!==e.value&&""!==e.value&&(a[e.name]=e.value)})),async function(e){console.log(e);const o=await(0,s.findUserInDb)(e);r(o)?(console.log("Logging in..."),localStorage.setItem("user",JSON.stringify(Object.values(o))),setTimeout((()=>{location.assign("./html/profile.html")}),1e3)):console.log("Error")}(a)}))})),n.register("k8Jq9",(function(o,t){async function s(e){const o=await n();return console.log(o),function(e,o){let t={};if(console.log(e),console.log("VALIDATION"),null!==e)for(const s of e)null!==s&&s.userName===o.userName&&s.password===o.password&&(console.log("User found!"),t=s,console.log(t));else console.log("user not found");return t}(o,e)}async function n(){const e=await fetch("https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users.json");return await e.json()}async function a(e){const o=await n();for(let t=0;t<o.length;t++){const s=o[t];if(s&&void 0!==e&&s.userName===e.getUserName())return t}}async function r(e){console.log(e);const o=`https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${e}/posts.json`,t=await fetch(o),s=await t.json();return console.log(s),s}async function l(e,o){const t=`https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${e}/posts.json`,s={method:"PUT",body:JSON.stringify(o),headers:{"Content-type":"application/json; charset=UTF-8"}},n=(await fetch(t,s)).json();console.log(n)}async function i(e){const o=await n();let t=0;null!==o&&(t=o.length);const s=`https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${t}.json`,a={method:"PUT",body:JSON.stringify(e),headers:{"Content-type":"application/json; charset=UTF-8"}},r=(await fetch(s,a)).json();console.log(r)}async function c(e){const o=await a(e);fetch(`https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${o}.json`,{method:"DELETE"})}e(o.exports,"findUserInDb",(()=>s)),e(o.exports,"getAllUsers",(()=>n)),e(o.exports,"getUserIndex",(()=>a)),e(o.exports,"getPostsFromDb",(()=>r)),e(o.exports,"addPostsToDb",(()=>l)),e(o.exports,"addUserToDb",(()=>i)),e(o.exports,"deleteAccount",(()=>c))}));
//# sourceMappingURL=index.bfd2dc8e.js.map
