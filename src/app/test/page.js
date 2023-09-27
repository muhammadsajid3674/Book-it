async function getData() {
   const res = await fetch("https://api.github.com/repos/vercel/next.js");
   const repo = await res.json();
   return repo;
}

export default async function Page() {
   const data = await getData();
   console.log("data :>> ", data);
}
