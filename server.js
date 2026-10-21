// Node.js 18+ TMDB API proxy. Keep your key in the server environment.
const http=require('node:http'),https=require('node:https'),fs=require('node:fs'),path=require('node:path'),{URL}=require('node:url');
const root=__dirname,port=process.env.PORT||8787,key=process.env.TMDB_API_KEY;
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'};
http.createServer((req,res)=>{const url=new URL(req.url,`http://${req.headers.host}`);
if(url.pathname.startsWith('/api/')){if(!key){res.writeHead(503,{'Content-Type':'application/json'});return res.end(JSON.stringify({status_message:'TMDB is not configured. Set TMDB_API_KEY in your server environment.'}))}
const upstreamUrl=new URL('https://api.themoviedb.org/3/'+url.pathname.slice(5));for(const [k,v] of url.searchParams)upstreamUrl.searchParams.set(k,v);upstreamUrl.searchParams.set('api_key',key);
https.get(upstreamUrl,{headers:{accept:'application/json'}},up=>{res.writeHead(up.statusCode||502,{'Content-Type':'application/json; charset=utf-8'});up.pipe(res)}).on('error',()=>{res.writeHead(502,{'Content-Type':'application/json'});res.end(JSON.stringify({status_message:'TMDB is temporarily unavailable.'}))});return}
const requested=decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname),file=path.resolve(root,'.'+requested);if(!file.startsWith(root)){res.writeHead(403);return res.end('Forbidden')}
fs.readFile(file,(err,data)=>{if(err){res.writeHead(404,{'Content-Type':'text/plain'});return res.end('File not found')}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(data)})
}).listen(port,()=>console.log(`CineFlix running at http://localhost:${port}`));