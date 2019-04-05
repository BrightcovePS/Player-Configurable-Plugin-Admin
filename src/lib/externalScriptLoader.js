const scriptLoader = (id, src, callback) => {
  const existingScript = document.getElementById(id);
  
  if (!existingScript) {
    let videojsScript = document.createElement("script");
    videojsScript.type = "text/javascript";
    videojsScript.src = src;
    videojsScript.id = id;

    document.head.appendChild(videojsScript);
    videojsScript.onload = () => {
      if (callback) callback();
    };
  }
  
  if (existingScript && callback) callback();
};

export default scriptLoader;