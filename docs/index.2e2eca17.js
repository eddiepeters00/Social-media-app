async function o(o){const n=await e();return console.log(n),function(o,e){let n={};if(console.log(o),console.log("VALIDATION"),null!==o)for(const l of o)null!==l&&l.userName===e.userName&&l.password===e.password&&(console.log("User found!"),n=l,console.log(n));else console.log("user not found");return n}(n,o)}async function e(){const o=await fetch("https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users.json");return await o.json()}function n(o){return console.log("ISEMPTY",o),console.log(0!==Object.keys(o).length),0!==Object.keys(o).length}console.log("Index.ts is running");const l={};document.querySelector("form").addEventListener("submit",(e=>{e.preventDefault(),document.querySelectorAll("input").forEach((o=>{null!==o.value&&""!==o.value&&(l[o.name]=o.value)})),async function(e){console.log(e);const l=await o(e);n(l)?(console.log("Logging in..."),localStorage.setItem("user",JSON.stringify(Object.values(l))),location.replace("./html/profile.html")):console.log("Error")}(l)}));
//# sourceMappingURL=index.2e2eca17.js.map
