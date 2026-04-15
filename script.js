import { HF_TOKEN, HF_MODEL } from './config.js';

// Basic Constitution Data (expand later)
const data = [
  {title:"अनुच्छेद 14", desc:"समानता का अधिकार"},
  {title:"अनुच्छेद 21", desc:"जीवन का अधिकार"}
];

// Render Cards
const container = document.getElementById("cards");
data.forEach(item=>{
  let div=document.createElement("div");
  div.className="card";
  div.innerHTML=`<h3>${item.title}</h3><p>${item.desc}</p>`;
  container.appendChild(div);
});

// Chat Function
window.sendMessage = async function(){
  const input = document.getElementById("chatInput").value;
  const output = document.getElementById("chatOutput");

  output.innerHTML = "सोच रहा हूँ...";

  const res = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`,{
    method:"POST",
    headers:{
      "Authorization":"Bearer "+HF_TOKEN,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({inputs:input})
  });

  const data = await res.json();

  output.innerHTML = data[0]?.generated_text || "कोई जवाब नहीं मिला";
}
